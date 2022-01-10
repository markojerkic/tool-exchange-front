import instance from '../interceptor.js'

const FilterService = {

	addFilter: function (filterForm) {
		return instance.post('filter', filterForm);
	}

}

export default FilterService;
