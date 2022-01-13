import 'primeflex/primeflex.min.css';
import 'primeicons/primeicons.css';
import PrimeReact, {addLocale} from 'primereact/api';
import {Button} from 'primereact/button';
import {Menubar} from 'primereact/menubar';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/arya-blue/theme.css';
import React, {useEffect, useRef, useState} from 'react';
import {useHistory} from 'react-router';
import './App.css';
import Main from './components/Main';
import AuthService from "./service/auth/auth.service";
import {AuthContext} from "./common/auth.context";
import {ToastContext} from "./common/toast.context";
import {Toast} from "primereact/toast";
import {Tooltip} from "primereact/tooltip";
import {Badge} from "primereact/badge";
import OfferService from "./service/offer.service";
import {PendingRequestsContext} from "./common/pending-offers.context";

const App = () => {

	addLocale('hr', {
		firstDayOfWeek: 1,
		dayNames: ['Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota'],
		dayNamesShort: ['ned', 'pon', 'uto', 'sri', 'čet', 'pet', 'sub'],
		dayNamesMin: ['N', 'P', 'U', 'S', 'Č', 'P', 'S'],
		monthNames: ['Siječanj', 'Veljača', 'Ožujak', 'Travanj', 'Svibanj', 'Lipanj',
			'Spranj', 'Kolovoz', 'Rujan', 'Listopad', 'Studeni', 'Prosinac'],
		monthNamesShort: ['sij', 'velj', 'ožu', 'tra', 'svi', 'lip', 'sep', 'kol', 'ruj', 'lis', 'stu', 'pro'],
		today: 'Danas',
		clear: 'Očisti'
	});

	const [user, setUser] = useState(AuthService.getCurrentUserToken());

	const toastRef = useRef(null);

	const [pendingOffers, setPendingOffers] = useState(0);
	const [reloadPendingOffers, setReloadPendingOffers] = useState(-1);

	useEffect(() => {
		if (user) {
			OfferService.countPendingoffers().then((count) => {
				setPendingOffers(count);
			});
		}
	}, [user, reloadPendingOffers]);

	const history = useHistory();

	const navigateToPage = (path) => {
		history.push(path);
	}

	const menuItems = [
		{
			label: 'Naslovnica',
			icon: 'pi pi-home',
			command: () => {
				navigateToPage('/')
			}
		},
		{
			label: 'Oglasi',
			icon: 'pi pi-book',
			items: [
				{
					label: 'Dodaj novi oglas',
					icon: 'pi pi-plus',
					command: () => {
						navigateToPage('/new-ad')
					}
				},
				{
					label: 'Pregledaj oglase',
					icon: 'pi pi-bars',
					items: [
						{
							label: 'Oglasi za alat',
							icon: 'pi pi-briefcase',
							command: () => {
								navigateToPage('/advert')
							}
						},
						{
							label: 'Oglasi za zahtjeve',
							icon: 'pi pi-bookmark',
							command: () => {
								navigateToPage('/req')
							}
						}
					]
					
				}
			]
		},
		{
			label: 'Forum',
			icon: 'pi pi-users',
			command: () => {
				navigateToPage('/forum')
			}
		}
	];

	const start = <img alt="logo" src="../../favicon.ico"
					   height="40" className="mr-2 mb-0"
					   style={{cursor: 'pointer'}}
					   data-pr-tooltip="Početna stranica"
					   onClick={() => history.push('/')}>
	</img>;
	const login = <span>
    <Button label="Registracija" className="p-button-raised p-button-danger p-button-rounded mr-1"
			onClick={() => history.push('/register')}/>
    <Button label="Prijava" className="p-button-raised p-button-rounded " onClick={() => history.push('/login')}/>
  </span>
	const logout = <span className="flex flex-row">
		<Button className="p-button-rounded p-button-text mr-1" tooltip='Ponude' onClick={() => history.push('/offers')}>
			<i className="pi pi-envelope p-text-secondary p-overlay-badge" style={{fontSize: '1.5rem'}}>
				{(pendingOffers > 0 && user) &&
					<Badge value={pendingOffers}/>
				}
			</i>
		</Button>
		<Button label="Profil" className="p-button-raised p-button-rounded mr-1"
				onClick={() => history.push('/user')}/>
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
				<PendingRequestsContext.Provider value={{setReloadPendingOffers}}>
					<Tooltip target=".home-page"/>
					<Toast ref={toastRef}/>
					<div className="m-2">
						<Menubar className="mb-3" model={[...menuItems,
							(user && user.roles.includes('ROLE_ADMIN')? {
									label: 'Korisnici',
									icon: 'pi pi-user-edit',
									command: () => {
										navigateToPage('/users')
									}
								}:
								{})]} start={start} end={!!user ? logout : login}/>
						<Main/>
					</div>
				</PendingRequestsContext.Provider>
			</ToastContext.Provider>
		</AuthContext.Provider>
	);
}

export default App;
