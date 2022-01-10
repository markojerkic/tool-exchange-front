import React from "react";
import {Card} from "primereact/card";
import {useHistory} from 'react-router-dom';
import '../App.css';

const Home = () => {
	const history = useHistory();
	return (
		<Card className="ad-container">

			<div className="flex justify-content-center align-self-center grid">

				<h1 className="title mb-5 col-12">Odaberite kategoriju</h1>

				<div className="grid flex justify-content-center col-12">
					<div
						className="sm:col-12 md:col-12 lg:col-4 xl:col-4 col-12 flex flex-column align-items-center">
						<h2>Forum</h2>
						<i className="pi pi-users button-home navigation-icon" onClick={() => history.push('/forum')}/>
					</div>
					<div
						className="sm:col-12 md:col-12 lg:col-4 xl:col-4 col-12 flex flex-column align-items-center">
						<h2>Alati</h2>
						<i className="pi pi-briefcase button-home navigation-icon"
						   onClick={() => history.push('/tools')}/>
					</div>
					<div
						className="sm:col-12 md:col-12 lg:col-4 xl:col-4 col-12 flex flex-column align-items-center">
						<h2>Zahtjevi</h2>
						<i className="pi pi-bookmark button-home navigation-icon"
						   onClick={() => history.push('/requests')}/>
					</div>
					</div>

			</div>

		</Card>
	)
}

export default Home;
