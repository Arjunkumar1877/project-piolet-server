import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Project } from './project-schema';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  project: Project;

  @Prop({ default: 'pending' })
  status: string;

  @Prop()
  dueDate: Date;

  @Prop({ type: Date })
  createdAt?: Date; 

  @Prop({ type: Date })
  updatedAt?: Date; 
}

export const TaskSchema = SchemaFactory.createForClass(Task);
