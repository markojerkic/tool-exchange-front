import instance from './interceptor.js'

const OfferService = {

	acceptOffer: function(offerId) {
		return instance.post(`offer/acceptance`, { id: offerId, type: 'ACCEPT' })
	},

	countPendingoffers: function() {
		return instance.get(`offer/count`).then((response) => response.data);
	},

	rejectOffer(offerId) {
		return instance.post(`offer/acceptance`, { id: offerId, type: 'REJECT' })
	},

	addNewOffer: function (offerForm) {
		return instance.post('offer', offerForm);
	},
	getOffers: function(page, size, lastFilters, sortField) {

		let filters = {};
		if (lastFilters) {
			Object.keys(lastFilters).forEach(key => {
				if (lastFilters[key].value instanceof Date) {
					filters[key] = lastFilters[key].value.getTime();
				} else {
					filters[key] = lastFilters[key].value;
				}
			});
		}

		return instance.get('offer', {params: {page: page, size: size, sort: sortField, ...filters}})
			.then((response) => {
				return response.data;
			});
	},
	getById: function(id) {
		return instance.get(`offer/${id}`).then((data) => {
			return data.data;
		})
	}
}
export default OfferService;
