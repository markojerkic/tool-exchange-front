import React, {useContext, useState} from "react";
import { Card } from "primereact/card";
import 'primeflex/primeflex.css'
import {AuthContext} from "../common/auth.context";
import {useHistory} from 'react-router-dom';
import {classNames} from 'primereact/utils';
import {Button} from 'primereact/button';

const AdView = () => {
    const id = window.location.pathname.substring(4)
    const {user} = useContext(AuthContext);

    // Placeholderi za entitete Advert, AdvertSubmission, Tool
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
        idTool: 23,
        dateAdvertSubmission: '1.1.2022.',
    }
    const User = {
        idUser: 789,
        // ...
        username: 'prosjecni_baustelac',
    }
    const Tool = {
        idTool: 23,
        nameTool: 'Bušilica',
        manufacturerLink: 'www.bosch.com',
        idToolType: 3,
        idToolCategory: 2
    }
    const ToolCategory = {
        idToolCategory: 2,
        nameToolCategory: 'Električni razvaljivač',
    }
    const history = useHistory();
    const header = <span>
            <Button label="Povratak na listu oglasa" icon="pi pi-angle-left" onClick={() => history.push(window.location.pathname)} />
        </span>;
    const footer = <span>
            <label>Datum objave: {AdvertSubmission.dateAdvertSubmission}</label>
            <Button label="Pošalji poruku" style={{float:"right"}} />
        </span>; 
    const shortRep = `Objavljuje ${User.username}`

    return (
        <div>
            <div className="p-d-flex p-jc-center p-m-6">
                <Card className="card-container" title={Tool.nameTool} subTitle={shortRep} header={header} footer={footer} style={{ width: '50rem' }} >
                    <Card title="Detalji">
                        <p>Kategorija alata: <b>{ToolCategory.nameToolCategory}</b></p>
                        <p>Alat dostupan od: <b>{Advert.from}</b> do <b>{Advert.to}</b></p>
                        <p>Lokacija: <b>{Advert.location}</b></p>
                        <p><a href={Tool.manufacturerLink} target="_blank">Stranica</a> proizvođača alata</p>
                        <p>Šifra oglasa: <b>{id}</b></p>
                        </Card>
                </Card>
            </div>
        </div>
    )
}
export default AdView;