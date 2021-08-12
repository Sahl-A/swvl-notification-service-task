import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { serverAdapter } from './queues/queuesUI.service';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../openAPI/notifications.openAPI.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // initialize configService to get data from it
  const configService = app.get(ConfigService);

  // add global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // get the bull-board ui
  app.use('/admin/queues', serverAdapter.getRouter());

  // get the swagger definitions
  app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // get port from configService
  const port = configService.get('port');

  await app.listen(port);
}
bootstrap();
