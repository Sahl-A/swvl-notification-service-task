import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsModule } from './notifications/notifications.module';
import configuration from './config/configuration';
import dbConfiguration from './config/database';

const env = process.env.NODE_ENV || 'dev';

@Module({
  imports: [
    ConfigModule.forRoot({
      // load different .env files based on runtime environment variable
      envFilePath: !env ? '.development.env' : `.${env}.env`,
      isGlobal: true,
      load: [configuration, dbConfiguration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('mongoUrl'),
      }),
      inject: [ConfigService],
    }),
    NotificationsModule,
  ],
})
export class AppModule {}
