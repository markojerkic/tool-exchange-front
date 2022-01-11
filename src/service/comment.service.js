import instance from './interceptor.js'

const CommentService = {

	addNewComment: function (adForm) {
		return instance.post('advice', adForm);
	},

	getComments: function (page, size, threadId) {
		return instance.get('advice', {params: {page: page, size: size, threadId: threadId}})
			.then((response) => {
				return response.data;
			});
	},

	likeComment: function (adviceToggle) {
		return instance.put('advice', adviceToggle).then((response) => {
			return response.data
		});

	}
}
export default CommentService;
