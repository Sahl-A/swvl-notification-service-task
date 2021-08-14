import { getQueueToken } from '@nestjs/bull';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { QueuesProducerSerive } from './queues.producer';

describe('QueuesProducerSerive', () => {
  let service: QueuesProducerSerive;
  const mockPushNotificationQueue = { add: jest.fn() };
  const mockSmsNotificationQueue = { add: jest.fn() };
  const foundNotification = (delivery_method) => ({
    delivery_method,
    priority: 2,
    queued: false,
    save: jest.fn().mockResolvedValue({ delivery_method, priority: 2 }),
  });

  const mockNotificationModel = {
    find: () => ({
      exec: jest
        .fn()
        .mockResolvedValue([
          foundNotification('push'),
          foundNotification('sms'),
        ]),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueuesProducerSerive,
        {
          provide: getQueueToken('push_notification'),
          useValue: mockPushNotificationQueue,
        },
        {
          provide: getQueueToken('sms_notification'),
          useValue: mockSmsNotificationQueue,
        },
        {
          provide: getModelToken('Notification'),
          useValue: mockNotificationModel,
        },
      ],
    }).compile();

    service = module.get<QueuesProducerSerive>(QueuesProducerSerive);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('notificationsProducer method', () => {
    it('should add each found notification to a job in the corresponding queue', async () => {
      await service.notificationsProducer();

      // assertions
      expect(mockPushNotificationQueue.add).toBeCalledTimes(1);
      expect(mockSmsNotificationQueue.add).toBeCalledTimes(1);
    });
  });
});
