import axios from 'axios'

export default axios.create({
	baseURL: '/api/',
	responseType: 'json',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		'X-Requested-With': 'XMLHttpRequest',
	},
	transformRequest: [function(data){
		// var str = ['csrfmiddlewaretoken=' + getMeta("csrf-token")];
    let str = [];
		for(var p in data) {
			if ( data[p] === 0 ) {
				data[p] = "0";
			}
			if ( data[p] ) {
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));	
			}
		}
		return str.join("&");
	}],
	transformResponse: [function (data, headers) {
    if (typeof data === 'string' && headers["content-type"].includes("application/json")) {
      try {
        
        data = JSON.parse(data);
        
      } catch (e) {
        
      }
    }
    return data;
	}],
});
