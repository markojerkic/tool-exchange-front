import instance from './interceptor.js'

const OfferService = {

	addNewOffer: function (offerForm) {
		return instance.post('offer', offerForm);
	},
	getOffers(page, size) {
		return instance.get('offer', {params: {page: page, size: size}})
			.then((response) => {
				return response.data;
			});
	}
}
export default OfferService;
