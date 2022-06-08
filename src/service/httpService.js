import axios from 'axios';
import { apiUrl } from '../../config';
import * as SecureStore from 'expo-secure-store';


const axiosInstance = axios.create({ baseURL: apiUrl, headers });

axiosInstance.interceptors.request.use(async (config) => {
	const token = await SecureStore.getItemAsync('access_token');
	if(token) {
		setJwt(token)
		config.headers.Authorization = `Bearer ${token}`
	}
	return config;
});

const token = SecureStore.getItemAsync('access_token');
let headers = {headers: {"Authorization" : `Bearer ${token}`} };
function setJwt(jwt) {
	axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
	axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
	headers.Authorization = 'Bearer ${jwt}';
}

axiosInstance.interceptors.response.use(
	res=> {return res},
	err=>{ 
		if(err.response.status==403) {
			logout()
		} else if(err.response.status==401) {
			console.log("token wygasł")
		}
		return err
	}
)

async function logout() {
	await SecureStore.deleteItemAsync('access_token');
	await SecureStore.deleteItemAsync('refresh_token');
	await SecureStore.deleteItemAsync('profileId');
	await SecureStore.deleteItemAsync('userId');
}

export default {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
	setJwt,
	axiosInstance,
};
