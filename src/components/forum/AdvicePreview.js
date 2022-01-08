import React, {useState} from 'react';
import {useHistory} from 'react-router';
import PrimeReact from 'primereact/api';


const AdvicePreview = ({req}) => {
	const history = useHistory();
	const [request] = useState(req);

	return (

		<div className="singleAdvert grid p-2" style={{cursor: 'pointer'}} onClick={() => history.push(`/req/${request.id}`)}>
			{/*
				Ovdje bi mogli prikazati neku default sliku za sve zahtjeve, ali možda da bude razlličita od one
				za oglase? Zasada sam ja uklonio tu sliku, pa onaj ko bude uređivao styling neka sredi to.
			*/}
			{/*<div className="grid-child-element">*/}
			{/*	<img src="default_picture.jpg" className="advertPicture" alt="Slika"/>*/}
			{/*</div>*/}

			<div className="col-12 lg:col-5 sm:col-12">
				<p className="advertTitle">{request?.title}</p>
            </div>
			<div className='col-12 lg:col-3 sm:col-12'>Objavio: <b>{request?.userCreated}</b></div>
            <div className='col-12 lg:col-3 sm:col-12'>Datum:</div>
            <div className='col-12 lg:col-1 sm:col-12 pi pi-comments'> 10 </div>
			
		</div>
	);
}

export default AdvicePreview;
