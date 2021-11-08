import React from "react";
import {Route, Switch} from "react-router-dom";
import Login from "./auth/login/Login";
import Registration from "./auth/registration/Registration.js";
import Home from "./Home";
import UserInfo from "./UserInfo";
import PrivateRoute from "../routes/PrivateRoute";
import PublicRoute from "../routes/PublicRoute";


const Main = () => (
    <main>
        <Switch>
            <PublicRoute restricted={false} exact path="/" component={Home} />
            <PublicRoute restricted={false} exact path="/login" component={Login} />
            <PublicRoute restricted={false} exact path="/register" component={Registration} />
            <PrivateRoute exact path="/user" component={UserInfo} />
        </Switch>
    </main>

)

export default Main;
