import React, {useContext, useEffect, useState} from "react";
import {Card} from "primereact/card";
import 'primeflex/primeflex.css'
import {AuthContext} from "../common/auth.context";
import {useHistory} from 'react-router-dom';
import {Button} from 'primereact/button';
import RequestService from "../service/ads/request.service";
import Moment from 'moment';

const ReqView = () => {
    const id = window.location.pathname.substring(5)
    const {user} = useContext(AuthContext);

    const [requestData, setRequestData] = useState();

    useEffect(() => {
        RequestService.getRequestById(id).then((data) => {
            Moment.locale('hr');
            data.lastModified = new Date(data.lastModified);
            setRequestData(data);
        })
    }, []);

    const history = useHistory();
    const header = <span>
            <Button label="Povratak na listu zahtjeva" icon="pi pi-angle-left" onClick={() => history.push('/')} />
        </span>;
    const footer = <span>
            <label>Datum objave: {Moment(requestData?.lastModified.toString()).format('DD.MM.yyyy.')}</label>
            <Button label="Pošalji poruku" style={{float:"right"}} />
        </span>; 
    const shortRep = `Objavljuje ${requestData?.creator.username}`
    
    return (
        <div>
            <div className="p-d-flex p-jc-center p-m-6">
                <Card className="card-container" title={requestData?.title} subTitle={shortRep} header={header} footer={footer} style={{ width: '50rem' }} >
                    <Card title="Detalji">
                        <p><b>{requestData?.details}</b></p>
                        {/*<p>Kategorija alata: <b>{ToolCategory.nameToolCategory}</b></p>*/}
                        {/*<p>Lokacija: <b>{ToolRequest.locationToolRequest}</b></p>*/}
                        <p>Šifra zahtjeva: <b>{requestData?.id}</b></p>
                    </Card>
                </Card>
            </div>
        </div>
    )
}
export default ReqView;
