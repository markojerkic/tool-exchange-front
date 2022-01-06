import React from "react";
import AdvertList from "./advert/AdvertList";
import RequestList from "./request/RequestList";

const Home = () => {
	return (
		<div className="mainView shape">
			<div className="adView shape home-tag">
				<h1 className="title">Rezultati pretrage</h1>
				<h2>Alati</h2>
				<AdvertList />
				<h2>Zahtjevi</h2>
				<RequestList />
			</div>
		</div>
	)
}

export default Home;
