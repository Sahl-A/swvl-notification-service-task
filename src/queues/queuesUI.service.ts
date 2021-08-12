import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { jobQueues } from '../shared/enums/jobQueues.enums';

const serverAdapter = new ExpressAdapter();

@Injectable()
class QueueUIProvider {
  constructor(
    @InjectQueue(jobQueues.SMS)
    private readonly smsNotificationQueue: Queue,
    @InjectQueue(jobQueues.PUSH)
    private readonly pushNotificationQueue: Queue,
  ) {
    /** Add queues with adapter, one-by-one */
    createBullBoard({
      queues: [
        new BullAdapter(this.smsNotificationQueue),
        new BullAdapter(this.pushNotificationQueue),
      ],
      serverAdapter: serverAdapter,
    });

    serverAdapter.setBasePath('/admin/queues');
  }
}

export { QueueUIProvider, serverAdapter };
