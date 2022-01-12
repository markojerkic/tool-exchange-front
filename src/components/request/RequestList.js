import {Card} from "primereact/card";
import {Paginator} from "primereact/paginator";
import {useEffect, useState} from "react";
import RequestService from "../../service/ads/request.service";
import RequestPreview from "./RequestPreview";

const RequestList = () => {
	const [totalRequests, setTotalRequests] = useState(0);
	const [offset, setOffset] = useState(0);
	const [requests, setRequests] = useState([]);

	const [rows] = useState(10);

	useEffect(() => {
		RequestService.getRequests(offset / rows, rows).then((data) => {
			setTotalRequests(data.totalElements);
			setRequests(data.content);
			console.log(data.content)
		});
	}, [offset, rows]);

	return (
		<Card title='Rezultati pretrage zahtjeva' className="px-6" >
			{
				requests?.map(req => {
					return <RequestPreview key={req.id} req={req}/>
				})
			}

			<Paginator rows={rows} first={offset} totalRecords={totalRequests}
					   onPageChange={(event) => setOffset(event.first)} />
		</Card>
	)

}

export default RequestList;
