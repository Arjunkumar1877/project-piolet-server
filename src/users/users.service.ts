// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserDocument } from 'src/schemas/user-schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {} // Use string 'User' for name

  async create(email: string, password: string, name: string, firebaseId: string): Promise<UserDocument> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ 
      email, 
      password: hashedPassword, 
      name,
      firebaseId 
    });
    return user.save();
  }

  async findOne(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findByFirebaseId(firebaseId: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ firebaseId }).exec();
  }
}