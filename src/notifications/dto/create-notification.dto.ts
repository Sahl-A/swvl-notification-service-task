export class CreateNotificationDto {
  type: string;

  body: string;

  title: string;

  delivery_method: string;

  consumers: string[];
}
