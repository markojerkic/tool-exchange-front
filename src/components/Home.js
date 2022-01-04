import React, {useEffect, useState} from "react";
import AdService from '../service/ads/ad.service';
import RequestService from "../service/ads/request.service";
import Advert from "./Advert";
import Request from "./Request";

const Home = () => {
	const [ads, setAds] = useState([]);
	const [reqs, setReqs] = useState([]);

	useEffect(() => {
		AdService.getAds().then((data) => {
			setAds(data);
		})

		RequestService.getReqs().then((data1) => {
			setReqs(data1);
		})
	}, []);

	return (
		<div className="mainView shape">
			<div className="adView shape home-tag">
				<h1 className="title">Rezultati pretrage</h1>
				<h2>Alati</h2>
				{
					ads.map(singleAdvert => {
						return <Advert key={singleAdvert.id} ad={singleAdvert}/>
					})
				}
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
