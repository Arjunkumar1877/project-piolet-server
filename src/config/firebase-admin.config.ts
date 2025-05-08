import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { ConfigService } from '@nestjs/config';

export const initializeFirebaseAdmin = (configService: ConfigService) => {
  if (getApps().length === 0) {
    initializeApp({
      credential: cert({
        projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
        clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
        privateKey: configService.get<string>('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n'),
      }),
    });
  }
  return getAuth();
}; 