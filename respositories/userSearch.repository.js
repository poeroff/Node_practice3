import { prisma } from "../util/prisma/index.js"
export class UsersearchRespositories {

    searchuser = async(me) =>{
        const searchuser = await prisma.User.findFirst(
            {
              where: { UserId: me.UserId },
              select: {
                UserId: true,
                email: true,
                name: true,
                createdAt: true,
                updatedAt: true,
              }
            })
        return searchuser;

    }

}