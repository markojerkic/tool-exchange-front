import React, {useContext, useEffect, useState} from "react";
import AuthService from "../../service/auth/auth.service";
import {Card} from "primereact/card";
import {Rating} from 'primereact/rating';
import RatingService from "../../service/rating.service";
import {useParams} from "react-router";
import {ToastContext} from "../../common/toast.context";


const UserInfo = () => {
	const [userData, setUserData] = useState();
	const [userRatings, setUserRatings] = useState([]);
	const {username} = useParams('username');
	const [newRating, setNewRating] = useState();
	const {toastRef} = useContext(ToastContext);
	const [reload, setReload] = useState();

	useEffect(() => {
		AuthService.getUserByUsername(username).then((user) => {
			setUserData(user);
			if (user.averageRating) {
				RatingService.getRatings(user.username).then((ratings) => setUserRatings(ratings));
			}
		})
	}, [username, reload]);

	const addNewRating = (rating) => {
		setNewRating(rating);
		RatingService.addRating({
			aboutUser: username,
			mark: rating
		}).then(() => {
			toastRef.current.show({
				severity: 'success',
				summary: 'Uspjeh',
				detail: `Uspješno ste ocijenili korisnika ${username}`
			});
			setReload(Math.random());
		}).catch((err) => {
			if (err.forbidden) {
				toastRef.current.show({
					severity: 'info',
					summary: 'Nije dopušteno',
					detail: 'Ne možete ocijeniti sami sebe'
				});
			}
		});
	}

	return (

		<Card className="ad-container">
			<h1 className="title">Korisnički podaci</h1>
			<div>
				{!userData ? "Loading" :
					<div className="p-px-6 userDetailText parentUserInfo">
						<p className="advertTitle p-mb-2">Korisnik: {userData.username}</p>

						<hr></hr>
						{console.log(AuthService.getCurrentUserToken().roles)}
						authserviis.getcurrentusertoken.roles.contains('ROLE_ADMIN')
						<p>Ime: <b>{userData.firstName}</b></p>
						<p>Prezime: <b>{userData.lastName}</b></p>

						{userData.averageRating &&
							<div>
								<hr></hr>
								<p className="childUserInfo">Prosječna ocjena korisnika: <b>{userData.averageRating}</b>/5</p>
							</div>
						}

						<h3>Dodajte novu ocjenu korisnika:</h3>
						<Rating value={newRating} onChange={(e) => addNewRating(e.value)} stars={5}
								readOnly={!!newRating} cancel={false}/>


						{userRatings.length > 0 &&
							<div>
								<hr></hr>

								<h3 className="p-mb-2">Ocjene:</h3>
								{userRatings.map((rating) => {
									return (
										<div key={`card-rating-${rating.id}`}>
											<p className="childUserInfo"
											   key={`card-rating-title-${rating.id}`}>{rating.fromUser}: </p>
											<Rating value={rating.mark} key={`card-rating-mark-${rating.id}`}
													readOnly cancel={false} className="childUserInfo"/>
										</div>
									);
								})}
							</div>
						}

					</div>
				}
			</div>

		</Card>
	)
}

export default UserInfo;
