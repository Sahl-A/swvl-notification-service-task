import { Module } from '@nestjs/common';
import {
  Notification,
  NotificationSchema,
} from '../notifications/models/notification.model';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../notifications/models/user.model';
import { BullModule } from '@nestjs/bull';
import { QueueUIProvider } from './queuesUI.service';
import { QueuesProducerSerive } from './queues.producer';
import { PushNotificationConsumer } from './processors/pushNotificationQueue.processor';
import { SmsNotificationConsumer } from './processors/smsNotificationQueue.processor';
import { ProvidersModule } from '../providers/providers.module';
import {
  pushProviderNotificationLimitPerTime,
  pushProviderNotificationTime,
  smsProviderNotificationLimitPerTime,
  smsProviderNotificationTime,
} from '../config/constants';
import { jobQueues } from '../shared/enums/jobQueues.enums';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
      { name: User.name, schema: UserSchema },
    ]),
    BullModule.registerQueue(
      {
        name: jobQueues.PUSH,
        limiter: {
          duration: smsProviderNotificationTime,
          max: smsProviderNotificationLimitPerTime,
        },
      },
      {
        name: jobQueues.SMS,
        limiter: {
          duration: pushProviderNotificationTime,
          max: pushProviderNotificationLimitPerTime,
        },
      },
    ),
    ProvidersModule,
  ],
  controllers: [],
  providers: [
    QueueUIProvider,
    QueuesProducerSerive,
    PushNotificationConsumer,
    SmsNotificationConsumer,
  ],
  exports: [
    QueuesProducerSerive,
    PushNotificationConsumer,
    SmsNotificationConsumer,
  ],
})
export class QueuesModule {}
