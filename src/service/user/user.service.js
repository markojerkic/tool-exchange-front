import AuthService from "../auth/auth.service";
import instance from "../auth/interceptor";


const UserService = {
    getUserByUsername: async function(username) {
        return await instance.get(`user/byUsername/?username=${username}`);
    },

    isLoggedIn: function(){
        return AuthService.getCurrentUser() !== {};
    }
};

export default UserService;
