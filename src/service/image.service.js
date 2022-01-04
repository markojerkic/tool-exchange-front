import instance from './interceptor.js'

const ImageService = {

	baseUrl: `http://${process.env.REACT_APP_BACKEND_HOST}/api/image`,

	uploadImage: function (images) {
		const formData = new FormData();
		images.forEach(image => formData.append('images', image));
		return instance.post('image', formData).then((response) => response.data);
	},

	getImageByUUID: function (uuid) {
		return `${this.baseUrl}/${uuid}`;
	},

	getImagesByAdvertId(advertId) {
		return instance.get(`image/by-advert/${advertId}`).then((response) =>
			response.data.map(image => this.getImageByUUID(image.uuid)));
	}

}
export default ImageService;
