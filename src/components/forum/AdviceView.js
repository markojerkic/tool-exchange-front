import React, {useEffect, useState} from "react";
import {Card} from "primereact/card";
import 'primeflex/primeflex.css'
import {useHistory} from 'react-router-dom';
import {Button} from 'primereact/button';
import Moment from 'moment';
import {useParams} from "react-router";
import AdviceService from "../../service/advice.service";
import ImageService from "../../service/image.service";
import {Galleria} from "primereact/galleria";
import CommentSection from "./CommentSection"

const AdviceView = () => {
	const {id} = useParams();

	const [adviceData, setAdviceData] = useState();

	const [imageUrls, setImageUrls] = useState([]);

	const defaultValues = {
		title: '',
		details: ''
	};

	useEffect(() => {
		AdviceService.getAdviceById(id).then((data) => {
			Moment.locale('hr');
			data.lastModified = new Date(data.lastModified);
			setAdviceData(data);
            //console.log(data);
			ImageService.getImagesByAdvertId(data.id).then((images) => {
				setImageUrls(images);
			});
		})
	}, [id]);

	const history = useHistory();
	const header = <div className="divButtonTop">
		<Button label="Povratak na forum" icon="pi pi-angle-left" onClick={() => history.push('/forum')}/>
	</div>;
	const footer = <div className="grid flex align-items-center">
		<label className="generalDate col">Datum
			objave: {Moment(adviceData?.lastModified).format('DD.MM.yyyy.')}</label>
		<div className="col flex align-items-center justify-content-end">
			<Button className="generalButton" label="Pošalji poruku" style={{float: "right"}}/>
		</div>
	</div>;
	const shortRep = `Objavljuje ${adviceData?.creator.username}`

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
				<Card className="card-container" title={adviceData?.title} subTitle={shortRep} header={header}
					  footer={footer} style={{width: '50rem'}}>
					<div className="flex justify-content-center">
						{imageUrls.length > 0 &&
							<Galleria value={imageUrls} numVisible={5} style={{maxWidth: '640px'}}
									  className="justify-self-center"
									  responsiveOptions={responsiveOptions}
									  item={itemTemplate} thumbnail={thumbnailTemplate}/>}
					</div>
					<p>Opis: <b>{adviceData?.details}</b></p>
					<p>Šifra zahtjeva: <b>{adviceData?.id}</b></p>
				</Card>

				
			</div>

			<div className="flex justify-content-center m-6">
				<CommentSection threadId={adviceData?.id}/>
			</div>
		</div>
	)
}
export default AdviceView;
