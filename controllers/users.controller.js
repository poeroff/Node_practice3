import { prisma } from "../util/prisma/index.js"
export class UserController {
  searchuser = async (req, res, next) => {
    try {
      const me = res.locals.user;
      const post = await prisma.User.findFirst(
        {
          where: { UserId: me.userId },
          select: {
            UserId: true,
            email: true,
            name: true,
            createdAt: true,
            updatedAt: true,
          }
        })
      return res.status(200).json({
        success: true,
        message: '내 정보 조회에 성공했습니다.',
        data: post
      });
    } catch (error) {
      
      return res.status(500).json({
        success: false,
        message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
      });
    }
  }

}


