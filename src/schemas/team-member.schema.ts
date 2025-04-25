import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TeamMemberDocument = TeamMember & Document;

@Schema({ timestamps: true })
export class TeamMember {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  email: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Project' }] })
  projects: Types.ObjectId[];
}

export const TeamMemberSchema = SchemaFactory.createForClass(TeamMember); 