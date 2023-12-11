
import { UserService } from "../services/userSearch.service.js";
export class UserController {
  userService = new UserService();
  searchuser = async (req, res, next) => {
  
    
    try {
      const me = res.locals.user;
      const searchuser = await this.userService.searchuser(me)
      return res.status(200).json({
        success: true,
        message: '내 정보 조회에 성공했습니다.',
        data: searchuser
      });
    } catch (error) {
      
      return res.status(500).json({
        success: false,
        message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
      });
    }
  }

}


