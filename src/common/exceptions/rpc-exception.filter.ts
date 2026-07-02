import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

interface RpcErrorResponse {
  status?: number;
  message?: string;
}

@Catch(RpcException)
export class RpcGlobalExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const rpcError = exception.getError() as RpcErrorResponse;

    const errorString = this.stringifyError(rpcError);

    if (errorString.includes('Empty response')) {
      response.status(500).json({
        status: 500,
        message: errorString.substring(0, errorString.indexOf('(') - 1),
      });
      return;
    }

    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const status = isNaN(Number(rpcError.status))
        ? 400
        : Number(rpcError.status);
      response.status(status).json(rpcError);
      return;
    }

    response.status(400).json({
      status: 400,
      message: rpcError,
    });
  }

  private stringifyError(error: unknown): string {
    if (typeof error === 'string') {
      return error;
    }
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }
}
