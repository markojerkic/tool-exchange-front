import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../common/auth.context';
import {ToastContext} from '../common/toast.context';

const PrivateRoute = ({component: Component, ...rest}) => {
    const {user} = useContext(AuthContext);
    const toastRef = useContext(ToastContext);

    if(!user.username) {
        toastRef.current.show({severity:'error', summary: 'Greška', detail: "Za pristup toj komponenti trebate se prijaviti"});
    }

    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            user.username ?
                <Component {...props} />
            : <Redirect to="/login"/>
        )} />
    );
};

export default PrivateRoute;