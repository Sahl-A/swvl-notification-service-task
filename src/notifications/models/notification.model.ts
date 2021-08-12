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
  priority: number;

  @Prop({ default: false })
  sent: boolean;

  @Prop({ default: false })
  queued: boolean;

  @Prop()
  title: string;

  @Prop()
  delivery_method: string;

  @Prop({ type: [] })
  recipients: string[];
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
