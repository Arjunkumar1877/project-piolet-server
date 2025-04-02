// src/projects/schemas/project.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({timestamps:  true})
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  dueDate: Date;

  @Prop({ default: 'active' })
  status: string;

  @Prop({ type: Date })
  createdAt?: Date; 

  @Prop({ type: Date })
  updatedAt?: Date; 
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
