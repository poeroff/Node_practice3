import { prisma } from "../util/prisma/index.js"
import {PASSWORD_HASH_SALT_ROUNDS,JWT_ACCESS_TOKEN_SECRET,JWT_ACCESS_TOKEN_EXPIRES_IN} from "../constants/security.costant.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
export class Userrespositories {

    createUser = async(email, password, name)=>{

        const existedUser = await prisma.User.findFirst({where : {email : email}});
        if (existedUser) {
            const error = new Error('이미 가입 된 이메일입니다.') 
            error.success = false;
            throw error;
        }
        const hashedPassword = bcrypt.hashSync(password, 12);
        const newUser = (
            await prisma.User.create({data :{ email : email, password: hashedPassword, name }})
        )
        const newUserJSON = JSON.parse(JSON.stringify(newUser));
        delete newUserJSON.password
        return newUser;

    }
    SigninUser = async(email,password) =>{
        const user = await prisma.User.findFirst({ where: { email } });
        const hashedPassword = user?.password ?? '';
        const isPasswordMatched = bcrypt.compareSync(password, hashedPassword);
        const isCorrectUser = user && isPasswordMatched;

        if (!isCorrectUser) {
            const error = new Error( '일치하는 인증 정보가 없습니다.') 
            error.success = false;
            throw error;
          
        }
        const accessToken = jwt.sign({ userId: user.UserId }, JWT_ACCESS_TOKEN_SECRET, {
            expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN,
        });
        return "Bearer " + accessToken

    }
}