import React, {useState} from 'react';
import { useHistory } from 'react-router';
import Moment from 'moment';

const Advert = props => {
    const history = useHistory();
    const [advert] = useState(props.ad);
    console.log(advert)
    Moment.locale('hr')
    const date = new Date(advert.lastModified);

    return(

        <div className="singleAdvert grid-parent" onClick={() => history.push(`/ad/${advert.id}`)}>
            <div className="grid-child-element">
            <img src="default_picture.jpg" className="advertPicture" />
            </div>
            <div className="grid-child-element">
                <p className="advertElement advertTitle">{advert.title}</p>
                <p className="advertElement desc">{advert.details}</p>
                <span className="advertDate">Datum objave: {Moment(date.toString()).format('DD.MM.yyyy.')}</span>
            </div>
        </div>
    );
}

export default Advert;
