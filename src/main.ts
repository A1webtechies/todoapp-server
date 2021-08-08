import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationFormatter } from './helpers/validation-formatter.helper';
import { config as dotEnvConfig } from 'dotenv';
import { env } from 'process';

const path = require('path');
//dotEnvConfig();
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: any) =>
        new UnprocessableEntityException(ValidationFormatter(errors)),
    }),
  );

  app.enableCors();

  await app.listen(env.PORT || 3000, () =>
    console.log('server started on port ', env.PORT),
  );
}
bootstrap();
