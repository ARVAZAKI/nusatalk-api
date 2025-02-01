import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FriendService {
      constructor(private prismaService: PrismaService){}


      // get list friend
      async getFriendList(id: string){
            try {
                  const listOfFriend = await this.prismaService.friend.findUnique({
                        where:{
                              id: id
                        },
                        include:{
                              friend: {
                                    select:{
                                          nickname: true,
                                          username: true,
                                          profile_pircture: true
                                    }
                              }
                        }
                  })
                  return listOfFriend
            } catch (error) {
                  throw new HttpException({
                        message: "get friend list failed",
                        error: error
                  }, HttpStatus.BAD_REQUEST)
            }
      }

      // add friend


      // delete friend
}
