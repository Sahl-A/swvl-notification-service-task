import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';

const serverAdapter = new ExpressAdapter();

@Injectable()
class QueueUIProvider {
  constructor(
    @InjectQueue('notification') private readonly notificationQueue: Queue,
  ) {
    /** Add queues with adapter, one-by-one */
    createBullBoard({
      queues: [new BullAdapter(this.notificationQueue)],
      serverAdapter: serverAdapter,
    });

    serverAdapter.setBasePath('/admin/queues');
  }
}

export { QueueUIProvider, serverAdapter };
