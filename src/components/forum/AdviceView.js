import React, {useEffect, useState} from "react";
import {Card} from "primereact/card";
import 'primeflex/primeflex.css'
import {useHistory} from 'react-router-dom';
import {Button} from 'primereact/button';
import Moment from 'moment';
import {useParams} from "react-router";
import AdviceService from "../../service/advice.service";

const AdviceView = () => {
	const {id} = useParams();

	const [adviceData, setAdviceData] = useState();

	useEffect(() => {
		AdviceService.getAdviceById(id).then((data) => {
			Moment.locale('hr');
			data.lastModified = new Date(data.lastModified);
			setAdviceData(data);
            console.log(data);
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

	return (
		<div>
			<div className="flex justify-content-center m-6">
				<Card className="card-container" title={adviceData?.title} subTitle={shortRep} header={header}
					  footer={footer} style={{width: '50rem'}}>
					<p>Opis: <b>{adviceData?.details}</b></p>
					<p>Šifra zahtjeva: <b>{adviceData?.id}</b></p>
				</Card>
			</div>
		</div>
	)
}
export default AdviceView;
