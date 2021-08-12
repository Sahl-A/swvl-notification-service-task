import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QueuesModule } from '../queues/queues.module';
import {
  Notification,
  NotificationSchema,
} from '../notifications/models/notification.model';
import { User, UserSchema } from '../notifications/models/user.model';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
      { name: User.name, schema: UserSchema },
    ]),
    QueuesModule,
  ],
  providers: [TasksService],
})
export class TasksModule {}
