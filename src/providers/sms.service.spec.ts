import { NotificationDocument } from 'src/notifications/models/notification.model';
import { SMSNotificationProvider } from './sms.service';

describe('SmsProvider', () => {
  let smsProvider: SMSNotificationProvider;

  beforeEach(() => {
    smsProvider = new SMSNotificationProvider();
  });

  it('should be defined and have the necessary methods', () => {
    expect(smsProvider).toBeDefined();
    expect(smsProvider).toHaveProperty('send');
    expect(smsProvider).toHaveProperty('sendBulk');
  });

  describe('send method', () => {
    it('Should not return anything', async () => {
      // data
      const notification = {
        _id: '123',
        type: 'single',
        priority: 2,
        title: 'title-test',
        body: 'body-test',
        sent: true,
        queued: true,
        delivery_method: 'push',
        recipients: ['userId'],
      } as NotificationDocument;

      expect(await smsProvider.send(notification)).toBeUndefined();
    });
  });

  describe('sendBulk method', () => {
    it('Should not return anything', async () => {
      // data
      const notification = {
        _id: '123',
        type: 'single',
        priority: 2,
        title: 'title-test',
        body: 'body-test',
        sent: true,
        queued: true,
        delivery_method: 'push',
        recipients: ['userId'],
      } as NotificationDocument;

      expect(await smsProvider.sendBulk(notification)).toBeUndefined();
    });
  });
});
