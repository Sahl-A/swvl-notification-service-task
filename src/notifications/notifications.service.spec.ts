import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { getModelToken } from '@nestjs/mongoose';

describe('NotificationsService', () => {
  let service: NotificationsService;
  const mockNotificationModel = {
    create: jest.fn().mockResolvedValue({ id: 'created-notification-id' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: getModelToken('Notification'),
          useValue: mockNotificationModel,
        },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined and have necessary methods', () => {
    expect(service).toBeDefined();
    expect(service).toHaveProperty('create');
  });

  describe('create method', () => {
    it('Should save the dto to database', async () => {
      // data
      const dto: CreateNotificationDto = {
        body: 'test-bod',
        delivery_method: 'push',
        priority: 1,
        recipients: ['userId'],
        title: 'test-title',
        type: 'single',
      };

      // actions
      await service.create(dto);

      // assertions
      expect(mockNotificationModel.create).toHaveBeenCalledWith({ ...dto });
    });

    it('Should return the id of the saved notification', async () => {
      // data
      const dto: CreateNotificationDto = {
        body: 'test-bod',
        delivery_method: 'push',
        priority: 1,
        recipients: ['userId'],
        title: 'test-title',
        type: 'single',
      };

      // actions
      const res = await service.create(dto);

      // assertions
      expect(res).toEqual('created-notification-id');
    });
  });
});
