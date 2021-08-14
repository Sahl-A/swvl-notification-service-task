import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './models/notification.model';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel('Notification')
    private readonly notificationModel: Model<Notification>,
  ) {}
  async create(createNotificationDto: CreateNotificationDto) {
    const newNotification = await this.notificationModel.create({
      ...createNotificationDto,
    });
    return newNotification.id;
  }
}
