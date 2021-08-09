import { IsString, IsArray, IsIn } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsIn(['single', 'group'])
  type: string;

  @IsString()
  body: string;

  @IsString()
  title: string;

  @IsString()
  @IsIn(['sms', 'push'])
  delivery_method: string;

  @IsArray()
  @IsString({ each: true })
  consumers: string[];
}
