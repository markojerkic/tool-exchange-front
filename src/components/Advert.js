import React, {useState} from 'react';

const Advert = props => {
    const [advert] = useState(props.ad);
    console.log(advert)

    return(

        <div className="singleAdvert grid-parent">
            <div className="grid-child-element">
            <img src="default_picture.jpg" className="advertPicture" />
            </div>
            <div className="grid-child-element">
                <p className="advertElement advertTitle">{advert.title}</p>
                <p className="advertElement desc">{advert.details}</p>
                <span className="advertDate">{advert.lastModified}</span>
            </div>
        </div>
    );
}

export default Advert;
