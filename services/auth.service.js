import {prisma} from "../util/prisma/index.js"
import { Userrespositories } from "../respositories/users.repository.js";


export class Authservice{
    userRespos = new Userrespositories();


    createUser = async(email , password, passwordConfirm, name) => {
        if (!email) {
            const error = new Error( '이메일 입력이 필요합니다.') 
            error.success = false;
            throw error;
        }
        if (!password) {
            const error = new Error( '비밀번호 입력이 필요합니다.') 
            error.success = false;
            throw error;
        }
        if (!passwordConfirm) {
            const error = new Error('비밀번호 확인 입력이 필요합니다.') 
            error.success = false;
            throw error;
        }
        if (!name) {
            const error = new Error('이름 입력이 필요합니다.') 
            error.success = false;
            throw error;
        }
        if (password !== passwordConfirm) {
            const error = new Error('입력 한 비밀번호가 서로 일치하지 않습니다.') 
            error.success = false;
            throw error;
        }
        if (password.length < 6) {
            const error = new Error('비밀번호는 최소 6자리 이상입니다.') 
            error.success = false;
            throw error;
        }
        let emailValidationRegex = new RegExp('[a-z0-9._]+@[a-z]+.[a-z]{2,3}');
        const isValidEmail = emailValidationRegex.test(email);
        if (!isValidEmail) {
            const error = new Error('올바른 이메일 형식이 아닙니다.') 
            error.success = false;
            throw error;
        }
        const createdPost = await this.userRespos.createUser(email ,password, name)
        return createdPost
    }

    SigninUser =async(email, password)=>{
        if (!email) {
            const error = new Error('이메일 입력이 필요합니다.') 
            error.success = false;
            throw error;
        }
        if (!password) {
            const error = new Error('비밀번호 입력이 필요합니다.') 
            error.success = false;
            throw error;
        }
        const accessToken = await this.userRespos.SigninUser(email,password)
        return accessToken

    }

}