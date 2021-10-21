import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./auth/login/Login";
import Registration from "./auth/registration/Registration.js";
import Home from "./Home";


const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Registration} />
        </Switch>
    </main>

)

export default Main;