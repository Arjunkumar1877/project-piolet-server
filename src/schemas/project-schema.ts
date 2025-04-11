import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { TeamMember } from './team-member.schema';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  projectName: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  clientName: string;

  @Prop({ required: true })
  clientEmail: string;

  @Prop({ required: true })
  clientPhone: string;

  @Prop({ required: true })
  clientAddress: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ 
    required: true,
    enum: ['active', 'completed', 'on-hold', 'cancelled'],
    default: 'active'
  })
  status: 'active' | 'completed' | 'on-hold' | 'cancelled';

  @Prop({ required: true })
  budget: string;

  @Prop({ 
    required: true,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  })
  priority: 'low' | 'medium' | 'high';

  @Prop({ type: [{ type: Types.ObjectId, ref: 'TeamMember' }] })
  teamMembers: Types.ObjectId[];

  @Prop()
  notes?: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
