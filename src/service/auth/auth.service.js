import instance from "../interceptor";
import TokenService from "./token.service";


const AuthService = {
    register: function(registrationForm) {
        return instance.post("user", registrationForm);
    },

    login: function(loginForm, setUser) {
        return instance.put("auth", loginForm).then((response) => {
            if (response.data.accessToken) {
                TokenService.setUser(response.data);
                setUser(response.data);
            }
            return response.data;
        });
    },

    logout: function(setUser) {
        TokenService.removeUser();
        setUser({});
    },

    getCurrentUserToken: function() {
        return JSON.parse(localStorage.getItem("user"));
    },

    getCurrentLoggedInUser: function() {
        return instance.get("auth").then((response) => {
            return response.data;
        });
    }
};

export default AuthService;
