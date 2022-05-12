import axios from 'axios';
import { apiUrl } from '../../config';
import * as SecureStore from 'expo-secure-store';


const axiosInstance = axios.create({ baseURL: apiUrl, headers });

axiosInstance.interceptors.request.use((config) => {
	return config;
});

const token = SecureStore.getItemAsync('access_token');

let headers = {headers: {"Authorization" : `Bearer ${token}`} };

function setJwt(jwt) {
	axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
	axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
	headers.Authorization = 'Bearer ${jwt}';
}


export default {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
	setJwt,
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
