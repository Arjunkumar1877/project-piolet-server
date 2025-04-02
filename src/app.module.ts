import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import mongoose from 'mongoose';
import { ProjectsModule } from './project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
    const db = mongoose.connection;
    db.once('open', () => console.log('✅ MongoDB connected successfully'));
    db.on('error', (err) => console.error('❌ MongoDB connection error:', err));
  }
}


