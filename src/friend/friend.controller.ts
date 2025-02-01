import { Controller, HttpException } from '@nestjs/common';
import { FriendService } from './friend.service';

@Controller('friend')
export class FriendController {
      constructor(private service: FriendService){}

      async getFriendList(id: string){
            try {
                  const listFriend = await this.service.getFriendList(id)
                  return { 
                        message: "get friend list success",
                        data: listFriend
                  }
            } catch (error) {
                  if(error instanceof HttpException){
                        throw error
                  }
            }
      }
}
