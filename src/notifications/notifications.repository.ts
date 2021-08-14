import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../shared/database/entity.repository';

import {
  Notification,
  NotificationDocument,
} from './models/notification.model';

@Injectable()
export class NotificationRepository extends EntityRepository<NotificationDocument> {
  constructor(
    @InjectModel(Notification.name)
    notificationModel: Model<NotificationDocument>,
  ) {
    super(notificationModel);
  }
}
