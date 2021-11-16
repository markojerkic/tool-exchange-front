import React, {useContext, useEffect} from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../common/auth.context';
import {ToastContext} from '../common/toast.context';

const PrivateRoute = ({component: Component, ...rest}) => {
    const {user} = useContext(AuthContext);
    const {toastRef} = useContext(ToastContext);

    useEffect(() => {
        if(!user) {
            toastRef.current.show({severity:'error', summary: 'Greška', detail: "Za pristup toj komponenti trebate se prijaviti"});
        }
    }, [toastRef, user]);

    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            !!user?
                <Component {...props} />
            : <Redirect to="/login"/>
        )} />
    );
};

export default PrivateRoute;
