import { IsString } from 'class-validator';

export class SignupDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;
}

export class LoginDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class VerifyTokenDto {
  @IsString()
  token: string;
}

export class VerifyOtpDto {
  @IsString()
  otp: string;

  @IsString()
  email: string;
}
