import React, {useContext} from "react";
import {AuthContext} from "../common/auth.context";
import UserService from "../service/user/user.service";

const UserInfo = () => {
    const {user} = useContext(AuthContext);
    const [userData, setUserData] = React.useState();
    React.useEffect(() => {
        const getData = async () => {
            const response =  await UserService.getUserByUsername(user.username);
            setUserData(response.data);
        };
        getData();
    }, []);

    console.log(userData);

    return(
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
