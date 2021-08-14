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
    // alternative solution,
    ////////////////////////
    // we can get number of jobs from queues, if there is delayed jobs
    // we return and don't proceed by getting data from DB and adding jobs\
    // this way we don't need queued property in DB at all

    // const pushJobsCount = await this.pushNotificationQueue.getJobCounts();
    // const smsJobsCount = await this.smsNotificationQueue.getJobCounts();
    // if (pushJobsCount.delayed !== 0 && smsJobsCount.delayed !== 0) return;
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    // alternative solution
    ////////////////////////
    // get all not sent notifications & not queued
    const notifications = await this.NotificationModel.find({
      sent: false,
      queued: false,
    }).exec();

    if (notifications.length === 0) return;

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
