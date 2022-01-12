import React, {useContext, useEffect} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {AuthContext} from '../common/auth.context';
import {ToastContext} from '../common/toast.context';

const PrivateRoute = ({requireAdmin, component: Component, ...rest}) => {
	const {user} = useContext(AuthContext);
	const {toastRef} = useContext(ToastContext);

	useEffect(() => {
		if (!user) {
			toastRef.current.show({
				severity: 'info', summary: 'Potrebna prijava',
				detail: "Za pristup toj komponenti trebate se prijaviti"
			});
		}
	}, [requireAdmin, toastRef, user]);

	return (

		// Show the component only when the user is logged in
		// Otherwise, redirect the user to /signin page
		<Route {...rest} render={props => {
			if (!!requireAdmin && (!user || !user.roles.includes('ROLE_ADMIN'))) {
				if (toastRef.current) {
					toastRef.current.show({
						severity: 'info', summary: 'Potrebna prava admina',
						detail: "Za pristup toj komponenti morate imati ulogu admina"
					});
				}
				return <Redirect to="/" />
			}
			return (
				!!user ?
					<Component {...props} />
					: <Redirect to="/login"/>
			);
		}}/>
	);
};

export default PrivateRoute;
