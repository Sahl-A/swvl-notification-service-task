import { resolve } from 'path';
import { config } from 'dotenv';

const env = config({ path: `${resolve('.dev.env')}` });

export const smsProviderNotificationLimitPerTime =
  +env.parsed?.SMS_PROVIDER_NOTIFICATION_LIMIT_PER_TIME ||
  +process.env.SMS_PROVIDER_NOTIFICATION_LIMIT_PER_TIME;

export const smsProviderNotificationTime =
  +env.parsed?.SMS_PROVIDER_NOTIFICATION_TIME ||
  +process.env.SMS_PROVIDER_NOTIFICATION_TIME;

export const pushProviderNotificationLimitPerTime =
  +env.parsed?.PUSH_PROVIDER_NOTIFICATION_LIMIT_PER_TIME ||
  +process.env.PUSH_PROVIDER_NOTIFICATION_LIMIT_PER_TIME;

export const pushProviderNotificationTime =
  +env.parsed?.PUSH_PROVIDER_NOTIFICATION_TIME ||
  +process.env.PUSH_PROVIDER_NOTIFICATION_TIME;
