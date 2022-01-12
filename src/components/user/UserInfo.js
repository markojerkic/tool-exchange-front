import React, {useEffect, useState} from "react";
import {Card} from "primereact/card";
import {Rating} from 'primereact/rating';
import AuthService from "../../service/auth/auth.service";
import {Button} from "primereact/button"
import {useHistory} from "react-router-dom";
import OfferList from "../offer/OfferList";

const UserInfo = () => {
	const [userData, setUserData] = useState();
	const history = useHistory();

	useEffect(() => {
		AuthService.getCurrentLoggedInUser().then((user) => {
			setUserData(user);
		})
	}, []);

	return (

		<Card className="ad-container" subTitle={<Button icon="pi pi-user" className="my-2 p-button-info"
														 label="Promjeni osobne podatke"
														 onClick={() => history.push("/user/update")}/>}>
			<h1 className="title">Korisnički podaci</h1>
			<div>
				{!userData ? "Loading" :
					<div className="pl-6 pr-6 userDetailText">
						<div className="flex row justify-content-between"><
							p className="advertTitle my-2">Korisnik: {userData.username}</p>
						</div>
						{userData.averageRating &&
							<Rating value={userData.averageRating} readOnly cancel={false}/>
						}
						<hr></hr>
						<p>Ime: <b>{userData.firstName}</b></p>
						<p>Prezime: <b>{userData.lastName}</b></p>
						<p>Email: <b>{userData.email}</b></p>
						<p>Adresa: <b>{userData.formattedAddress}</b></p>

						<hr/>
						<OfferList mine={true} />
					</div>
				}
			</div>

		</Card>
	)
}

export default UserInfo;
