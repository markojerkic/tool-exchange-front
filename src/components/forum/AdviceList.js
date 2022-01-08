import React from "react";
import {Card} from "primereact/card";
import AdvicePreview from "./AdvicePreview";

const AdviceList = () => {
	return (
		// <div className="mainView shape">
			<Card title="Rezultati pretrage savjeta" className="ad-container">

				<AdvicePreview />

			</Card>
		// </div>
	)
}

export default AdviceList;
