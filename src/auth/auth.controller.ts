import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return 'Register';
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return 'Login';
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  verify() {
    return '...verifing';
  }
}
