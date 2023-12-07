import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index.cjs';

import { Authcontroller } from '../controllers/auth.controller.js';
const { Users } = db;

const authRouter = Router();

const Auth = new Authcontroller()

// 회원가입
authRouter.post('/signup', Auth.signup);

authRouter.post('/signin', Auth.signin);

export { authRouter };
