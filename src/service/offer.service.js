import instance from './interceptor.js'

const OfferService = {

	acceptOffer: function(offerId) {
		return instance.post(`offer/acceptance`, { id: offerId, type: 'ACCEPT' })
	},

	rejectOffer(offerId) {
		return instance.post(`offer/acceptance`, { id: offerId, type: 'REJECT' })
	},

	addNewOffer: function (offerForm) {
		return instance.post('offer', offerForm);
	},
	getOffers(page, size, lastFilters, filteredStatus, dateFilter, sortField) {

		let filters = {};
		if (lastFilters) {
			Object.keys(lastFilters).forEach(key => {
				filters[key] = lastFilters[key].value;
			})
		}

		return instance.get('offer', {params: {page: page, size: size, sort: sortField,
				suggestedTimeframe: dateFilter?.getTime(),
				status: filteredStatus, ...filters}})
			.then((response) => {
				return response.data;
			});
	}
}
export default OfferService;
