import React, {useEffect, useState} from "react";
import AdService from "../../service/ads/ad.service";
import {Card} from "primereact/card";
import AdvertPreview from "./AdvertPreview";
import {Paginator} from "primereact/paginator";
import HomeFilterBar from "../home-filter/HomeFilter";
import defaultFilters from "../../service/filter/default-filters";

const AdvertList = () => {
	const [totalAds, setTotalAds] = useState(0);
	const [offset, setOffset] = useState(0);
	const [ads, setAds] = useState([]);
	const [filters, setFilters] = useState(defaultFilters);

	const [rows] = useState(10);

	useEffect(() => {
		AdService.getAds(offset / rows, rows, filters).then((data) => {
			setTotalAds(data.totalElements);
			setAds(data.content);
		});
	}, [offset, rows, filters]);

	const filter = (filter) => {
		setFilters(filter);
	}

	return (
		<Card className="ad-container">
			<div className="flex justify-content-center align-self-center grid">
				<div className="xl:col-3 col-12 flex justify-content-center">
					<HomeFilterBar onFilter={filter} />
				</div>
				<div className="xl:col-6 col-12 flex-shrink">
					<h1 className="title mb-5">Rezultati pretrage</h1>
					{
						ads.map(advert => {
							return <AdvertPreview key={advert.id} ad={advert} />
						})
					}
					<Paginator rows={rows} first={offset} totalRecords={totalAds}
							   onPageChange={(event) => setOffset(event.first)} />
				</div>
				<div className="xl:col-3 col-12"/>
			</div>
		</Card>
	)
}

export default AdvertList;
