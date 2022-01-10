import instance from "./interceptor";

const RatingService = {
	addRating: function (ratingDto) {
		return instance.post('rating', ratingDto);
	},

	getRatings: function (username) {
		return instance.get(`rating/${username}`).then((response) => {
			return response.data;
		});
	}
}

export default RatingService;
