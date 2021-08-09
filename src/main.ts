import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // initialize configService to get data from it
  const configService = app.get(ConfigService);

  // get port from configService
  const port = configService.get('port');

  await app.listen(port);
}
bootstrap();
