// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserDocument } from 'src/schemas/user-schema';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async update(firebaseId: string, updateUserDto: UpdateUserDto): Promise<UserDocument | null> {
    const updateData: any = { ...updateUserDto };
    
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    return this.userModel
      .findOneAndUpdate(
        { firebaseId },
        { $set: updateData },
        { new: true }
      )
      .exec();
  }
}