export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  rabbitURL: process.env.RABBITMQ_URL,
  rabbitMediaQueue: process.env.MEDIA_QUEUE,
  notificationProviderLimit: process.env.NOTIFICATION_PROVIDER_LIMIT,
  notificationProviderTime: process.env.NOTIFICATION_PROVIDER_TIME,
});
