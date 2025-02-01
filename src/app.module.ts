import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { FriendModule } from './friend/friend.module';

@Module({
  imports: [PrismaModule, FriendModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
