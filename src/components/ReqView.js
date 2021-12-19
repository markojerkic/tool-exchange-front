import React, {useContext, useState} from "react";
import { Card } from "primereact/card";
import 'primeflex/primeflex.css'
import {AuthContext} from "../common/auth.context";
import {useHistory} from 'react-router-dom';
import {classNames} from 'primereact/utils';
import {Button} from 'primereact/button';

const ReqView = () => {
    const id = window.location.pathname.substring(5)
    const {user} = useContext(AuthContext);

    // Placeholderi za entitete
    const Request = {
        idRequest: 234567,
        titleRequest: 'Trebam busit zid brte ne znam',
        descriptionRequest: 'Ono bas bi treba busilica stari moj al za dzabe. Ovo je opis teksta pa treba bit jos malo dulji neg sto je sad',
        idPurpose: 6,
        visibleRequest: new Boolean(true)
    }
    const ToolRequest = {
        idRequest: 234567,
        idToolRequest: 678,
        locationToolRequest: 'Novi Zagreb'
    }
    const ToolRequestSubmission = {
        idToolRequest: 678,
        idTool: 2,
        idUser: 34,
        dateToolRequestSubmission: '10.11.2021.',
    }
    const ToolCategory = {
        idToolCategory: 5,
        nameToolCategory: 'Bušilice'
    }
    const ToolType = {
        idToolType: 234567,
        nameToolType: 'Elektricne bušilice',
        idToolSubtype: 23
    }
    const Advice = {
        idRequest: 234567,
        idAdvice: 789,
        idUser: 34,
        dateAdvice: '1.1.2022.'
    }
    const Purpose = {
        idPurpose: 6,
        namePurpose: 'Probijanje zidova'
    }
    const User = {
        idUser: 34,
        // ...
        username: 'prosjecni_baustelac'
    }
    const date = !!ToolRequestSubmission.dateToolRequestSubmission? ToolRequestSubmission.dateToolRequestSubmission : Advice.dateAdvice;

    const history = useHistory();
    const header = <span>
            <Button label="Povratak na listu zahtjeva" icon="pi pi-angle-left" onClick={() => history.push(window.location.pathname)} />
        </span>;
    const footer = <span>
            <label>Datum objave: {date}</label>
            <Button label="Pošalji poruku" style={{float:"right"}} />
        </span>; 
    const shortRep = `Objavljuje ${User.username}`
    
    return (
        <div>
            <div className="p-d-flex p-jc-center p-m-6">
                <Card className="card-container" title={Request.titleRequest} subTitle={Request.descriptionRequest} header={header} footer={footer} style={{ width: '50rem' }} >
                    <Card>
                        <p>Kategorija alata: <b>{ToolCategory.nameToolCategory}</b></p>
                        <p>Lokacija: <b>{ToolRequest.locationToolRequest}</b></p>
                        <p>Šifra zahtjeva: <b>{id}</b></p>
                        </Card>
                </Card>
            </div>
        </div>
    )
}
export default ReqView;