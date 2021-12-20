import axios from "axios";
import AuthService from "./auth/auth.service";
import TokenService from "./auth/token.service";


const instance = axios.create({
    baseURL: `http://${process.env.REACT_APP_BACKEND_HOST}/api`,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken();
        if (token) {
            config.headers["Authorization"] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (AuthService.getCurrentUserToken() && originalConfig.url !== "/auth/login" && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const token = TokenService.getLocalRefreshToken();
                    if (!token) {
                        return;
                    }
                    const rs = await instance.get("/auth/refreshToken?token="+token);
                    if (rs.data.accessToken) {
                        TokenService.setUser(rs.data);
                    }

                    return instance(originalConfig);
                } catch (_error) {
                    //history.push('/login');
                    //window.location.reload();
                    TokenService.removeUser();
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    }
);

export default instance;
