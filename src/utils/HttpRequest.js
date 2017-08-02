/**
 * Created by saman on 3/12/17.
 */
import axios from 'axios';


export default class HttpRequest {
	constructor() {
		this.instance = axios.create()
		this.instance.defaults.headers['Content-Type'] = undefined
	}

	get(url, params) {
		return this.instance.get(url, {
			params: params
		})
			.then(payload => {
				return payload
			})
			.catch(err => {
				throw new Error(err.response.status)
			})
	}

	post(url, params, config = null) {
		let urlParams = new URLSearchParams();
		for (let k in params) urlParams.append(k, params[k])
		return this.instance.post(url, urlParams, config)
	}

	postUserDocs(url, formData) {
		/*const config = {
			headers: {'content-type': 'multipart/form-data'}
		}*/
		console.log('formData', formData)
		return this.instance.post(url, formData)
	}

}