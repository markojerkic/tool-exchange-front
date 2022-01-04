import instance from '../interceptor.js'

const LocationSearchService = {
	searchLocations: function(queryString) {
		return instance.get('location/search', {params: { query: queryString }});
	}
}
export default LocationSearchService;
