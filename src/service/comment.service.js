import instance from './interceptor.js'

const AdviceService = {

	addNewComment: function (adForm) {
		return instance.post('advice', adForm);
	},

	getComments: function (page, size, threadId) {
		return instance.get('advice', { params: { page: page, size: size, threadId: threadId } })
			.then((response) => {
			return response.data;
		});
	}
}
export default AdviceService;
