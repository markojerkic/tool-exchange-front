import React from "react";
import AdvertList from "./advert/AdvertList";
import RequestList from "./request/RequestList";
import {Card} from "primereact/card";

const Home = () => {
	return (
		// <div className="mainView shape">
			<Card className="ad-container">

				<div className="flex justify-content-center align-self-center grid">
					<div className="lg:col-2 md:col-2 sm:col-12">
						tu bi ja filtere
					</div>

					<div className="lg:col-8 md:col-8 sm:col-12">
						<h1 className="title">Rezultati pretrage</h1>
						<h2>Alati</h2>
						<AdvertList/>
						<h2>Zahtjevi</h2>
						<RequestList/>
					</div>

					<div className="lg:col-2 md:col-2 sm:col-12"/>
				</div>

			</Card>
		// </div>
	)
}

export default Home;
