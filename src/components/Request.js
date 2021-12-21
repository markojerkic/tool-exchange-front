import React, {useState} from 'react';
import { useHistory } from 'react-router';
import Moment from 'moment';

const Request = props => {
    const history = useHistory();
    const [request] = useState(props.request);
    console.log(request)
    Moment.locale('hr')
    const date = new Date(request.lastModified);

    return(

        <div className="singleAdvert grid-parent" onClick={() => history.push(`/req/${request.id}`)}>
            <div className="grid-child-element">
            <img src="default_picture.jpg" className="advertPicture" />
            </div>
            <div className="grid-child-element">
                <p className="advertElement advertTitle">{request.title}</p>
                <p className="advertElement desc">{request.details}</p>
                <span className="advertDate">Datum objave: {Moment(date.toString()).format('DD.MM.yyyy.')}</span>
            </div>
        </div>
    );
}

export default Request;