import {useEffect, useState} from "react";
import AdService from "../../service/ads/ad.service";
import {Card} from "primereact/card";
import AdvertPreview from "./AdvertPreview";
import {Paginator} from "primereact/paginator";

const AdvertList = () => {
	const [totalAds, setTotalAds] = useState(0);
	const [offset, setOffset] = useState(0);
	const [ads, setAds] = useState([]);

	const [rows] = useState(10);

	useEffect(() => {
		AdService.getAds(offset / rows, rows).then((data) => {
			setTotalAds(data.totalElements);
			setAds(data.content);
		});
	}, [offset, rows]);

	return (
		<Card className="ad-container">
			<div className="flex justify-content-center align-self-center grid">
				<div className="lg:col-2 md:col-2 sm:col-12">
					tu bi ja filtere
				</div>
				<div className="lg:col-8 md:col-8 sm:col-12">
				<h1 className="title mb-5">Rezultati pretrage</h1>
				{
					ads.map(advert => {
						return <AdvertPreview key={advert.id} ad={advert}/>
					})
				}
				</div>
				<div className="lg:col-2 md:col-2 sm:col-12"/>	
				<Paginator rows={rows} first={offset} totalRecords={totalAds}
					   onPageChange={(event) => setOffset(event.first)} />
			</div>
		</Card>
	)
}

export default AdvertList;
