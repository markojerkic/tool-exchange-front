import React, {useEffect, useState} from "react";
import 'primeflex/primeflex.css'
import {useHistory} from 'react-router-dom';
import {useParams} from "react-router";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Paginator } from "primereact/paginator";

const Comment = ({com}) => {
	const {id} = useParams();

    const[comment] = useState(com);

	const history = useHistory();
	
	return (
		<div className="flex justify-content-center">
            <Card className="card-container" title={comment.message} style={{width: '50rem'}}>
                <h4>{comment.userCreated}</h4>    
            </Card>
        </div>
	)
}
export default Comment;
