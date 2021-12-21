import instance from '../interceptor.js'

const RequestService = {

    addNewRequest: function(adForm) {
        return instance.post("request", adForm);
    },

    getRequestById: function(id){
        return instance.get(`request/${id}`).then((response) => {
            return response.data;
        });
    },


    getReqs: function() {
        return instance.get("request").then((response) => {
            return response.data;
        });
    }

}
export default RequestService;