import React, {useContext, useEffect, useState} from "react";
import {Card} from "primereact/card";
import 'primeflex/primeflex.css'
import {useHistory} from 'react-router-dom';
import {Button} from 'primereact/button';
import AdService from '../../service/ads/ad.service'
import Moment from "moment";
import {useParams} from "react-router";
import {Galleria} from "primereact/galleria";
import ImageService from "../../service/image.service";
import NewOffer from "../offer/NewOffer";
import {Sidebar} from "primereact/sidebar";
import AuthService from "../../service/auth/auth.service";
import {AuthContext} from "../../common/auth.context";
import UserLink from "../user/UserLink";

const AdView = () => {

	const {user} = useContext(AuthContext);

	const {id} = useParams();

	const [isDeleting, setIsDeleting] = useState(false);
	const [advertData, setAdvertData] = useState();
	const [showOfferDialog, setShowOfferDialog] = useState(false);
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
	const header = <div className="divButtonTop flex row justify-content-between " >
		<Button label="Povratak na listu oglasa" icon="pi pi-angle-left" onClick={() => history.push("/advert")}/>
		{AuthService.getCurrentUserToken()?.roles.includes('ROLE_ADMIN')
			?<Button label="Obriši" icon="pi pi-times" className="p-button p-button-danger"
					 disabled={isDeleting} loading={isDeleting}
					 onClick={() => {
						 setIsDeleting(true);
						 AdService.deleteAd(id).then(() => history.push("/advert"))
							 .finally(() => setIsDeleting(false));
					 }}/>
			: ""
		}
	</div>;
	const footer = <div className="grid flex align-items-center">
		<label className="generalDate col">Datum
			objave: {Moment(advertData?.lastModified).format('DD.MM.yyyy.')}</label>
		<div className="col flex justify-content-end">
			<Button className="generalButton" disabled={!user} label="Pošalji ponudu" onClick={() => setShowOfferDialog(true)}
					style={{float: "right"}}/>
		</div>
	</div>;
	const shortRep = `Objavljuje ${advertData?.creator.username}`

	const itemTemplate = (item) => {
		return <img src={item} alt={item} style={{width: '80%'}}/>
	}

	const thumbnailTemplate = (item) => {
		return <img src={item} alt={item} style={{width: '5rem', maxWidth: '80%'}}/>
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
			<div className="flex justify-content-center m-6">
				<Card className="card-container" title={advertData?.title} header={header}
					  footer={footer} style={{width: '50rem'}}>

					<h3 className="flex">Objavljuje <UserLink username={advertData?.creator.username}
															  isBest={advertData?.creator.isBestHandyman} /></h3>

					<div className="flex justify-content-center">
						{imageUrls.length > 0 &&
							<Galleria value={imageUrls} numVisible={5} style={{maxWidth: '640px'}}
									  className="justify-self-center"
									  responsiveOptions={responsiveOptions}
									  item={itemTemplate} thumbnail={thumbnailTemplate}/>}
					</div>

					<p>Opis: <b>{advertData?.details}</b></p>
					<p>Alat: <b>{advertData?.tool.name}</b></p>
					<p>Stanje alata: <b>{conditions[advertData?.tool.toolState]}</b></p>
					<p>Alat je električan: <b>{advertData?.tool.electric ? 'Da' : 'Ne'}</b></p>
					{advertData?.tool.electric &&
						<p>Snaga alata: <b>{advertData?.tool.power} W</b></p>
					}
					<p>Šifra oglasa: <b>{advertData?.id}</b></p>
				</Card>
			</div>

			{ advertData && (
				<Sidebar visible={showOfferDialog} fullScreen
						 onHide={() => setShowOfferDialog(false)}>
					<div className="flex justify-content-center p-ai-center">
						<NewOffer advertId={advertData.id} onComplete={() => setShowOfferDialog(false)}/>
					</div>
				</Sidebar>
			) }

		</div>
	)
}
export default AdView;
