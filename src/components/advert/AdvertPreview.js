import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router';
import ImageService from "../../service/image.service";

const AdvertPreview = ({ad}) => {
	const history = useHistory();
	const [advert] = useState(ad);
	const [imageUrl, setImageUrl] = useState('default_picture.jpg');

	useEffect(() => {
		if (advert.thumbnailImageUuid) {
			setImageUrl(ImageService.getImageByUUID(advert.thumbnailImageUuid));
		}
	}, [advert.id, advert.thumbnailImageUuid]);

	return (

		<div className="singleAdvert p-grid p-p-2" style={{cursor: 'pointer'}}
			 onClick={() => history.push(`/advert/${advert.id}`)}>
			<img src={imageUrl} className="p-col advertPicture" alt="Slika"/>
			<div className="p-grid p-col p-d-flex p-align-stretch">
				<div className='p-col-12'>
					<p className="advertTitle">{advert.title}</p>
					<p className="desc">{advert.details}</p>
				</div>
				<p className='p-col-12'>Objavio korisnik: <b>{advert.userCreated}</b></p>
			</div>
		</div>
	);
}

export default AdvertPreview;
