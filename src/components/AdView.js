import React, {useEffect, useState} from "react";
import {Card} from "primereact/card";
import 'primeflex/primeflex.css'
import {useHistory} from 'react-router-dom';
import {Button} from 'primereact/button';
import AdService from '../service/ads/ad.service'
import Moment from "moment";
import {useParams} from "react-router";

const AdView = () => {
    const {id} = useParams();

    const [advertData, setAdvertData] = useState();
    const conditions = {
        'NEW': 'Novo',
        'USED': 'Korišteno',
        'DAMAGED': 'Neispravno/Oštećeno'
    };

    useEffect(() => {
        AdService.getAdById(id).then((data) => {
            Moment.locale('hr');
            data.lastModified = new Date(data.lastModified);
            setAdvertData(data);
        })
    }, [id]);

    const history = useHistory();
    const header = <div className="divButtonTop">
            <Button label="Povratak na listu oglasa" icon="pi pi-angle-left" onClick={() => history.push("/")} />
        </div>;
    const footer = <div>
            <label className="generalDate">Datum objave: {Moment(advertData?.lastModified.toString()).format('DD.MM.yyyy.')}</label>
            <Button className="generalButton" label="Pošalji poruku" style={{float:"right"}} />
        </div>; 
    const shortRep = `Objavljuje ${advertData?.creator.username}`

    return (
        <div>
            <div className="p-d-flex p-jc-center p-m-6">
                <Card className="card-container" title={advertData?.title} subTitle={shortRep} header={header} footer={footer} style={{ width: '50rem' }} >
                    <p>Opis: <b>{advertData?.details}</b></p>
                    <p>Alat: <b>{advertData?.tool.name}</b></p>
                    <p>Stanje alata: <b>{conditions[advertData?.tool.toolState]}</b></p>
                    <p>Alat je električan: <b>{advertData?.tool.electric? 'Da': 'Ne'}</b></p>
                    {!advertData?.electric &&
                        <p>Snaga alata: <b>{advertData?.tool.power} W</b></p>
                    }
                    <p>Šifra oglasa: <b>{advertData?.id}</b></p>
                </Card>
            </div>
        </div>
    )
}
export default AdView;
