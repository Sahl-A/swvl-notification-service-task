import { Processor, Process, OnQueueCompleted } from '@nestjs/bull';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'bull';
import { Model } from 'mongoose';
import { PushNotificationProvider } from '../../providers/push.service';
import {
  Notification,
  NotificationDocument,
} from '../../notifications/models/notification.model';
import { notificationType } from '../../shared/enums/notificationType.enums';
import { jobQueues } from '../../shared/enums/jobQueues.enums';

@Processor(jobQueues.PUSH)
export class PushNotificationConsumer {
  constructor(
    @InjectModel('Notification')
    private readonly NotificationModel: Model<Notification>,
    private readonly pushNotificationProvider: PushNotificationProvider,
  ) {}
  @Process()
  async pushNotificationProcessor(job: Job<NotificationDocument>) {
    switch (job.data.type) {
      case notificationType.SINGLE:
        this.pushNotificationProvider.send(job.data);
        break;

      case notificationType.GROUP:
        this.pushNotificationProvider.sendBulk(job.data);
        break;

      default:
        break;
    }
  }

  @OnQueueCompleted()
  async markNotificationAsSent(job: Job) {
    const filter = { _id: job.data._id };
    const update = { sent: true };
    await this.NotificationModel.findOneAndUpdate(filter, update, {
      useFindAndModify: false,
    });
  }
}
