import React, {useState} from 'react';
import {useHistory} from 'react-router';
import Moment from 'moment';


const AdvicePreview = ({adv}) => {
	const history = useHistory();
	const [advice] = useState(adv);

	advice.lastModified=new Date(advice.lastModified);

	return (

		<div className="singleAdvert grid p-2" style={{cursor: 'pointer'}} onClick={() => history.push(`/forum/${advice.id}`)}>
			{/*
				Ovdje bi mogli prikazati neku default sliku za sve zahtjeve, ali možda da bude razlličita od one
				za oglase? Zasada sam ja uklonio tu sliku, pa onaj ko bude uređivao styling neka sredi to.
			*/}
			{/*<div className="grid-child-element">*/}
			{/*	<img src="default_picture.jpg" className="advertPicture" alt="Slika"/>*/}
			{/*</div>*/}

			<div className="col-12 lg:col-5 sm:col-12">
				<b>{advice?.title} </b>
            </div>
			<div className='col-12 lg:col-3 sm:col-12'>Objavio: <b>{advice?.userCreated}</b></div>
            <div className='col-12 lg:col-3 sm:col-12'>Datum: {Moment(advice?.lastModified).format('DD.MM.yyyy.')}</div>
            <div className='col-12 lg:col-1 sm:col-12 pi pi-comments'> 10 </div>
			
		</div>
	);
}

export default AdvicePreview;
