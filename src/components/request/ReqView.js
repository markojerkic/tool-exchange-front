import React, {useEffect, useState} from "react";
import {Card} from "primereact/card";
import 'primeflex/primeflex.css'
import {useHistory} from 'react-router-dom';
import {Button} from 'primereact/button';
import RequestService from "../../service/ads/request.service";
import Moment from 'moment';
import {useParams} from "react-router";

const ReqView = () => {
	const {id} = useParams();

	const [requestData, setRequestData] = useState();

	useEffect(() => {
		RequestService.getRequestById(id).then((data) => {
			Moment.locale('hr');
			data.lastModified = new Date(data.lastModified);
			setRequestData(data);
		})
	}, [id]);

	const history = useHistory();
	const header = <div className="divButtonTop">
		<Button label="Povratak na listu zahtjeva" icon="pi pi-angle-left" onClick={() => history.push('/')}/>
	</div>;
	const footer = <div>
		<label className="generalDate">Datum
			objave: {Moment(requestData?.lastModified).format('DD.MM.yyyy.')}</label>
		<Button className="generalButton" label="Pošalji poruku" style={{float: "right"}}/>
	</div>;
	const shortRep = `Objavljuje ${requestData?.creator.username}`

	return (
		<div>
			<div className="p-d-flex p-jc-center p-m-6">
				<Card className="card-container" title={requestData?.title} subTitle={shortRep} header={header}
					  footer={footer} style={{width: '50rem'}}>
					<p>Opis: <b>{requestData?.details}</b></p>
					<p>Šifra zahtjeva: <b>{requestData?.id}</b></p>
				</Card>
			</div>
		</div>
	)
}
export default ReqView;
