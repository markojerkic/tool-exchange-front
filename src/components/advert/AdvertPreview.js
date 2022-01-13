import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router';
import ImageService from "../../service/image.service";
import UserLink from "../user/UserLink";

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

		<div id="card" className="singleAdvert grid p-2" style={{cursor: 'pointer'}}
			 onClick={() => history.push(`/advert/${advert.id}`)}>
			<img src={imageUrl} className="col advertPicture" alt="Slika"/>
			<div className="grid col flex align-items-stretch">
				<div className='col-12'>
					<p className="advertTitle">{advert.title}</p>
					<p className="desc pb-2">{advert.details}</p>
				</div>
				<p className='col-12 absolute bottom-0 left-30'>Objavio korisnik: <UserLink username={advert.userCreated}
																							isBest={!!advert.isBest} /></p>
			</div>
		</div>
	);
}

export default AdvertPreview;
