import React from "react";
import {Card} from "primereact/card";
import {useHistory} from 'react-router-dom';

const Home = () => {
	const history = useHistory();
	return (
		<Card className="ad-container">

			<div className="flex justify-content-center align-self-center grid">
				<div className="lg:col-2 md:col-2 sm:col-12">
					tu bi ja filtere
				</div>

				<div className="lg:col-8 md:col-8 sm:col-12">

					<h1 className="title p-mb-5">Odaberite kategoriju</h1>

					<div className="grid flex justify-content-center">
						<div
							className="sm:col-12 md:col-12 lg:col-4 xl:col-4 col-12 flex flex-column align-items-center">
							<h3>Forum</h3>
							<i className="pi pi-users buttonHome" onClick={() => history.push('/forum')}/>
						</div>
						<div
							className="sm:col-12 md:col-12 lg:col-4 xl:col-4 col-12 flex flex-column align-items-center">
							<h3>Alati</h3>
							<i className="pi pi-briefcase buttonHome" onClick={() => history.push('/tools')}/>
						</div>
						<div
							className="sm:col-12 md:col-12 lg:col-4 xl:col-4 col-12 flex flex-column align-items-center">
							<h3>Zahtjevi</h3>
							<i className="pi pi-bookmark buttonHome" onClick={() => history.push('/requests')}/>
						</div>
					</div>

				</div>

				<div className="lg:col-2 md:col-2 sm:col-12"/>
			</div>

		</Card>
	)
}

export default Home;
