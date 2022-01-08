import instance from "./interceptor";

const UserService = {

    getUsers: function() {
        return instance.get("/user/page").then((response) =>{
            return response.data;
        })
    },

    disableUser: function(id) {
        instance.put(`user/block/id=${id}`)
    }
}

export default UserService;