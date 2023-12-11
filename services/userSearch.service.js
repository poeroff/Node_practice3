import { UsersearchRespositories } from "../respositories/userSearch.repository.js"

export class UserService {

    userSearchResposit = new UsersearchRespositories();
    searchuser = async(me) => {
        const searchuser = await this.userSearchResposit.searchuser(me);
        return searchuser
        
    }
}