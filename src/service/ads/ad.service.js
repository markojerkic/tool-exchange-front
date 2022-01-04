import instance from '../interceptor.js'

const AdService = {

	addNewAd: function (adForm) {
		return instance.post("ad", adForm);
	},

	getAdById: function (id) {
		return instance.get(`ad/${id}`).then((response) => {
			return response.data;
		});
	},


	getAds: function () {
		return instance.get("ad").then((response) => {
			return response.data;
		});
	}
}
export default AdService;
