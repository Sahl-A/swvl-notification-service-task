import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { Notification, NotificationSchema } from './models/notification.model';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationRepository } from './notifications.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationRepository],
})
export class NotificationsModule {}
