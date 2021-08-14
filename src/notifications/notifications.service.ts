import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationRepository } from './notifications.repository';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}
  async create(createNotificationDto: CreateNotificationDto) {
    const newNotification = await this.notificationRepository.create({
      ...createNotificationDto,
    });
    return newNotification.id;
  }
}
