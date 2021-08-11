import { Module } from '@nestjs/common';
import {
  Notification,
  NotificationSchema,
} from '../notifications/models/notification.model';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../notifications/models/user.model';
import { BullModule } from '@nestjs/bull';
import { QueueUIProvider } from './queuesUI.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
      { name: User.name, schema: UserSchema },
    ]),
    BullModule.registerQueue({
      name: 'notification',
    }),
  ],
  controllers: [],
  providers: [QueueUIProvider],
})
export class QueuesModule {}
