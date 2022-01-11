import React, {useEffect, useState} from "react";
import {Card} from "primereact/card";
import ThreadPreview from "./ThreadPreview";
import AdviceService from "../../../service/advice.service";
import {Paginator} from "primereact/paginator";

const ThreadList = () => {


	const [totalAdvices, setTotalAdvices] = useState(0);
	const [offset, setOffset] = useState(0);
	const [advices, setAdvices] = useState([]);

	const [rows] = useState(2);

	useEffect(() => {
		AdviceService.getAdvices(offset / rows, rows).then((data) => {
			setTotalAdvices(data.totalElements);
			setAdvices(data.content);
		});
	}, [offset, rows]);

	return (
		<Card title='Zahtjevi za savjetima' >
			{
				advices.map(adv => {
					return <ThreadPreview key={adv.id} adv={adv}/>
				})
			}

			<Paginator rows={rows} first={offset} totalRecords={totalAdvices}
					   onPageChange={(event) => setOffset(event.first)} />
		</Card>
	)

}

export default ThreadList;
