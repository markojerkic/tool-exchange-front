import 'primeflex/primeflex.min.css';
import 'primeicons/primeicons.css';
import PrimeReact from 'primereact/api';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/arya-blue/theme.css';
import React, {createContext, useState} from 'react';
import { useHistory } from 'react-router';
import './App.css';
import Main from './components/Main';
import AuthService from "./service/auth/auth.service";
import {AuthContext} from "./common/auth.context";
 
const App = () => {
      const history = useHistory();

      const menuItems = [
        {
            label: 'Oglasi',
            icon: 'pi pi-book',
            items: [
                {
                    label: 'Dodaj novi oglas',
                    icon: 'pi pi-plus'
                },
                {
                    label: 'Pregledaj oglase',
                    icon: 'pi pi-list'
                }
            ]
        }
      ];

    const [user, setUser] = useState(AuthService.getCurrentUser());

    const start = <img alt="logo" src="../../favicon.ico"
        onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
        height="40" className="p-mr-2"
        onClick={() => history.push('/')} ></img>;
    const end = <span>
        <Button label="Registracija" className="p-button-raised p-button-danger p-button-rounded" onClick={() => history.push('/register')} />
        <Button label="Prijava" className="p-button-raised p-button-rounded " onClick={() => history.push('/login')} />
    </span>
    const logout = <span>
        <Button label="Odjavi se" className="p-button-raised p-button-rounded" onClick={() => {
                AuthService.logout(setUser);
                setUser({});
            }
        } />
    </span>

    PrimeReact.ripple = true;
    return(
        <AuthContext.Provider value={{user, setUser}}>
            <div className="p-m-2">
                <Menubar model={menuItems} start={start} end={user.username? logout: end}/>
                <Main />
            </div>
        </AuthContext.Provider>
    );
}

export default App;
