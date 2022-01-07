import {useContext, useEffect, useState} from "react";
import OfferService from "../../service/offer.service";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import Moment from "moment";
import './OfferList.css';
import {Dropdown} from "primereact/dropdown";
import {Calendar} from "primereact/calendar";
import {SplitButton} from "primereact/splitbutton";
import {ToastContext} from "../../common/toast.context";
import {useHistory} from "react-router-dom";

const OfferList = () => {

	const history = useHistory();

	const [totalOffers, setTotalOffers] = useState(0);
	const [offset, setOffset] = useState(0);
	const [offers, setOffers] = useState([]);
	const [loading, setLoading] = useState(false);

	const [rows] = useState(10);
	const [filteredStatus, setFilteredStatus] = useState();
	const [lastFilters, setLastFilters] = useState();
	const [dateFilter, setDateFilter] = useState();
	const [sort, setSort] = useState(-1);
	const [sortField, setSortField] = useState('suggestedTimeframe,DESC');

	const [offerClicked, setOfferClicked] = useState();

	const [reload, setReload] = useState();

	const {toastRef} = useContext(ToastContext);

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
			default:
				throw Error('Pogrešan status');
		}
	};

	useEffect(() => {
		setLoading(true);
		OfferService.getOffers(offset / rows, rows, lastFilters, filteredStatus, dateFilter, sortField)
			.finally(() => setLoading(false)).then((data) => {
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
	}, [offset, rows, filteredStatus, lastFilters, dateFilter, sortField, reload]);

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

	const calendarFilter = (
		<Calendar value={dateFilter} onChange={(e) => setDateFilter(e.value)}
				  placeholder='Odaberite datum' showButtonBar={true} locale='hr'
				  dateFormat='dd.mm.yy.' />
	);

	const onSort = () => {
		setSort(sort === -1? 1: -1);

		setSortField(`suggestedTimeframe,${sort === 1? 'DESC': 'ASC'}`);
	}

	const slitButtonItems = [
		{
			icon: 'pi pi-check',
			label: 'Prihvati ponudu',
			disabled: offerClicked?.status.css !== 'pending',
			command: () => {
				acceptOffer(offerClicked?.id)
			}
		},
		{
			icon: 'pi pi-times',
			label: 'Odbij ponudu',
			disabled: offerClicked?.status.css !== 'pending',
			command: () => {
				declineOffer(offerClicked?.id)
			}
		}
	];

	const acceptOffer = (offerId) => {
		OfferService.acceptOffer(offerId).catch(() => {
			toastRef.current.show({severity: 'error', summary: 'Greška', detail: 'Greška prilikom prihvaćanja ponude'});
		}).then(() => {
			toastRef.current.show({severity: 'success', summary: 'Prihvaćeno', detail: 'Ponuda prihvaćena'});
			setReload(Math.random());
		})
	}

	const declineOffer = (offerId) => {
		OfferService.rejectOffer(offerId).catch(() => {
			toastRef.current.show({severity: 'error', summary: 'Greška', detail: 'Greška prilikom odbijanja ponude'});
		}).then(() => {
			toastRef.current.show({severity: 'success', summary: 'Odbijeno', detail: 'Ponuda odbijena'});
			setReload(Math.random());
		})
	}

	const actionButtons = (offer) => {
		return (
		<div className="p-d-flex p-jc-around">
			<SplitButton model={slitButtonItems} tooltip='Pogledaj ponudu' icon='pi pi-search'
						 onShow={() => setOfferClicked(offer)}
						 onClick={() => history.push(`/offer/${offer.id}`)}
						 tooltipOptions={{position: 'left'}} />
		</div>
		);
	};

	return (
		<DataTable value={offers} loading={loading} lazy rows={rows} onPage={onPage} onFilter={onFilter}
				   paginator={true} emptyMessage="Ponude nisu pronađene" filters={lastFilters}
				   sortField='suggestedTimeframe' sortOrder={sort} onSort={onSort}
				   // globalFilterFields={['advertTitle', 'from', 'suggestedTimeframe', 'status']}
				   responsiveLayout="stack" breakpoint='960px'
				   totalRecords={totalOffers} dataKey="id">
			<Column field="advertTitle" header="Naslov oglasa" filter
					filterPlaceholder="Pretražite po oglasima"/>
			<Column field="from" header="Od korisnika" filter filterPlaceholder="Pretražite po korisnicima"/>
			<Column field="suggestedTimeframe" header="Vrijeme povratka" sortable filter
					body={dateTemplate} filterElement={calendarFilter} readonly={true}
					filterPlaceholder="Pretražite po periodu povratka"/>
			<Column field='status' header='Status ponude' filterPlaceholder='Daberite status'
					body={statusTemplate} showFilterMenu={false} filterMenuStyle={{width: '14rem'}}
					// style={{minWidth: '12rem'}}
					filter filterElement={
				(<Dropdown options={statuses} style={{width: '14rem'}}
						   value={filteredStatus} placeholder='Odaberite status' showClear={true}
						   onChange={statusSelected}/>)
			}/>
			<Column header='Akcije' style={{width: '10rem'}} body={actionButtons} />
		</DataTable>
	);
}

export default OfferList;
