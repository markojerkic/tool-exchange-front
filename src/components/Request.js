import React, {useState} from 'react';
import { useHistory } from 'react-router';
import Moment from 'moment';

const Request = props => {
    const history = useHistory();
    const [request] = useState(props.request);
    Moment.locale('hr')
    const date = new Date(request.lastModified);

    return(

        <div className="singleAdvert grid-parent" onClick={() => history.push(`/req/${request.id}`)}>
            <div className="grid-child-element">
            <img src="default_picture.jpg" className="advertPicture" alt="Slika" />
            </div>
            <div className="grid-child-element">
                <p className="advertElement advertTitle">{request?.title}</p>
                <p className="advertElement desc">{request?.details}</p>
                <p>Šifra zahtjeva: <b>{request?.id}</b></p>
                <p>Opis: <b>{request?.details}</b></p>
                <p className="advertDate">Datum objave: {Moment(date).format('DD.MM.yyyy.')}</p>
            </div>
        </div>
    );
}

export default Request;
