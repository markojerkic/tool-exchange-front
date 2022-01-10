import React, {useEffect} from "react";
import {Card} from "primereact/card";
import {Rating} from 'primereact/rating';
import AuthService from "../../service/auth/auth.service";

const UserInfo = () => {
	const [userData, setUserData] = React.useState();

	useEffect(() => {
		AuthService.getCurrentLoggedInUser().then((user) => {
			setUserData(user);
		})
	}, []);

	return (

		<Card className="ad-container">
			<h1 className="title">Korisnički podaci</h1>
			<div>
				{!userData ? "Loading" :
					<div className="p-pl-6 userDetailText">
						<p className="advertTitle p-my-2">User: {userData.username} (id-{userData.id})</p>
						<Rating value={4.5} readOnly cancel={false} />
						<hr></hr>
						<p>Ime: <b>{userData.firstName}</b></p>
						<p>Prezime: <b>{userData.lastName}</b></p>
						<p>Email: <b>{userData.email}</b></p>
						
						<p>Adresa: <b>{userData.formattedAddress}</b></p>

						
					</div>
				}
			</div>

		</Card>
	)
}

export default UserInfo;
