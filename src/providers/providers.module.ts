import { Module } from '@nestjs/common';
import { PushNotificationProvider } from './push.service';
import { SMSNotificationProvider } from './sms.service';

@Module({
  imports: [],
  controllers: [],
  providers: [SMSNotificationProvider, PushNotificationProvider],
  exports: [SMSNotificationProvider, PushNotificationProvider],
})
export class ProvidersModule {}
