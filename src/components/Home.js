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
        <div className="mainView shape">
            <div className="adView shape home-tag">
                <h1 className="title">Search results</h1>

                <div className="singleAdvert grid-parent">
                    <div className="grid-child-element">
                    <img src="default_picture.jpg" className="advertPicture"></img>
                    </div>
                    <div className="grid-child-element">
                        <p className="advertElement advertTitle">Naziv alata</p>
                        <p className="advertElement desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                        <br></br>
                        <span className="advertDate">1.1.2069</span>
                        <p className="advertLocation">Zagreb</p>
                    </div>
                </div>
                
            </div>

        </div>
    )
}

export default Home;
