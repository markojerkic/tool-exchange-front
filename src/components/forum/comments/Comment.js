import React, {useEffect, useState} from "react";
import 'primeflex/primeflex.css'
import {useHistory} from 'react-router-dom';
import { Card } from "primereact/card";
import Moment from 'moment';
import { Button } from "primereact/button";
import AuthService from "../../../service/auth/auth.service";

const Comment = ({com}) => {

    const[comment] = useState(com);


	const history = useHistory();

    comment.lastModified = new Date(comment.lastModified);

    const [user, setUser] = useState(AuthService.getCurrentUserToken());

    const header = <div className="col flex align-items-center justify-content-end">
                    {Moment(comment?.lastModified).format('DD.MM.yyyy.')}
                </div>;

    const footer = <div className="col flex align-items-center justify-content-end">
    <Button className="p-button-rounded p-button-text" tooltip='Sviđa mi se' style={{float: "right"}}>
    <i className="pi pi-thumbs-up p-text-secondary p-overlay-badge" style={{fontSize: '1.5rem'}}>
			</i>
    </Button>
    </div>
	
	return (
		<div className="flex justify-content-center">
            <Card className="card-container" header={header} footer={footer} title={comment.message} style={{width: '50rem'}}>
                <h4>{comment.userCreated}</h4>    
            </Card>
        </div>
	)
}
export default Comment;
