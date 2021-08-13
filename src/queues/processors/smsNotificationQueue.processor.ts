import { Processor, Process, OnQueueCompleted } from '@nestjs/bull';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'bull';
import { Model } from 'mongoose';
import { jobQueues } from '../../shared/enums/jobQueues.enums';
import { notificationType } from '../../shared/enums/notificationType.enums';
import {
  Notification,
  NotificationDocument,
} from '../../notifications/models/notification.model';
import { SMSNotificationProvider } from '../../providers/sms.service';

@Processor(jobQueues.SMS)
export class SmsNotificationConsumer {
  constructor(
    @InjectModel('Notification')
    private readonly NotificationModel: Model<Notification>,
    private readonly smsNotificationProvider: SMSNotificationProvider,
  ) {}
  @Process()
  async smsNotificationProcessor(job: Job<NotificationDocument>) {
    switch (job.data.type) {
      case notificationType.SINGLE:
        this.smsNotificationProvider.send(job.data);
        break;

      case notificationType.GROUP:
        this.smsNotificationProvider.sendBulk(job.data);
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
