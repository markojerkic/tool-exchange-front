import instance from "../auth/interceptor";


const UserService = {
    getUserByUsername: async function(username) {
        return await instance.get(`user/byUsername/?username=${username}`)
    }
};

export default UserService;
