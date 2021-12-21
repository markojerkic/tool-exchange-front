import React, {useEffect, useState} from "react";
import AdService from '../service/ads/ad.service';
import Advert from "./Advert";

const Home = () => {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        AdService.getAds().then((data) => {
            setAds(data);
        })
    }, []);

    return(
        <div className="mainView shape">
            <div className="adView shape home-tag">
                <h1 className="title">Search results</h1>
                {
                    ads.map(singleAdvert => {
                        return <Advert key={singleAdvert.id} ad={singleAdvert}/>
                    })
                }
            </div>

        </div>
    )
}

export default Home;
