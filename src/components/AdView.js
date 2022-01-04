import React, {useEffect, useState} from "react";
import {Card} from "primereact/card";
import 'primeflex/primeflex.css'
import {useHistory} from 'react-router-dom';
import {Button} from 'primereact/button';
import AdService from '../service/ads/ad.service'
import Moment from "moment";
import {useParams} from "react-router";
import {Galleria} from "primereact/galleria";
import ImageService from "../service/image.service";

const AdView = () => {
	const {id} = useParams();

	const [advertData, setAdvertData] = useState();
	const conditions = {
		'NEW': 'Novo',
		'USED': 'Korišteno',
		'DAMAGED': 'Neispravno/Oštećeno'
	};
	const [imageUrls, setImageUrls] = useState([]);

	useEffect(() => {
		AdService.getAdById(id).then((data) => {
			Moment.locale('hr');
			data.lastModified = new Date(data.lastModified);
			setAdvertData(data);
			ImageService.getImagesByAdvertId(data.id).then((images) => {
				setImageUrls(images);
			});
		})
	}, [id]);

	const history = useHistory();
	const header = <div className="divButtonTop">
		<Button label="Povratak na listu oglasa" icon="pi pi-angle-left" onClick={() => history.push("/")}/>
	</div>;
	const footer = <div>
		<label className="generalDate">Datum
			objave: {Moment(advertData?.lastModified).format('DD.MM.yyyy.')}</label>
		<Button className="generalButton" label="Pošalji poruku" style={{float: "right"}}/>
	</div>;
	const shortRep = `Objavljuje ${advertData?.creator.username}`

	const itemTemplate = (item) => {
		return <img src={item} alt={item} style={{ width: '100%' }} />
	}

	const thumbnailTemplate = (item) => {
		return <img src={item} alt={item} style={{ width: '5rem' }} />
	}

	const responsiveOptions = [
		{
			breakpoint: '1024px',
			numVisible: 5
		},
		{
			breakpoint: '768px',
			numVisible: 3
		},
		{
			breakpoint: '560px',
			numVisible: 1
		}
	];

	return (
		<div>
			<div className="p-d-flex p-jc-center p-m-6">
				<Card className="card-container" title={advertData?.title} subTitle={shortRep} header={header}
					  footer={footer} style={{width: '50rem'}}>

					{imageUrls.length > 0 &&
						<Galleria value={imageUrls} numVisible={5} style={{maxWidth: '640px'}}
								  responsiveOptions={responsiveOptions}
								  item={itemTemplate} thumbnail={thumbnailTemplate}/>}

					<p>Opis: <b>{advertData?.details}</b></p>
					<p>Alat: <b>{advertData?.tool.name}</b></p>
					<p>Stanje alata: <b>{conditions[advertData?.tool.toolState]}</b></p>
					<p>Alat je električan: <b>{advertData?.tool.electric ? 'Da' : 'Ne'}</b></p>
					{advertData?.electric &&
						<p>Snaga alata: <b>{advertData?.tool.power} W</b></p>
					}
					<p>Šifra oglasa: <b>{advertData?.id}</b></p>
				</Card>
			</div>
		</div>
	)
}
export default AdView;
