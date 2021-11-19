import React from "react";
import {Switch} from "react-router-dom";
import PrivateRoute from "../routes/PrivateRoute";
import PublicRoute from "../routes/PublicRoute";
import Login from "./auth/login/Login";
import Registration from "./auth/registration/Registration.js";
import Home from "./Home";
import UserInfo from "./UserInfo";
import Error404 from "./error/Error404";
import NewAd from "./NewAd";


const Main = () => {
    return (
        <main>
            <Switch>
                <PublicRoute restricted={false} exact path="/" component={Home} />
                <PublicRoute restricted={false} exact path="/login" component={Login} />
                <PublicRoute restricted={false} exact path="/register" component={Registration} />
                <PrivateRoute exact path="/user" component={UserInfo} />
                <PrivateRoute exact path="/new-ad" component={NewAd} />
                <PublicRoute component={Error404} />
            </Switch>
        </main>
    )
}

export default Main;