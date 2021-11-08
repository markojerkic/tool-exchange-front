import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserService from "../service/user/user.service";
import TokenService from "../service/auth/auth.service";

const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            UserService.isLoggedIn() ?
                <Component {...props} />
            : <Redirect to={{pathname: "/login",
            state: {message: "Za pristup traženoj stranici se morate prijaviti!"} 
            }}/>
        )} />
    );
};

export default PrivateRoute;