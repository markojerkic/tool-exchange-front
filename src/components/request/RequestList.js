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
		});
	}, [offset, rows]);

	return (
		<Card className="ad-container">
			<div className="flex justify-content-center align-self-center grid">
				<div className="lg:col-2 md:col-2 sm:col-12">
					tu bi ja filtere
				</div>
				<div className="lg:col-8 md:col-8 sm:col-12">
				<h1 className="title mb-5">Rezultati pretrage</h1>
				{
					requests.map(req => {
						return <RequestPreview key={req.id} req={req}/>
					})
				}
				</div>
				<div className="lg:col-2 md:col-2 sm:col-12"/>	

				<Paginator rows={rows} first={offset} totalRecords={totalRequests}
						onPageChange={(event) => setOffset(event.first)} />
			</div>
		</Card>
	)

}

export default RequestList;
