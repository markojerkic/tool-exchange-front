import React, {useState} from 'react';
import {useHistory} from 'react-router';

const RequestPreview = ({req}) => {
	const history = useHistory();
	const [request] = useState(req);

	return (

		<div className="singleAdvert p-p-3" style={{cursor: 'pointer'}} onClick={() => history.push(`/req/${request.id}`)}>
			{/*
				Ovdje bi mogli prikazati neku default sliku za sve zahtjeve, ali možda da bude razlličita od one
				za oglase? Zasada sam ja uklonio tu sliku, pa onaj ko bude uređivao styling neka sredi to.
			*/}
			{/*<div className="grid-child-element">*/}
			{/*	<img src="default_picture.jpg" className="advertPicture" alt="Slika"/>*/}
			{/*</div>*/}

			<p className="advertTitle">{request?.title}</p>
			<p>Šifra zahtjeva: <b>{request?.id}</b></p>
			<div>Opis: <b>{request?.details}</b></div>
			<p>Objavio korisnik: <span className='p-text-bold'>{request.userCreated}</span></p>

		</div>
	);
}

export default RequestPreview;
