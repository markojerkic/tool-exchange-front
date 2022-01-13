import {useHistory, useParams} from "react-router";
import {Card} from "primereact/card";
import {useContext, useEffect, useState} from "react";
import OfferService from "../../service/offer.service";
import {ToastContext} from "../../common/toast.context";
import Moment from "moment";
import {Button} from "primereact/button";
import './OfferList.css';
import {PendingRequestsContext} from "../../common/pending-offers.context";
import {AuthContext} from "../../common/auth.context";

const Offer = () => {

	const history = useHistory();

	const {user} = useContext(AuthContext);

	const {id} = useParams('id');
	const [offer, setOffer] = useState();
	const [reload, setReload] = useState();

	const {setReloadPendingOffers} = useContext(PendingRequestsContext);

	const {toastRef} = useContext(ToastContext);

	useEffect(() => {
		OfferService.getById(id).then((off) => {
			setOffer(off);
			setReloadPendingOffers(Math.random());
		}).catch(() => {
			toastRef.current.show({severity: 'error', summary: 'Greška', message: 'Greška prilikom dohvata'});
		});
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
		OfferService.acceptOffer(offerId).then(() => {
			toastRef.current.show({severity: 'success', summary: 'Prihvaćeno', detail: 'Ponuda prihvaćena'});
			setReload(Math.random());
			setReloadPendingOffers(Math.random()).catch(() => {
				toastRef.current.show({
					severity: 'error',
					summary: 'Greška',
					detail: 'Greška prilikom prihvaćanja ponude'
				});
			});
		})
	}

	const declineOffer = (offerId) => {
		OfferService.rejectOffer(offerId).then(() => {
			toastRef.current.show({severity: 'success', summary: 'Odbijeno', detail: 'Ponuda odbijena'});
			setReload(Math.random());
			setReloadPendingOffers(Math.random());
		}).catch(() => {
			toastRef.current.show({severity: 'error', summary: 'Greška', detail: 'Greška prilikom odbijanja ponude'});
		})
	}

	return (
		<div className="flex justify-content-center m-6">
			<Card title='Ponuda za oglas'>

				{offer &&
					(
						<>
							<p><b>Postavio korisnik: </b> <span id="txt" onClick={()=> history.push(`/user/${offer.fromUsername}`)} style={{cursor:"pointer"}}>{offer.fromUsername}</span></p>
							<p><b>Oglas: </b><span id="txt" onClick={()=> history.push(`/advert/${offer.advert.id}`)} style={{cursor:"pointer"}}>{offer.advert.title}</span></p>
							<p><b>Predloženo vrijeme
								povratka: </b>{Moment(new Date(offer.suggestedTimeframe)).format('DD.MM.yyyy.')}</p>
							{offer.message &&
								<p><b>Poruka: </b>{offer.message}</p>
							}
							{offer.offerStatus !== 'PENDING' &&
								<p><b>Status: </b>{statusTemplate(offer.offerStatus)}</p>
							}
						</>
					)
				}

				{ (user && user.username !== offer?.fromUsername) && (
					<div className="grid flex justify-content-around mt-4">
						<Button label='Prihvati ponudu' className='col mx-2' onClick={() => acceptOffer(offer.id)}
								disabled={offer?.offerStatus !== 'PENDING'}/>
						<Button label='Odbij ponudu' className='col p-button-danger mx-2'
								onClick={() => declineOffer(offer.id)} disabled={offer?.offerStatus !== 'PENDING'}/>
					</div>
				)}

			</Card>
		</div>
	);
}

export default Offer;
