import 'dotenv/config';
import * as joi from 'joi';

interface EnvironmentVariables {
  PORT: number;
  NATS_SERVER: string;
}

const environmentSchema = joi
  .object<EnvironmentVariables>({
    PORT: joi.number().required(),
    NATS_SERVER: joi.string().required(),
  })
  .unknown();

const result = environmentSchema.validate({
  ...process.env,
});

const error = result.error;
const value = result.value as EnvironmentVariables;

// const { error, value } = environmentSchema.validate({
//   ...process.env,
// });

if (error) {
  throw new Error(`Environment validation error: ${error.message}`);
}

const env: EnvironmentVariables = value;

export const environmentsVariables = {
  port: env.PORT,
  natsServer: env.NATS_SERVER,
};
