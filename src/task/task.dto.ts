import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDate, IsMongoId, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  ticketNumber: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsMongoId()
  @IsNotEmpty()
  project: string;
  
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  assignedTo?: string[];

  @IsEnum(['todo', 'in-progress', 'completed', 'cancelled'])
  @IsOptional()
  status?: 'todo' | 'in-progress' | 'completed' | 'cancelled';

  @IsEnum(['high', 'medium', 'low'])
  @IsOptional()
  priority?: 'high' | 'medium' | 'low';


  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  dueDate: Date;
}



export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  ticketNumber?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsMongoId()
  @IsOptional()
  project?: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  assignedTo?: string[];

  @IsEnum(['todo', 'in-progress', 'completed', 'cancelled'])
  @IsOptional()
  status?: 'todo' | 'in-progress' | 'completed' | 'cancelled';

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dueDate?: Date;
}
