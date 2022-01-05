import {useEffect, useState} from "react";
import AdService from "../../service/ads/ad.service";
import {Card} from "primereact/card";
import AdvertPreview from "./AdvertPreview";
import {Paginator} from "primereact/paginator";

const AdvertList = () => {
	const [totalAds, setTotalAds] = useState(0);
	const [offset, setOffset] = useState(0);
	const [ads, setAds] = useState([]);

	const [rows] = useState(2);

	useEffect(() => {
		AdService.getAds(offset / rows, rows).then((data) => {
			setTotalAds(data.totalElements);
			setAds(data.content);
		});
	}, [offset, rows]);

	return (
		<Card title='Rezultati pretrage oglasa' >
			{
				ads.map(singleAdvert => {
					return <AdvertPreview key={singleAdvert.id} ad={singleAdvert}/>
				})
			}

			<Paginator rows={rows} first={offset} totalRecords={totalAds}
					   onPageChange={(event) => setOffset(event.first)} />
		</Card>
	)
}

export default AdvertList;
