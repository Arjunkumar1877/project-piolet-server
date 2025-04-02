import { IsString, IsOptional, IsEmail, IsDate, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  projectName: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  clientName?: string;

  @IsOptional()
  @IsEmail()
  clientEmail?: string;

  @IsOptional()
  @IsString()
  clientPhone?: string;

  @IsOptional()
  @IsString()
  clientAddress?: string;

  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @IsOptional()
  @IsString()
  status?: string;
}
