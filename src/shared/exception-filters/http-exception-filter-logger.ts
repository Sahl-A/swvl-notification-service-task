import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from 'winston';

@Catch()
export class AllExceptionsFilterLogger implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const { headers, method, originalUrl } = ctx.getRequest();
    delete headers.Authorization;
    const { message, stack } = exception;
    this.logger.error({
      message: message,
      stack: stack,
      request: {
        headers,
        method,
        originalUrl,
      },
      timestamp: Date.now(),
    });

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({ status, message, stack });
  }
}
