import { NotificationDocument } from 'src/notifications/models/notification.model';
import { PushNotificationProvider } from './push.service';

describe('PushProvider', () => {
  let pushProvider: PushNotificationProvider;

  beforeEach(() => {
    pushProvider = new PushNotificationProvider();
  });

  it('should be defined and have the necessary methods', () => {
    expect(pushProvider).toBeDefined();
    expect(pushProvider).toHaveProperty('send');
    expect(pushProvider).toHaveProperty('sendBulk');
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

      expect(await pushProvider.send(notification)).toBeUndefined();
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

      expect(await pushProvider.sendBulk(notification)).toBeUndefined();
    });
  });
});
