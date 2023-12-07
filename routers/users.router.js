import { Router } from 'express';
import { needSignin } from '../middlewares/need-signin.middleware.js';
import { UserController } from '../controllers/users.controller.js';
const usersRouter = Router();
const User = new UserController();

//내 정보 검색
usersRouter.get('/me', needSignin, User.searchuser);

export { usersRouter };
