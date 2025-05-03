// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.stratergy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { initializeFirebase } from '../config/firebase.config';
import { initializeFirebaseAdmin } from '../config/firebase-admin.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'your-secret-key'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: 'FIREBASE_AUTH',
      useFactory: (configService: ConfigService) => {
        return initializeFirebase(configService);
      },
      inject: [ConfigService],
    },
    {
      provide: 'FIREBASE_ADMIN_AUTH',
      useFactory: (configService: ConfigService) => {
        return initializeFirebaseAdmin(configService);
      },
      inject: [ConfigService],
    }
  ],
  controllers: [AuthController],
})
export class AuthModule {}