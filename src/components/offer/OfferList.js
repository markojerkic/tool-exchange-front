import {useEffect, useState} from "react";
import OfferService from "../../service/offer.service";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import Moment from "moment";
import './OfferList.css';
import {Dropdown} from "primereact/dropdown";

const OfferList = () => {
	const [totalOffers, setTotalOffers] = useState(0);
	const [offset, setOffset] = useState(0);
	const [offers, setOffers] = useState([]);
	const [loading, setLoading] = useState(false);

	const [rows] = useState(10);
	const [filteredStatus, setFilteredStatus] = useState();
	const [lastFilters, setLastFilters] = useState();


	Moment.locale('hr');

	const statuses = [
		{label: 'ČEKA ODGOVOR', value: 'PENDING', css: 'pending'},
		{label: 'PRIHVAĆENO', value: 'ACCEPTED', css: 'rejected'},
		{label: 'ODBIJENO', value: 'REJECTED', css: 'accepted'}
	];

	const mapStatus = (offerStatus) => {
		switch (offerStatus) {
			case 'PENDING':
				return {label: 'ČEKA ODGOVOR', css: 'pending'};
			case 'REJECTED':
				return {label: 'ODBIJENO', css: 'rejected'};
			case 'ACCEPTED':
				return {label: 'PRIHVAĆENO', css: 'accepted'};
		}
	};

	useEffect(() => {
		setLoading(true);
		OfferService.getOffers(offset / rows, rows, lastFilters, filteredStatus).finally(() => setLoading(false)).then((data) => {
			const content = data.content.map((offer) => {
				return {
					...offer,
					suggestedTimeframe: new Date(offer.suggestedTimeframe),
					status: mapStatus(offer.status)
				}
			});
			setOffers(content);
			setTotalOffers(data.totalElements);
		})
	}, [offset, rows, filteredStatus, lastFilters]);

	const dateTemplate = (date) => {
		return (
			<p>{Moment(new Date(date.suggestedTimeframe)).format('DD.MM.yyyy.')}</p>
		)
	};

	const statusTemplate = (offer) => {
		return (
			<span className={`badge status-${offer.status.css}`}>{offer.status.label}</span>
		);
	};

	const statusSelected = (offerStatus) => {
		setFilteredStatus(offerStatus.value);
	};

	const onPage = ({first}) => {
		setOffset(first);
	}

	const onFilter = (filters) => {
		setLastFilters(filters.filters);
	}

	return (
		<DataTable value={offers} loading={loading} lazy rows={rows} onPage={onPage} onFilter={onFilter}
				   paginator={true} emptyMessage="Ponude nisu pronađene" filters={lastFilters}
				   globalFilterFields={['advertTitle', 'from', 'suggestedTimeframe', 'status']}
				   totalRecords={totalOffers} dataKey="id">
			<Column field="advertTitle" header="Naslov oglasa" sortable filter
					filterPlaceholder="Pretražite po oglasima"/>
			<Column field="from" header="Od korisnika" sortable filter filterPlaceholder="Pretražite po korisnicima"/>
			<Column field="suggestedTimeframe" header="Vrijeme povratka" sortable filter
					body={dateTemplate}
					filterPlaceholder="Pretražite po periodu povratka"/>
			<Column field='status' header='Status ponude' filterPlaceholder='Daberite status'
					body={statusTemplate} showFilterMenu={false} filterMenuStyle={{width: '14rem'}}
					style={{minWidth: '12rem'}}
					filter filterFunction={console.log} filterElement={
				(<Dropdown options={statuses} style={{width: '14rem'}}
						   value={filteredStatus} placeholder='Odaberite status' showClear={true}
						   onChange={statusSelected}/>)
			}/>
		</DataTable>
	);
}

export default OfferList;
