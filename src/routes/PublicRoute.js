import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserService from "../service/user/user.service";

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            UserService.isLoggedIn() && restricted ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;