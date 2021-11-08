import instance from "../auth/interceptor";
import TokenService from "../auth/token.service";
import AuthService from "../auth/auth.service";
import React, {useState} from 'react';


const UserService = {
    getUserByUsername: async function(username) {
        return await instance.get(`user/byUsername/?username=${username}`);
    },

    isLoggedIn: function(){
        return AuthService.getCurrentUser();
    }
};

export default UserService;
