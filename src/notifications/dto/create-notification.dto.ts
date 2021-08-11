import { IsString, IsArray, IsIn } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsIn(['single', 'group'])
  type: string;

  @IsString()
  body: string;

  @IsString()
  title: string;

  @IsIn([1, 2, 3, 4, 5])
  priority: number;

  @IsString()
  @IsIn(['sms', 'push'])
  delivery_method: string;

  @IsArray()
  @IsString({ each: true })
  recipients: string[];
}
