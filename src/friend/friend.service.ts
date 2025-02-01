import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cache } from 'cache-manager';

@Injectable()
export class FriendService {
  constructor(
    private prismaService: PrismaService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache
  ) {}

  async getFriendList(id: string) {
      try {
        const cachedFriends = await this.cacheManager.get(`friends:${id}`);
        if (cachedFriends) {
          console.log('Returning data from cache');
          return cachedFriends;
        }
    
        const listOfFriends = await this.prismaService.friend.findMany({
          where: {
            userId: id, 
          },
          include: {
            friend: {
              select: {
                nickname: true,
                username: true,
                profile_pircture: true,
              },
            },
          },
        });
    
        const result = listOfFriends.length ? listOfFriends : [];
    
        await this.cacheManager.set(`friends:${id}`, result, 60);
    
        return result;
      } catch (error) {
        throw new HttpException(
          {
            message: 'Get friend list failed',
            error: error.message || error,
          },
          HttpStatus.BAD_REQUEST
        );
      }
    }
    

  async addFriend(userId: string, friendId: string) {
    try {
      const newFriend = await this.prismaService.friend.create({
        data: {
          userId,
          friendId,
        },
      });

      await this.cacheManager.del(`friends:${userId}`);

      return newFriend;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Add friend failed',
          error: error,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async deleteFriend(userId: string, friendId: string) {
    try {
      await this.prismaService.friend.deleteMany({
        where: {
          userId,
          friendId,
        },
      });

      await this.cacheManager.del(`friends:${userId}`);

      return { message: 'Friend deleted successfully' };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Delete friend failed',
          error: error,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
