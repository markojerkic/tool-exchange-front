import React, {useEffect} from "react";
import AuthService from "../service/auth/auth.service";
import {Card} from "primereact/card";

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
						<p className="advertTitle">User: {userData.username} (id-{userData.id})</p>
						<hr></hr>
						<p>Ime: {userData.firstName}</p>
						<p>Prezime: {userData.lastName}</p>
						<p>Email: {userData.email}</p>
						
						<p>Adresa: {userData.formattedAddress}</p>
					</div>
				}
			</div>

		</Card>
	)
}

export default UserInfo;
