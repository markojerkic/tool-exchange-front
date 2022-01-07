import instance from './interceptor.js'

const OfferService = {

	addNewOffer: function (offerForm) {
		return instance.post('offer', offerForm);
	}
}
export default OfferService;
