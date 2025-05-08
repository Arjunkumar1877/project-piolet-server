import { Controller, Put, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put(':firebaseId')
  async updateUser(
    @Param('firebaseId') firebaseId: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(firebaseId, updateUserDto);
  }
}
