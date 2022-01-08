import React, {useState} from 'react';
import {useHistory} from 'react-router';
import PrimeReact from 'primereact/api';


const AdvicePreview = ({req}) => {
	const history = useHistory();
	const [request] = useState(req);

	return (

		<div className="singleAdvert p-grid p-p-2" style={{cursor: 'pointer'}} onClick={() => history.push(`/req/${request.id}`)}>
			{/*
				Ovdje bi mogli prikazati neku default sliku za sve zahtjeve, ali možda da bude razlličita od one
				za oglase? Zasada sam ja uklonio tu sliku, pa onaj ko bude uređivao styling neka sredi to.
			*/}
			{/*<div className="grid-child-element">*/}
			{/*	<img src="default_picture.jpg" className="advertPicture" alt="Slika"/>*/}
			{/*</div>*/}

			<div className="p-col-5">
				<p className="advertTitle">{request?.title}</p>
            </div>
			<div className='p-col-3'>Objavio: <b>{request?.userCreated}</b></div>
            <div className='p-col-3'>Datum:</div>
            <div className='p-col-1 pi pi-comments'> 10 </div>
			
		</div>
	);
}

export default AdvicePreview;
