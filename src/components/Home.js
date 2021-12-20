import React, {useContext, useEffect} from "react";
import {AuthContext} from "../common/auth.context";
import AdService from '../service/ads/ad.service';

const Home = () => {
    const {user} = useContext(AuthContext);

    useEffect(() => {
        AdService.getAds().then((data) => {
            console.log(data);
        })
    }, []);

    const loggedInUser = !!user? <p>Trenutno je prijavljen korisnik s korisničkim imenom <b>{user.username}</b></p>: <p>Trenutno nije prijavljen korisnik</p>;;

    return(
        <div>
            <h1 className="stdText">Home</h1>
            {loggedInUser}
        </div>
    )
}

export default Home;
