import React, {useContext} from "react";
import {AuthContext} from "../common/auth.context";

const Home = () => {

    const {user, setUser} = useContext(AuthContext);

    const loggedInUser = user.username? <p>Trenutno je prijavljen korisnik s korisničkim imenom <b>{user.username}</b></p>: <p>Trenutno nije prijavljen korisnik</p>;;

    return(
        <div>
            <h1 className="stdText">Home</h1>
            {loggedInUser}
        </div>
    )
}

export default Home;
