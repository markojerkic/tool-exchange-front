import React from "react";
import AdvertList from "./advert/AdvertList";
import RequestList from "./request/RequestList";
import {Card} from "primereact/card";

const Home = () => {
	return (
		// <div className="mainView shape">
			<Card className="ad-container">

				<div className="p-d-flex p-jc-center  p-as-center p-grid">
					<div className="p-lg-2 p-md-2 p-sm-12">
						tu bi ja filtere
					</div>

					<div className="p-lg-8 p-md-8 p-sm-12">
						<h1 className="title">Rezultati pretrage</h1>
						<h2>Alati</h2>
						<AdvertList />
						<h2>Zahtjevi</h2>
						<RequestList />
					</div>

					<div className="p-lg-2 p-md-2 p-sm-12"></div>
				</div>

			</Card>
		// </div>
	)
}

export default Home;
