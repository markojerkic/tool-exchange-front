import React, {useContext, useState, useEffect} from "react";
import { Card } from "primereact/card";
import 'primeflex/primeflex.css'
import {AuthContext} from "../common/auth.context";
import {useHistory} from 'react-router-dom';
import {classNames} from 'primereact/utils';
import {Button} from 'primereact/button';
import AdService from '../service/ads/ad.service'

const AdView = () => {
    const id = window.location.pathname.substring(4)
    const {user} = useContext(AuthContext);

    const [advertData, setAdvertData] = useState([]);

    useEffect(() => {
        AdService.getAdById(id).then((data) => {
            setAdvertData(data);
            console.log(data.data)
        })
    }, []);




    // Placeholderi za entitete Advert, AdvertSubmission, tool
    const Advert = {
        idAdvert: 123456,
        location: 'Dubrava',
        from: '1.1.2021.',
        to: '1.1.2022.',
        visibleAdvert: new Boolean(true)
    }
    const AdvertSubmission = {
        idAdvert: 123456,
        idUser: 789,
        idtool: 23,
        dateAdvertSubmission: '1.1.2022.',
    }
    const toolCategory = {
        idtoolCategory: 2,
        nametoolCategory: 'Električni razvaljivač',
    }
    const history = useHistory();
    const header = <span>
            <Button label="Povratak na listu oglasa" icon="pi pi-angle-left" onClick={() => history.push("/")} />
        </span>;
    const footer = <span>
            <label>Datum objave: {AdvertSubmission.dateAdvertSubmission}</label>
            <Button label="Pošalji poruku" style={{float:"right"}} />
        </span>; 
    const shortRep = `Objavljuje ${advertData}`

    return (
        <div>
            <div className="p-d-flex p-jc-center p-m-6">
                <Card className="card-container" title={advertData} subTitle={shortRep} header={header} footer={footer} style={{ width: '50rem' }} >
                    <Card title="Detalji">
                        <p>Kategorija alata: <b>{toolCategory.nametoolCategory}</b></p>
                        <p>Alat dostupan od: <b>{Advert.from}</b> do <b>{Advert.to}</b></p>
                        <p>Lokacija: <b>{Advert.location}</b></p>
                        <p>Šifra oglasa: <b>{advertData}</b></p>
                        </Card>
                </Card>
            </div>
        </div>
    )
}
export default AdView;