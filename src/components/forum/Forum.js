import React from "react";
import {Card} from "primereact/card";
import AdviceList from "./AdviceList";

const Forum = () => {
	return (
		// <div className="mainView shape">
			<Card className="ad-container">

				<div className="p-d-flex p-jc-center  p-as-center p-grid">
					<div className="p-lg-2 p-md-2 p-sm-12">
					</div>

					<div className="p-lg-8 p-md-8 p-sm-12">
						<h1 className="title">Forum sa savjetima</h1>
                        <AdviceList />
						
					</div>

					<div className="p-lg-2 p-md-2 p-sm-12"></div>
				</div>

			</Card>
		// </div>
	)
}

export default Forum;
