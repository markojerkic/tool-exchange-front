import instance from './interceptor.js'

const ImageService = {

	uploadImage: function (images) {
		const formData = new FormData();
		images.forEach(image => formData.append('images', image));
		return instance.post('image', formData).then((response) => response.data);
	},

	getImageByUUID: function (uuid) {
		return instance.get(`image/${uuid}`).then((response) => response.data);
	}

}
export default ImageService;
