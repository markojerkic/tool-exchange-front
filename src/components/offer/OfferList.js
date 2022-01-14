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
import {PendingRequestsContext} from "../../common/pending-offers.context";
import {Button} from "primereact/button";

const OfferList = ({mine}) => {

	const history = useHistory();

	const [totalOffers, setTotalOffers] = useState(0);
	const [offset, setOffset] = useState(0);
	const [offers, setOffers] = useState([]);
	const [loading, setLoading] = useState(false);

	const [rows] = useState(10);
	const [lastFilters, setLastFilters] = useState();
	const [sort, setSort] = useState(-1);
	const [sortField, setSortField] = useState('suggestedTimeframe,DESC');

	const [offerClicked, setOfferClicked] = useState();

	const {setReloadPendingOffers} = useContext(PendingRequestsContext);

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
		OfferService.getOffers(offset / rows, rows, lastFilters, sortField, mine)
			.finally(() => setLoading(false)).then((data) => {
			const content = data.content.map((offer) => {
				return {
					...offer,
					suggestedTimeframe: new Date(offer.suggestedTimeframe),
					status: mapStatus(offer.status),
					from: <span id="txt" className="font-italic" onClick={()=> history.push(`/user/${offer.from}`)} style={{cursor:"pointer"}}>{offer.from}</span>,
					advertTitle: <span id="txt" className="font-italic" onClick={()=> history.push(`/advert/${offer.id}`)} style={{cursor:"pointer"}}>{offer.advertTitle}</span>

				}
			});
			setOffers(content);
			setTotalOffers(data.totalElements);
			setReloadPendingOffers(Math.random());
		})
	}, [offset, rows, lastFilters, sortField, reload, setReloadPendingOffers, mine, history]);

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

	const onPage = ({first}) => {
		setOffset(first);
	}

	const onFilter = (filters) => {
		setLastFilters(filters.filters);
	}

	const calendarFilter = (options) => {
		return (
			<Calendar value={options.value} onChange={(e) => options.filterApplyCallback(e.value)}
					  placeholder='Odaberite datum' showButtonBar={true} locale='hr'
					  dateFormat='dd.mm.yy.'/>
		);
	};

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
			setReloadPendingOffers(Math.random());
		})
	}

	const declineOffer = (offerId) => {
		OfferService.rejectOffer(offerId).catch(() => {
			toastRef.current.show({severity: 'error', summary: 'Greška', detail: 'Greška prilikom odbijanja ponude'});
		}).then(() => {
			toastRef.current.show({severity: 'success', summary: 'Odbijeno', detail: 'Ponuda odbijena'});
			setReload(Math.random());
			setReloadPendingOffers(Math.random());
		})
	}

	const actionButtons = (offer) => {
		return (
			<div className="flex justify-content-around">
				{ mine && <Button className="buttonBackground" tooltip='Pogledaj ponudu' icon='pi pi-search'
								  onShow={() => setOfferClicked(offer)}
								  onClick={() => history.push(`/offer/${offer.id}`)}/>}
				{ !mine && <SplitButton className="buttonBackground" model={slitButtonItems} tooltip='Pogledaj ponudu' icon='pi pi-search'
									   onShow={() => setOfferClicked(offer)}
									   onClick={() => history.push(`/offer/${offer.id}`)}
									   tooltipOptions={{position: 'left'}}/>}
			</div>
		);
	};

	const statusFiltersTemplate = (options) => {
		return (
			<Dropdown options={statuses}
					  placeholder='Odaberite status'
					  value={options.value}
					  onChange={(e) => options.filterApplyCallback(e.value)}/>
		);
	}

	return (
		<DataTable value={offers} loading={loading} lazy rows={rows} onPage={onPage} onFilter={onFilter}
				   paginator={true} emptyMessage="Ponude nisu pronađene" filters={lastFilters}
				   stripedRows
				   filterDisplay="row" globalFilterFields={['status']}
				   sortField='suggestedTimeframe' sortOrder={sort} onSort={onSort}
				   responsiveLayout="stack" breakpoint='960px'
				   totalRecords={totalOffers} dataKey="id">
			<Column field="advertTitle" header="Naslov oglasa" filter showFilterMenu={false}
					filterPlaceholder="Pretražite po oglasima"/>
			<Column field="from" header="Od korisnika" filter showFilterMenu={false} filterPlaceholder="Pretražite po korisnicima"/>
			<Column field="suggestedTimeframe" header="Vrijeme povratka" sortable filter showFilterMenu={false}
					body={dateTemplate} filterElement={calendarFilter} readonly={true}
					filterPlaceholder="Pretražite po periodu povratka"/>
			<Column field='status' header='Status ponude'
					filterPlaceholder='Odaberite status'
					body={statusTemplate}
					showFilterMenu={false}
					filterMenuStyle={{width: '14rem'}}
					showClear={false}
					filter
					filterElement={statusFiltersTemplate}
			/>
			<Column header='Akcije' style={{width: '10rem'}} showFilterMenu={false} body={actionButtons} />
		</DataTable>
	);
}

export default OfferList;
