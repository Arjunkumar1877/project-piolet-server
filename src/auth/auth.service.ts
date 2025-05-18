import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from 'src/schemas/user-schema';
import { LoginDto, VerifyOtpDto, VerifyTokenDto } from './auth.dto';
import { Auth, User as FirebaseUser } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Auth as FirebaseAdminAuth } from 'firebase-admin/auth';
import { generateOTP } from 'src/helpers/otpGenerator';
import { sendVerifyMail } from 'src/helpers/nodemailer';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject('FIREBASE_AUTH') private firebaseAuth: Auth,
    @Inject('FIREBASE_ADMIN_AUTH') private firebaseAdminAuth: FirebaseAdminAuth,
  ) {}

  async signup(
    email: string,
    password: string,
    name: string,
  ): Promise<{ message: string; signedUp: boolean }> {
    try {
      const userExists = await this.usersService.findOne(email);
      let firebaseUser = null;
  
      // Only fetch Firebase user if local user exists
      if (userExists) {
        try {
          firebaseUser = await this.firebaseAdminAuth.getUserByEmail(email);
        } catch (_) {
          // Firebase user not found, ignore
        }
  
        if (userExists.emailVerified && firebaseUser) {
          return { message: 'User already exists', signedUp: false };
        }
  
        // Resend OTP for unverified users
        if (!userExists.emailVerified && firebaseUser) {
          const OTP = generateOTP();
          await sendVerifyMail(email, OTP);
          userExists.otp = OTP;
          userExists.name = name;
          await userExists.save();
  
          return {
            message: 'OTP sent to email',
            signedUp: true,
          };
        }
      }
  
      // Create Firebase user
      const firebaseUserCredential = await createUserWithEmailAndPassword(
        this.firebaseAuth,
        email,
        password,
      );
  
      // Create user in DB
      const user = await this.usersService.create(
        email,
        password,
        name,
        firebaseUserCredential.user.uid,
      );
  
      // Generate and send OTP
      const OTP = generateOTP();
      await sendVerifyMail(email, OTP);
      user.otp = OTP;
      await user.save();
  
      return {
        message: 'User created successfully and OTP sent to email',
        signedUp: true,
      };
    } catch (error) {
      throw new UnauthorizedException(
        'Failed to create user: ' + (error?.message || 'Unknown error'),
      );
    }
  }
  
  async login(loginDto: LoginDto): Promise<{
    message: string;
    access_token: string;
    user: Partial<User> | null;
  }> {
    const user: UserDocument | null = await this.usersService.findOne(
      loginDto.email,
    );

    if (!user) {
      return {
        message: 'Invalid credentials',
        access_token: '',
        user: null,
      };
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
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

  async verifyToken(
    verifyTokenDto: VerifyTokenDto,
  ): Promise<{ user: Partial<User> | null; message: string }> {
    try {
      const decodedToken = await this.firebaseAdminAuth.verifyIdToken(
        verifyTokenDto.token,
      );
      const firebaseId = decodedToken.uid;

      const user = await this.usersService.findByFirebaseId(firebaseId);

      if (!user) {
        return { user: null, message: 'User not found' };
      }

      const { password: _, ...userWithoutPassword } = user.toObject();
      return {
        user: userWithoutPassword,
        message: 'User verified successfully',
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token: ' + error.message);
    }
  }

  async verifyOtp(verifyOtp: VerifyOtpDto) {
    const { email, otp } = verifyOtp;

    const user = await this.usersService.findOne(email);

    if (user && user.otp === otp) {
      return {
        verified: true,
        message: 'Email verified successfully',
      };
    } else {
      return {
        verified: false,
        message: 'Invalid otp please enter correct otp or resend otp',
      };
    }
  }
}
