import React, {useState} from 'react';
import {useHistory} from 'react-router';
import Moment from 'moment';

const Advert = props => {
	const history = useHistory();
	const [advert] = useState(props.ad);
	Moment.locale('hr')
	const date = new Date(advert.lastModified);
	const conditions = {
		'NEW': 'Novo',
		'USED': 'Korišteno',
		'DAMAGED': 'Neispravno/Oštećeno'
	};

	return (

		<div className="singleAdvert grid-parent" onClick={() => history.push(`/advert/${advert.id}`)}>
			<div className="grid-child-element">
				<img src="default_picture.jpg" className="advertPicture" alt="Slika"/>
			</div>
			<div className="grid-child-element">
				<p className="advertElement advertTitle">{advert?.title}</p>
				<p className="advertElement desc">{advert?.details}</p>
				{!!advert?.tool &&
					<div>
						<p>Alat: <b>{advert?.tool.name}</b></p>
						<p>Stanje alata: <b>{conditions[advert?.tool.toolState]}</b></p>
					</div>
				}
				<p className="advertDate">Datum objave: {Moment(date).format('DD.MM.yyyy.')}</p>
			</div>
		</div>
	);
}

export default Advert;
