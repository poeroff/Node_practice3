import bcrypt from "bcrypt";

import { prisma } from "../util/prisma/index.js"
import {PASSWORD_HASH_SALT_ROUNDS,JWT_ACCESS_TOKEN_SECRET,JWT_ACCESS_TOKEN_EXPIRES_IN} from "../constants/security.costant.js"
import { Authservice } from "../services/auth.service.js";


export class Authcontroller {
    authServcie = new Authservice();

    signup = async (req, res, next) => {
        try {
            const { email, password, passwordConfirm, name } = req.body;

            const createdUser = await this.authServcie.createUser(email , password, passwordConfirm, name)
            console.log(createdUser)
            return res.status(201).json({
                success: true,
                message: '회원가입에 성공했습니다.',
                data: createdUser,
            });
        } catch (error) {
           
            return res.status(500).json({
                success: error.success,
                message: error.message
            });
        }
    }

    signin = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            
            const accessToken =  await this.authServcie.SigninUser(email,password)
     
            return res.status(200).json({
                success: true,
                message: '로그인에 성공했습니다.',
                data: { accessToken },
            });
        } catch (error) {
          
            return res.status(500).json({
                success: error.success,
                message: error.message
            });
        }
    }
}