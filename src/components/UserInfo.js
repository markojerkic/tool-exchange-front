import React, {useEffect} from "react";
import AuthService from "../service/auth/auth.service";

const UserInfo = () => {
	const [userData, setUserData] = React.useState();

	useEffect(() => {
		AuthService.getCurrentLoggedInUser().then((user) => {
			setUserData(user);
		})
	}, []);

	return (
		<div>
			<h1 className="stdText">Info</h1>
			<div>
				{!userData ? "Loading" :
					<div>
						<p>Username = {userData.username}</p>
						<p>First Name = {userData.firstName}</p>
						<p>Last Name = {userData.lastName}</p>
						<p>Email = {userData.email}</p>
					</div>
				}
			</div>

		</div>
	)
}

export default UserInfo;
