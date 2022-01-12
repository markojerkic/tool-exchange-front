import React, {useEffect, useState} from "react";
import {Card} from "primereact/card";
import 'primeflex/primeflex.css'
import {useHistory} from 'react-router-dom';
import {Button} from 'primereact/button';
import RequestService from "../../service/ads/request.service";
import Moment from 'moment';
import {useParams} from "react-router";
import AuthService from "../../service/auth/auth.service";

const ReqView = () => {
	const {id} = useParams();
	const [isDeleting, setIsDeleting] = useState(false);

	const [requestData, setRequestData] = useState();

	useEffect(() => {
		RequestService.getRequestById(id).then((data) => {
			Moment.locale('hr');
			data.lastModified = new Date(data.lastModified);
			setRequestData(data);
		})
	}, [id]);

	const history = useHistory();
	const header = <div className="divButtonTop flex row justify-content-between " >
		<Button label="Povratak na listu zahtjeva" icon="pi pi-angle-left" onClick={() => history.push("/req")}/>
		{AuthService.getCurrentUserToken()?.roles.includes('ROLE_ADMIN')
			?<Button label="Obriši" icon="pi pi-times" className="p-button p-button-danger"
					 loading={isDeleting} disabled={isDeleting}
					 onClick={() => {
						 setIsDeleting(true);
						 RequestService.deleteRequest(id).then(() => {
							 history.push("/advert");
						 }).finally(() => setIsDeleting(false));
					 }}/>
			: ""
		}
	</div>;
	const footer = <div className="grid flex align-items-center">
		<label className="generalDate col">Datum
			objave: {Moment(requestData?.lastModified).format('DD.MM.yyyy.')}</label>
		<div className="col flex align-items-center justify-content-end">
			<Button className="generalButton" label="Pošalji poruku" style={{float: "right"}}/>
		</div>
	</div>;
	const shortRep = `Objavljuje ${requestData?.creator.username}`

	return (
		<div>
			<div className="flex justify-content-center m-6">
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
