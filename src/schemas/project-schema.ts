import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  projectName: string;

  @Prop()
  description?: string;

  @Prop()
  clientName?: string;

  @Prop()
  clientEmail?: string;

  @Prop()
  clientPhone?: string;

  @Prop()
  clientAddress?: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true }) 
  endDate: Date; 

  @Prop({ default: 'active' })
  status: string;

}

export const ProjectSchema = SchemaFactory.createForClass(Project);
