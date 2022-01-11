import instance from '../interceptor.js'

const AdService = {

	addNewAd: function (adForm) {
		return instance.post('advert', adForm);
	},


	deleteAd: function (id) {
		return instance.delete(`/delete/id=${id}`);
	},

	getAdById: function (id) {
		return instance.get(`advert/${id}`).then((response) => {
			return response.data;
		});
	},

	getAds: function (page, size) {
		return instance.get('advert', { params: { page: page, size: size } })
			.then((response) => {
			return response.data;
		});
	}
}
export default AdService;
