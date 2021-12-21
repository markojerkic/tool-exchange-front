import React, {useEffect} from "react";
import UserService from "../service/user.service";


const UserList = () => {
    const [usersData, setUsersData] = React.useState();

    useEffect(() => {
        UserService.getUsers().then((users) => {
            setUsersData(users);
        })
    }, []);

    function test(){ //implementirati nekako da pokaaze/sakrije detaljne informacije klikom
        console.log("radi!!");
    }

    const makeList = usersData => usersData.map((user,i) => (
        <div onClick={() => test()}>
            <h2>User {i+1}</h2>
            <p>Username = {user.username}</p>
            <p>Email = {user.email}</p>
        </div>
    ));

    return(
        <div>
            <h1 className="stdText">Users</h1>
            <div>
                {!usersData ? "Loading" : makeList(usersData)}
            </div>
        </div>
    )
}

export default UserList;
