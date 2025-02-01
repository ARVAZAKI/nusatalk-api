import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      store: "redisStore",
      host: "localhost",
      port: 6379,
      ttl: 60
    })
  ],
  providers: [
    FriendService, PrismaService, 
  ],
  controllers: [FriendController]
})
export class FriendModule {}
