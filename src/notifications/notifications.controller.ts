import { Controller, Post, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UseFilters } from '@nestjs/common';
import * as winston from 'winston';
import { winstonLoggerOptions } from '../logging/winston-options';
import { ValidationExceptionFilter } from '../shared/exception-filters/validation-exception.filter';

@Controller('notifications')
@UseFilters(
  new ValidationExceptionFilter(winston.createLogger(winstonLoggerOptions)),
)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return await this.notificationsService.create(createNotificationDto);
  }
}
