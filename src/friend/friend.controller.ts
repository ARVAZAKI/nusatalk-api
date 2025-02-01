import { Controller, HttpException, Get, Param, InternalServerErrorException } from '@nestjs/common';
import { FriendService } from './friend.service';

@Controller('friend')
export class FriendController {
  constructor(private readonly service: FriendService) {}

  @Get(':id')
  async getFriendList(@Param('id') id: string) {
    try {
      const listFriend = await this.service.getFriendList(id);

      if (!listFriend) {
        return {
          message: 'No friends found',
          data: [],
        };
      }

      return {
        message: 'Get friend list success',
        data: listFriend,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
}
