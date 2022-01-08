import instance from "./interceptor";

const UserService = {

    getUsers: function() {
        return instance.get("/user/page").then((response) =>{
            return response.data;
        })
    }
}

export default UserService;