import instance from './interceptor.js'

const OfferService = {

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
