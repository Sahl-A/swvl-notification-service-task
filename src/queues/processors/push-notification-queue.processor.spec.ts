import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PushNotificationProvider } from '../../providers/push.service';
import { PushNotificationConsumer } from './pushNotificationQueue.processor';

describe('PushNotificationConsumer', () => {
  let service: PushNotificationConsumer;
  const mockNotificationModel = {
    findOneAndUpdate: jest.fn(),
  };
  const mockPushProvider = {
    send: jest.fn(),
    sendBulk: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PushNotificationConsumer,
        {
          provide: getModelToken('Notification'),
          useValue: mockNotificationModel,
        },
        {
          provide: PushNotificationProvider,
          useValue: mockPushProvider,
        },
      ],
    }).compile();

    service = module.get<PushNotificationConsumer>(PushNotificationConsumer);
  });

  it('should be defined and have necessary methods', () => {
    expect(service).toBeDefined();
    expect(service).toHaveProperty('markNotificationAsSent');
    expect(service).toHaveProperty('pushNotificationProcessor');
  });

  describe('pushNotificationProcessor method', () => {
    it('Should send a single message based on its type', async () => {
      // data
      const job = {
        data: {
          type: 'single',
        },
      } as any;

      // actions
      await service.pushNotificationProcessor(job);

      // assertions
      expect(mockPushProvider.send).toBeCalledTimes(1);
      expect(mockPushProvider.send).toBeCalledWith(job.data);
    });

    it('Should send group messages based on its type', async () => {
      // data
      const job = {
        data: {
          type: 'group',
        },
      } as any;

      // actions
      await service.pushNotificationProcessor(job);

      // assertions
      expect(mockPushProvider.sendBulk).toBeCalledTimes(1);
      expect(mockPushProvider.sendBulk).toBeCalledWith(job.data);
    });
  });

  describe('markNotificationAsSent method', () => {
    it('Should update the notification', async () => {
      // data
      const job = {
        data: {
          _id: '3242a',
        },
      } as any;

      // actions
      await service.markNotificationAsSent(job);

      // assertions
      expect(mockNotificationModel.findOneAndUpdate).toHaveBeenCalled();
      expect(mockNotificationModel.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });
  });
});
