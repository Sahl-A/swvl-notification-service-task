import * as winston from 'winston';

export const winstonLoggerOptions: winston.LoggerOptions = {
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'notifications-service' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error',
      maxsize: 10000000,
    }),
    new winston.transports.File({
      filename: './logs/activities.log',
      maxsize: 10000000,
    }),
  ],
};
