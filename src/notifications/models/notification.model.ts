import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
  @Prop()
  type: string;

  @Prop()
  body: string;

  @Prop()
  title: string;

  @Prop()
  delivery_method: string;

  @Prop({ type: [] })
  consumers: string[];
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
