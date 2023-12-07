import { prisma } from "../util/prisma/index.js"
import {PASSWORD_HASH_SALT_ROUNDS,JWT_ACCESS_TOKEN_SECRET,JWT_ACCESS_TOKEN_EXPIRES_IN} from "../constants/security.costant.js"
import jwt from "jsonwebtoken"
export class Userrespositories {

    createUser = async(email, password, name)=>{
        const newUser = (
            await prisma.User.create({data :{ email : email, password: password, name }})
        )
        const newUserJSON = JSON.parse(JSON.stringify(newUser));
        delete newUserJSON.password
        
        return newUser;

    }
    SigninUser = async(user) =>{
        console.log(user)
        const accessToken = jwt.sign({ userId: user.UserId }, JWT_ACCESS_TOKEN_SECRET, {
            expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN,
        });
        return "Bearer " + accessToken

    }
}