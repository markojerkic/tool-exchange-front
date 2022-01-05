import React, {useEffect, useState} from "react";
import RequestService from "../service/ads/request.service";
import Request from "./request/Request";
import AdvertList from "./advert/AdvertList";

const Home = () => {
	const [reqs, setReqs] = useState([]);

	useEffect(() => {
		RequestService.getReqs().then((data1) => {
			setReqs(data1);
		})
	}, []);

	return (
		<div className="mainView shape">
			<div className="adView shape home-tag">
				<h1 className="title">Rezultati pretrage</h1>
				<h2>Alati</h2>
				<AdvertList />
				<h2>Zahtjevi</h2>
				{

					reqs.map(singleRequest => {
						return <Request key={singleRequest.id} request={singleRequest}/>
					})
				}
			</div>

		</div>
	)
}

export default Home;
