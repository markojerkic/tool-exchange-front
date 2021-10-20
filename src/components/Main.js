import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Auth/Login";
import Register from "./Auth/Register";


const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
        </Switch>
    </main>

)

export default Main;