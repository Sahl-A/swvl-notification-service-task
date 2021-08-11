import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { serverAdapter } from './queues/queuesUI.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // initialize configService to get data from it
  const configService = app.get(ConfigService);

  // add global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // get the bull-board ui
  app.use('/admin/queues', serverAdapter.getRouter());

  // get port from configService
  const port = configService.get('port');

  await app.listen(port);
}
bootstrap();
