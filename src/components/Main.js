import React from "react";
import {Route, Switch} from "react-router-dom";
import Login from "./auth/login/Login";
import Registration from "./auth/registration/Registration.js";
import Home from "./Home";
import UserInfo from "./UserInfo";


const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Registration} />
            <Route exact path="/user" component={UserInfo} />
        </Switch>
    </main>

)

export default Main;
