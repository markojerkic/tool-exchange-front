import instance from "./interceptor";

const UserService = {

    getUsers: function() {
        return instance.get("/user/all").then((response) =>{
            return response.data;
        })
    }
}

export default UserService;