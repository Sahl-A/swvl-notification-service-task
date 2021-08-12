import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Queue } from 'bull';
import { Model } from 'mongoose';
import { jobQueues } from '../shared/enums/jobQueues.enums';
import {
  Notification,
  NotificationDocument,
} from '../notifications/models/notification.model';

@Injectable()
export class QueuesProducerSerive {
  constructor(
    @InjectQueue(jobQueues.SMS) private smsNotificationQueue: Queue,
    @InjectQueue(jobQueues.PUSH) private pushNotificationQueue: Queue,
    @InjectModel('Notification')
    private readonly NotificationModel: Model<Notification>,
  ) {}

  async notificationsProducer() {
    // get all not sent notifications & not queued
    const notifications = await this.NotificationModel.find({
      sent: false,
      queued: false,
    }).exec();

    notifications.forEach((notification: NotificationDocument) => {
      // update queued to true before adding it to a job
      notification.queued = true;
      notification.save().then((updatedNotification) => {
        // add the notification to a job
        this[`${updatedNotification.delivery_method}NotificationQueue`].add(
          updatedNotification,
          {
            priority: notification.priority,
          },
        );
      });
    });
  }
}
