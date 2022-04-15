import axios from 'axios';
import { apiUrl } from '../../config';
import * as SecureStore from 'expo-secure-store';


const axiosInstance = axios.create({ baseURL: apiUrl, headers });

axiosInstance.interceptors.request.use((config) => {
	//console.log('config axios ', config.headers);
	return config;
});
/*
axiosInstance.interceptors. use(
	(response) =>
		new Promise((resolve, reject) => {
			resolve(response);
		}),
	(error) => {
		if (!error.response) {
			return new Promise((resolve, reject) => {
				reject(error);
			});
		}
		if (error.response.status == 403) {
			localStorage.removeItem('access_token');
			console.log('WYLOGOWANIE');
			//TODO
		} else {
			return new Promise((resolve, reject) => {
				reject(error);
			});
		}
	},
);
*/
const token = SecureStore.getItemAsync('access_token');

let headers = {headers: {"Authorization" : `Bearer ${token}`} };

function setJwt(jwt) {
	//console.log("set jwt",jwt)
	axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
	axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
	headers.Authorization = 'Bearer ${jwt}';
}
const setAuthHeader = (token) => {
	if (token) {
		axios.defaults.headers = { Authorization: 'Bearer ' + token };
	} else {
		delete axios.defaults.headers.Authorization;
	}
};
export default {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
	setJwt,
	setAuthHeader,
	axiosInstance,
};

/*
axios.interceptors.response.use(null, (error) => {
    const expectedError = error.response && error.response.status >=400 && error.response.status <500;
    if(error.response && error.response.status === 401 && error.response.data==="jwtExpErr") {
        localStorage.setItem("jwtExpired",true);
        windows.location = ""
    }
    if(!expectedError) {
        logger.log(error)
        console.log("wystapil problem")
    } else {
        console.log("cos innego")
    }
    return Promise.reject(error)
})

function setJwt(jwt) {
    axios.defaults.headers.common["x-auth-token"] = jwt;
}
export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt,
}*/
