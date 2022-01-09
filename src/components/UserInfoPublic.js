import React, {useEffect} from "react";
import AuthService from "../service/auth/auth.service";
import {Card} from "primereact/card";
import { Rating } from 'primereact/rating';


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
					<div className="p-px-6 userDetailText parentUserInfo">
						<p className="advertTitle p-mb-2">User: {userData.username} (id-{userData.id})</p>

						<p className="childUserInfo">Prosječna ocjena korisnika:</p>
						<Rating value={4.5} readOnly cancel={false} className="childUserInfo"/>
						
						<hr></hr>
						
						<h3 className="p-mb-2">Ocjene ostalih korisnika</h3>

						<div>
							<p className="childUserInfo">Username korisnika 1: </p>
							<Rating value={4.5} readOnly cancel={false} className="childUserInfo"/>
						</div>
						<div>
							<p className="childUserInfo">Username korisnika 2: </p>
							<Rating value={4.5} readOnly cancel={false} className="childUserInfo"/>
						</div>
						<div>
							<p className="childUserInfo">Username korisnika 3: </p>
							<Rating value={4.5} readOnly cancel={false} className="childUserInfo"/>
						</div>

					</div>
				}
			</div>

		</Card>
	)
}

export default UserInfo;
