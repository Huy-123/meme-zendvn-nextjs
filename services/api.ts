import fetch from "isomorphic-fetch"
import { BASE_URL } from "../constants";

type ConfigType = {
	data?: any;
	token?: string;
	method?: string;
} 

const api = {
	callJson: async (url: string, {data, method = 'GET', token}: ConfigType = {}) => {
		const URL = `${BASE_URL}${url}`;
		const config = {
			method: method,
			headers: {
				"Content-Type": "application/json",
				// "Access-Control-Allow-Credentials": true,
			},
			body: JSON.stringify(data)
		}

		if(token){
			config.headers["Authorization"] = `Bearer ${token}`;
		}

		return  fetch(URL, config).then(res => res.json())
	}

	// callJson: async (url: string, { data, method = 'GET' }: ConfigType = {}) => {
    //     const URL = `${BASE_URL}${url}`;
    //     const config = {
    //         method,
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(data)
    //     }
    //     return fetch(URL, config).then(res => res.json())
    // },
};

export default api;