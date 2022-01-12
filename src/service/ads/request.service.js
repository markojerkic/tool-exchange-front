import instance from '../interceptor.js'

const RequestService = {

	addNewRequest: function (adForm) {
		return instance.post("request", adForm);
	},

	deleteRequest: function (id) {
		return instance.delete(`request/${id}`);
	},

	getRequestById: function (id) {
		return instance.get(`request/${id}`).then((response) => {
			return response.data;
		});
	},

	getRequests: function (page, size) {
		return instance.get('request', { params: { page: page, size: size } })
			.then((response) => {
				return response.data;
			});
	}

}
export default RequestService;
