import { Test, TestingModule } from '@nestjs/testing';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

describe('NotificationsController', () => {
  let controller: NotificationsController;
  const notificationsService = {
    create: jest.fn().mockResolvedValue('created-notification-id'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [
        { provide: NotificationsService, useValue: notificationsService },
      ],
    }).compile();

    controller = module.get<NotificationsController>(NotificationsController);
  });

  it('should be defined and have necessary methods', () => {
    expect(controller).toBeDefined();
    expect(controller).toHaveProperty('create');
  });

  describe('create method', () => {
    it('Should call service create method with correct parameters', async () => {
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
      await controller.create(dto);

      // assertions
      expect(notificationsService.create).toBeCalledWith(dto);
    });

    it('Should return what service.create returns', async () => {
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
      const res = await controller.create(dto);

      // assertions
      expect(res).toEqual('created-notification-id');
    });
  });
});
