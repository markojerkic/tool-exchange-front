import React, { useState } from 'react';
import { Steps } from 'primereact/steps';

const Advert = props => {
    const [advert, setAdvert] = useState(props.singleAdvert);


    return(

        <div className="singleAdvert grid-parent">
            <div className="grid-child-element">
            <img src="default_picture.jpg" className="advertPicture"></img>
            </div>
            <div className="grid-child-element">
                <p className="advertElement advertTitle">{advert.name}</p>
                <p className="advertElement desc">{advert.desc}</p>
                <span className="advertDate">{advert.date}</span>
                <p className="advertLocation">{advert.location}</p>
            </div>
        </div>
    );
}

export default Advert;