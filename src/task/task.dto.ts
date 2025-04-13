import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDate, IsMongoId } from 'class-validator';
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

  @IsEnum(['pending', 'in-progress', 'completed', 'cancelled'])
  @IsOptional()
  status?: 'pending' | 'in-progress' | 'completed' | 'cancelled';

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

  @IsEnum(['pending', 'in-progress', 'completed', 'cancelled'])
  @IsOptional()
  status?: 'pending' | 'in-progress' | 'completed' | 'cancelled';

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dueDate?: Date;
}
