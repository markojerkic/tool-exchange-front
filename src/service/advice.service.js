import instance from './interceptor.js'

const AdviceService = {

	addNewAdvice: function (adForm) {
		return instance.post('thread', adForm);
	},

	getAdviceById: function (id) {
		return instance.get(`thread/${id}`).then((response) => {
			return response.data;
		});
	},

	getAdvices: function (page, size) {
		return instance.get('thread', { params: { page: page, size: size } })
			.then((response) => {
			return response.data;
		});
	}
}
export default AdviceService;
