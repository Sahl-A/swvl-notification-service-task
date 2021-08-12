import { Injectable } from '@nestjs/common';
import { NotificationDocument } from '../notifications/models/notification.model';

@Injectable()
export class PushNotificationProvider {
  async send(notification: NotificationDocument): Promise<void> {
    console.log(
      `push notification with id:${notification._id} was sent to user ${notification.recipients[0]}\n`,
    );
  }

  async sendBulk(notification: NotificationDocument): Promise<void> {
    console.log(
      `push notification with id:${
        notification._id
      } was sent to users ${notification.recipients.join(' ')}\n`,
    );
  }
}
