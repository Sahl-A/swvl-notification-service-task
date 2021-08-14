import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { SMSNotificationProvider } from '../../providers/sms.service';
import { SmsNotificationConsumer } from './smsNotificationQueue.processor';

describe('SmsNotificationConsumer', () => {
  let service: SmsNotificationConsumer;
  const mockNotificationModel = {
    findOneAndUpdate: jest.fn(),
  };
  const mockSmsProvider = {
    send: jest.fn(),
    sendBulk: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SmsNotificationConsumer,
        {
          provide: getModelToken('Notification'),
          useValue: mockNotificationModel,
        },
        {
          provide: SMSNotificationProvider,
          useValue: mockSmsProvider,
        },
      ],
    }).compile();

    service = module.get<SmsNotificationConsumer>(SmsNotificationConsumer);
  });

  it('should be defined and have necessary methods', () => {
    expect(service).toBeDefined();
    expect(service).toHaveProperty('markNotificationAsSent');
    expect(service).toHaveProperty('smsNotificationProcessor');
  });

  describe('smsNotificationProcessor method', () => {
    it('Should send a single message based on its type', async () => {
      // data
      const job = {
        data: {
          type: 'single',
        },
      } as any;

      // actions
      await service.smsNotificationProcessor(job);

      // assertions
      expect(mockSmsProvider.send).toBeCalledTimes(1);
      expect(mockSmsProvider.send).toBeCalledWith(job.data);
    });

    it('Should send group messages based on its type', async () => {
      // data
      const job = {
        data: {
          type: 'group',
        },
      } as any;

      // actions
      await service.smsNotificationProcessor(job);

      // assertions
      expect(mockSmsProvider.sendBulk).toBeCalledTimes(1);
      expect(mockSmsProvider.sendBulk).toBeCalledWith(job.data);
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
