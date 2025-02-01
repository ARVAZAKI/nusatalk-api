import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { FriendModule } from './friend/friend.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    PrismaModule, FriendModule,
    CacheModule.register({
      store: 'redisStore',
      host: "localhost",
      port: 6379,
      ttl: 60
    })

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
