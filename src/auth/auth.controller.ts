import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { SignupDto, LoginDto, VerifyTokenDto, VerifyOtpDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto.email, signupDto.password, signupDto.name);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('verify-token')
  async verifyToken(@Body() verifyTokenDto: VerifyTokenDto) {
    return this.authService.verifyToken(verifyTokenDto);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() verifyOtp: VerifyOtpDto) {
    return this.authService.verifyOtp(verifyOtp);
  }



  @UseGuards(AuthGuard('jwt'))
  @Post('protected')
  protectedRoute() {
    return { message: 'This is a protected route' };
  }
}