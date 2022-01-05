import instance from '../interceptor.js'

const LocationSearchService = {
	searchLocations: function (queryString) {
		return instance.get('location/search', {params: {params: queryString}});
	}
}
export default LocationSearchService;
