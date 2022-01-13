import instance from "./interceptor";

const UserService = {

    getUsers: function (page, size, lastFilters, sortField) {
        let filters = {};
        if (lastFilters) {
            Object.keys(lastFilters).forEach(key => {
                filters[key] = lastFilters[key].value;
            });
        }

        return instance.get('/user/page', {
            params: {
                page: page,
                size: size,
                sort: sortField, ...filters
            }
        }).then((response) => {
            return response.data;
        })
    },

    getUserByUsername: function (param) {
        return instance.get(`user/username=${param}`);
    },

    disableUser: function (id) {
        return instance.put(`user/block/id=${id}`);
    },

    updateUser: function (data) {
        return instance.put('user/update', data);
    }
}

export default UserService;
