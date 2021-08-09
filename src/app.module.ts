import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

const env = process.env.NODE_ENV || 'dev';

@Module({
  imports: [
    ConfigModule.forRoot({
      // load different .env files based on runtime environment variable
      envFilePath: !env ? '.development.env' : `.${env}.env`,
      isGlobal: true,
      load: [configuration],
    }),
  ],
})
export class AppModule {}
