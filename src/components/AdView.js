import React, {useEffect, useState} from "react";
import {Card} from "primereact/card";
import 'primeflex/primeflex.css'
import {useHistory} from 'react-router-dom';
import {Button} from 'primereact/button';
import AdService from '../service/ads/ad.service'
import Moment from "moment";

const AdView = () => {
    const id = window.location.pathname.substring(4)

    const [advertData, setAdvertData] = useState();

    useEffect(() => {
        AdService.getAdById(id).then((data) => {
            Moment.locale('hr');
            data.lastModified = new Date(data.lastModified);
            setAdvertData(data);
        })
    }, []);

    const history = useHistory();
    const header = <span>
            <Button label="Povratak na listu oglasa" icon="pi pi-angle-left" onClick={() => history.push("/")} />
        </span>;
    const footer = <span>
            <label>Datum objave: {Moment(advertData?.lastModified.toString()).format('DD.MM.yyyy.')}</label>
            <Button label="Pošalji poruku" style={{float:"right"}} />
        </span>; 
    const shortRep = `Objavljuje ${advertData?.creator.username}`

    return (
        <div>
            <div className="p-d-flex p-jc-center p-m-6">
                <Card className="card-container" title={advertData?.title} subTitle={shortRep} header={header} footer={footer} style={{ width: '50rem' }} >
                    <Card title="Detalji">
                        <p><b>{advertData?.details}</b></p>
                        {/*<p>Alat dostupan od: <b>{Advert.from}</b> do <b>{Advert.to}</b></p>*/}
                        {/*<p>Lokacija: <b>{Advert.location}</b></p>*/}
                        <p>Šifra oglasa: <b>{advertData?.id}</b></p>
                    </Card>
                </Card>
            </div>
        </div>
    )
}
export default AdView;
