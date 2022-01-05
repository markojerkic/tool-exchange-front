import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router';
import ImageService from "../../service/image.service";

const AdvertPreview = props => {
	const history = useHistory();
	const [advert] = useState(props.ad);
	const [imageUrl, setImageUrl] = useState('default_picture.jpg');

	useEffect(() => {
		if (advert.thumbnailImageUuid) {
			setImageUrl(ImageService.getImageByUUID(advert.thumbnailImageUuid));
		}
	}, [advert.id, advert.thumbnailImageUuid]);

	return (

		<div className="singleAdvert grid-parent" onClick={() => history.push(`/advert/${advert.id}`)}>
			<div className="grid-child-element">
				<img src={imageUrl} className="advertPicture" alt="Slika"/>
			</div>
			<div className="grid-child-element">
				<p className="advertElement advertTitle" style={{cursor: 'pointer'}}>{advert?.title}</p>
				<p className="advertElement desc">{advert?.details}</p>
				<p className="advertDate">Objavio korisnik: <span className='p-text-bold'>{advert.userCreated}</span></p>
			</div>
		</div>
	);
}

export default AdvertPreview;
