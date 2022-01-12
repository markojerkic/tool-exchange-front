import React from "react";
import {Card} from "primereact/card";
import ThreadList from "./adviceThread/ThreadList";
import {Button} from "primereact/button";
import {useHistory} from "react-router";

const Forum = () => {

	const history = useHistory();
	return (
		<Card className="ad-container">

			<div className="p-d-flex p-jc-center  p-as-center p-grid">
				<div className="p-lg-2 p-md-2 p-sm-12">
					<Button className="p-button-raised mb-2" label="Zahtjev za savjet" icon="pi pi-plus"
							onClick={() => history.push('/forum/new-advice')}/>
				</div>

				<div className="p-lg-8 p-md-8 p-sm-12">
					<h1 className="title mb-3">Forum sa savjetima</h1>
					<ThreadList/>

				</div>

				<div className="p-lg-2 p-md-2 p-sm-12"/>
			</div>

		</Card>
	)
}

export default Forum;
