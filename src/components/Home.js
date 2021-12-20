import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../common/auth.context";
import AdService from '../service/ads/ad.service';
import Advert from "./Advert";

const Home = () => {
    const {user} = useContext(AuthContext);
    const [ads, setAds] = useState([]);

    useEffect(() => {
        AdService.getAds().then((data) => {
            setAds(data);
        })
    }, []);

    const loggedInUser = !!user? <p>Trenutno je prijavljen korisnik s korisničkim imenom <b>{user.username}</b></p>: <p>Trenutno nije prijavljen korisnik</p>;;

    return(
        <div className="mainView shape">
            <div className="adView shape home-tag">
                <h1 className="title">Search results</h1>
                {
                    ads.forEach(singleAdvert => {
                        <Advert ad={singleAdvert}/>
                    })
                }
            </div>

        </div>
    )
}

export default Home;
