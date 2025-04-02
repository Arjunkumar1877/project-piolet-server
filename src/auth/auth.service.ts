import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from 'src/schemas/user-schema';
import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(
    email: string,
    password: string,
    name: string
  ): Promise<{ message: string; access_token: string; user: Partial<User> | null }> {
    const userExists: UserDocument | null = await this.usersService.findOne(email);
    if (userExists) {
      return { message: 'User already exists', access_token: '', user: null };
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const user: UserDocument = await this.usersService.create(email, hashedPassword, name);
  
    const payload = { email: user.email, sub: user._id };
  
    const { password: _, ...userWithoutPassword } = user.toObject();
  
    return {
      message: 'User created successfully',
      access_token: this.jwtService.sign(payload),
      user: userWithoutPassword
    };
  }
  

  async login(loginDto: LoginDto): Promise<{ message: string; access_token: string; user: Partial<User> | null }> {
    const user: UserDocument | null = await this.usersService.findOne(loginDto.email);

    console.log('Login attempt:', { email: loginDto.email, userExists: !!user });

    if (!user) {
      return {
        message: 'Invalid credentials',
        access_token: '',
        user: null,
      };
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    console.log('Password comparison result:', isPasswordValid);

    if (!isPasswordValid) {
      return {
        message: 'Invalid credentials',
        access_token: '',
        user: null,
      };
    }

    const payload = { email: user.email, sub: user._id };

    const { password: _, ...userWithoutPassword } = user.toObject();

    return {
      message: 'Login successful',
      access_token: this.jwtService.sign(payload),
      user: userWithoutPassword,
    };
  }
  

  async validateUser(email: string, pass: string): Promise<{ message: string; access_token: string; user: Partial<User> | null }> {
    const user: UserDocument | null = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user.toObject(); 
      return result;
    }
    return null;
  }
}