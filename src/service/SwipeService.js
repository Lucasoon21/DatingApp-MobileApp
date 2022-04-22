import httpService from './httpService';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiUrl } from '../../config';
import * as SecureStore from 'expo-secure-store';
import base64 from 'react-native-base64';

const API_URL = apiUrl + '/swipe';
 


export async function getAllProfile() {
    let profileId = await SecureStore.getItemAsync('profileId');
	console.log("Profile id = ",profileId);
	try {
		const response = await httpService.axiosInstance.get(API_URL+'/getAllProfile?profile='+profileId);
		//console.log(response.status);
		return response;
	} catch (err) {
		console.log('fetch profiles  ' + err);
		return err;
	}
}
export async function getLikesForMyProfile() {
    let profileId = await SecureStore.getItemAsync('profileId');
	console.log("Profile id = ",profileId);
	try {
		const response = await httpService.axiosInstance.get(API_URL+'/getLikesForMyProfile?profile='+profileId);
		//console.log(response.status);
		return response;
	} catch (err) {
		console.log('fetch getLikesForMyProfile  ' + err);
		return err;
	}
}

export default {
    getAllProfile,
	getLikesForMyProfile,

};
