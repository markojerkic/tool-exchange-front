import {useParams} from "react-router";
import {Card} from "primereact/card";
import {useContext, useEffect, useState} from "react";
import OfferService from "../../service/offer.service";
import {ToastContext} from "../../common/toast.context";
import Moment from "moment";
import {Button} from "primereact/button";
import './OfferList.css';
import {PendingRequestsContext} from "../../common/pending-offers.context";

const Offer = () => {

	const {id} = useParams('id');
	const [offer, setOffer] = useState();
	const [reload, setReload] = useState();

	const {setReloadPendingOffers} = useContext(PendingRequestsContext);

	const {toastRef} = useContext(ToastContext);

	useEffect(() => {
		OfferService.getById(id).catch(() => {
			toastRef.current.show({severity: 'error', summary: 'Greška', message: 'Greška prilikom dohvata'});
		}).then((off) => {
			setOffer(off);
		})
	}, [toastRef, id, reload, setReloadPendingOffers]);

	const statusTemplate = (offer) => {
		let offerStatus;
		switch (offer) {
			case 'PENDING':
				offerStatus = {label: 'ČEKA ODGOVOR', css: 'pending'};
				break;
			case 'REJECTED':
				offerStatus = {label: 'ODBIJENO', css: 'rejected'};
				break;
			case 'ACCEPTED':
				offerStatus = {label: 'PRIHVAĆENO', css: 'accepted'};
				break;
			default:
				offerStatus = {label: 'ODBIJENO', css: 'rejected'};
				break;
		}
		return (
			<span className={`badge status-${offerStatus.css}`}>{offerStatus.label}</span>
		);
	};

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

	return (
		// <div>
			<div className="p-d-flex p-jc-center p-m-6">
				<Card title='Ponuda za oglas' >

					{ offer &&
						(
							<>
								<p><b>Postavio korisnik: </b>{offer.fromUsername}</p>
								<p><b>Oglas: </b>{offer.advert.title}</p>
								<p><b>Predloženo vrijeme povratka: </b>{Moment(new Date(offer.suggestedTimeframe)).format('DD.MM.yyyy.')}</p>
								{ offer.message &&
									<p><b>Poruka: </b>{offer.message}</p>
								}
								{ offer.offerStatus !== 'PENDING' &&
									<p><b>Status: </b>{statusTemplate(offer.offerStatus)}</p>
								}
							</>
						)
					}

					<div className="p-grid p-d-flex p-jc-around p-mt-4">
						<Button label='Prihvati ponudu' className='p-col' onClick={() => acceptOffer(offer.id)}
								disabled={offer?.offerStatus !== 'PENDING'} />
						<Button label='Odbij ponudu' className='p-col p-button-danger'
								onClick={() => declineOffer(offer.id)} disabled={offer?.offerStatus !== 'PENDING'} />
					</div>

				</Card>
			</div>
		// </div>
	);
}

export default Offer;
