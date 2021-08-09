export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  rabbitURL: process.env.RABBITMQ_URL,
  rabbitMediaQueue: process.env.MEDIA_QUEUE,
});
