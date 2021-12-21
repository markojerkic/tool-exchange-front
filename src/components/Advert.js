import React, {useState} from 'react';
import { useHistory } from 'react-router';

const Advert = props => {
    const history = useHistory();
    const [advert] = useState(props.ad);
    console.log(advert)

    return(

        <div className="singleAdvert grid-parent" onClick={() => history.push(`/ad/${advert.id}`)}>
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
