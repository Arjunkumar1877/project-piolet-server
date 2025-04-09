import { IsString, IsOptional, IsEmail, IsDate, IsNotEmpty, IsEnum, IsArray, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTeamMemberDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsEmail()
  email: string;
}

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty({ message: 'Project name is required' })
  projectName: string;

  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'Client name is required' })
  clientName: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Client email is required' })
  clientEmail: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  clientPhone: string;

  @IsString()
  @IsNotEmpty({ message: 'Address is required' })
  clientAddress: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty({ message: 'Start date is required' })
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty({ message: 'End date is required' })
  endDate: Date;

  @IsEnum(['active', 'completed', 'on-hold', 'cancelled'])
  @IsNotEmpty({ message: 'Status is required' })
  status: 'active' | 'completed' | 'on-hold' | 'cancelled';

  @IsString()
  @IsNotEmpty({ message: 'Budget is required' })
  budget: string;

  @IsEnum(['low', 'medium', 'high'])
  @IsNotEmpty({ message: 'Priority is required' })
  priority: 'low' | 'medium' | 'high';

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  teamMembers?: string[];

  @IsString()
  @IsOptional()
  notes?: string;
}
