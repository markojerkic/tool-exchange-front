import React, {useEffect, useState} from "react";
import AuthService from "../service/auth/auth.service";
import {Card} from "primereact/card";
import {Rating} from 'primereact/rating';
import RatingService from "../service/rating.service";
import {useParams} from "react-router";


const UserInfo = () => {
	const [userData, setUserData] = useState();
	const [userRatings, setUserRatings] = useState([]);
	const {username} = useParams('username');

	useEffect(() => {
		AuthService.getUserByUsername(username).then((user) => {
			setUserData(user);
			if (user.averageRating) {
				RatingService.getRatings(user.username).then((ratings) => setUserRatings(ratings));
			}
		})
	}, [username]);

	return (

		<Card className="ad-container">
			<h1 className="title">Korisnički podaci</h1>
			<div>
				{!userData ? "Loading" :
					<div className="p-px-6 userDetailText parentUserInfo">
						<p className="advertTitle p-mb-2">Korisnik: {userData.username}</p>

						{userData.averageRating &&
							<div>
								<p className="childUserInfo">Prosječna ocjena korisnika:</p>
								<Rating value={userData.averageRating} readOnly cancel={false}/>
							</div>
						}
						<hr></hr>
						<p>Ime: <b>{userData.firstName}</b></p>
						<p>Prezime: <b>{userData.lastName}</b></p>


						{userRatings.length > 0 &&
							<div>
								<hr></hr>

								<h3 className="p-mb-2">Ocjene:</h3>
								{userRatings.map((rating) => {
									return (<div>
										<p className="childUserInfo">{rating.fromUser}: </p>
										<Rating value={rating.maek} readOnly cancel={false} className="childUserInfo"/>
									</div>);
								})}
							</div>
						}
						{/*<div>*/}
						{/*	<p className="childUserInfo">Username korisnika 2: </p>*/}
						{/*	<Rating value={4.5} readOnly cancel={false} className="childUserInfo"/>*/}
						{/*</div>*/}
						{/*<div>*/}
						{/*	<p className="childUserInfo">Username korisnika 3: </p>*/}
						{/*	<Rating value={4.5} readOnly cancel={false} className="childUserInfo"/>*/}
						{/*</div>*/}

					</div>
				}
			</div>

		</Card>
	)
}

export default UserInfo;
