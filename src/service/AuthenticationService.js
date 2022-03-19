import httpService from './httpService';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiUrl } from '../../config';
import * as SecureStore from 'expo-secure-store';

const API_URL = apiUrl + '/auth';

export async function login(email, password) {
	console.log("xdd -")
    try {
        const promise = await axios.post(API_URL + "/login", {
            email: email,
            password: password,
        })
      
		console.log(promise.data)
        const {data: response, status: status} = promise
		await SecureStore.setItemAsync('access_token', promise.data.access_token);
		await SecureStore.setItemAsync('refresh_token', promise.data.refresh_token);
		const token = await SecureStore.getItemAsync('access_token');
		console.log("token jwt = ",token)

       // AsyncStorage.setItem('access_token', promise.data.access_token)
      //  AsyncStorage.setItem('refresh_token',promise.data.refresh_token)
		//console.log("promise access = ",promise.data.access_token)
        return status

        //return {response, status}

    } catch (err) {
        console.log("Login: " + err)
        return err
    }
/*
	try {
		const response = await httpService.axiosInstance
			.post(API_URL+'login', {
				email: email,
				password: password,
			})
			.then((response) => {
                console.log(response)
				AsyncStorage.setItem('access_token', response.data.access_token);
				httpService.axiosInstance.setAuthHeader(response.data.access_token);
			})
			.catch((error) => {
				console.log("Błąd ",error.response);
			});

		return response;
	} catch (err) {
		console.log('Login: ' + err);
		return err;
	}*/ 
}

export async function register(email, password) {
	try {
		const response = await httpService.axiosInstance.post(API_URL+'/register', {
			email: email,
			password: password,
		});
		console.log(response.status);
		return response;
	} catch (err) {
		console.log('Rejestracja ' + err.message);
		return err;
	}
}
export async function registerDetails(email, name, gender, dateBirth, orientation) {
	try {
		const response = await httpService.axiosInstance.post(API_URL+'/registerDetails', {
			email: email,
			name: name,
			gender: gender,
			dateBirth: dateBirth,
			orientation: orientation,
		});
		console.log(response.status);
		return response;
	} catch (err) {
		console.log('Rejestracja detale ' + err.message);
		return err;
	}
}

export default {
	register,
	login,
	registerDetails,

};
