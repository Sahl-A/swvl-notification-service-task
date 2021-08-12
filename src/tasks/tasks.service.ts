import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { QueuesProducerSerive } from '../queues/queues.producer';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(private readonly queuesProducerSerive: QueuesProducerSerive) {}

  @Cron('*/1 * * * * *')
  async handleCron() {
    this.queuesProducerSerive.notificationsProducer();
  }
}
