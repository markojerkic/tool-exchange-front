import 'primeflex/primeflex.min.css';
import 'primeicons/primeicons.css';
import PrimeReact from 'primereact/api';
import {Button} from 'primereact/button';
import {Menubar} from 'primereact/menubar';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/arya-blue/theme.css';
import React, {useRef, useState} from 'react';
import {useHistory} from 'react-router';
import './App.css';
import Main from './components/Main';
import AuthService from "./service/auth/auth.service";
import {AuthContext} from "./common/auth.context";
import {ToastContext} from "./common/toast.context";
import {Toast} from "primereact/toast";

const App = () => {
	const history = useHistory();

	const navigateToPage = (path) => {
		history.push(path);
	}

	const menuItems = [
		{
			label: 'Oglasi',
			icon: 'pi pi-book',
			items: [
				{
					label: 'Dodaj novi oglas',
					icon: 'pi pi-plus',
					command: () => {
						navigateToPage('/new-entry')
					}
				},
				{
					label: 'Pregledaj oglase',
					icon: 'pi pi-list',
					command: () => {
						navigateToPage('')
					}
				}
			]
		}
	];

	const [user, setUser] = useState(AuthService.getCurrentUserToken());

	const toastRef = useRef(null);

	const start = <img alt="logo" src="../../favicon.ico"
					   onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
					   height="40" className="p-mr-2"
					   onClick={() => history.push('/')}>
	</img>;
	const login = <span>
    <Button label="Registracija" className="p-button-raised p-button-danger p-button-rounded p-mr-1"
			onClick={() => history.push('/register')}/>
    <Button label="Prijava" className="p-button-raised p-button-rounded " onClick={() => history.push('/login')}/>
  </span>
	const logout = <span>
    <Button label="Profil" className="p-button-raised p-button-rounded p-mr-1" onClick={() => history.push('/user')}/>
    <Button label="Odjavi se" className="p-button-raised p-button-rounded" onClick={() => {
		AuthService.logout(setUser);
		setUser();
	}
	}/>
  </span>

	PrimeReact.ripple = true;
	return (
		<AuthContext.Provider value={{user, setUser}}>
			<ToastContext.Provider value={{toastRef}}>
				<Toast ref={toastRef}/>
				<div className="p-m-2">
					<Menubar model={menuItems} start={start} end={!!user ? logout : login}/>
					<Main/>
				</div>
			</ToastContext.Provider>
		</AuthContext.Provider>
	);
}

export default App;
