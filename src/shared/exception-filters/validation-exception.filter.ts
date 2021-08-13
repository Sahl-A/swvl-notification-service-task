import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from 'winston';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const { headers, method, originalUrl, url } = ctx.getRequest();
    const response = ctx.getResponse();
    const { stack } = exception;
    delete headers.authorization;

    const { message, statusCode } = exception.getResponse() as {
      message: string | string[];
      statusCode: number;
      error: string;
    };

    // Add logging
    this.logger.error({
      status_code: statusCode,
      message,
      request: {
        headers,
        method,
        originalUrl,
        path: url,
      },
      timestamp: Date.now(),
    });

    response
      .status(HttpStatus.BAD_REQUEST)
      .json({ statusCode, message, stack });
  }
}
