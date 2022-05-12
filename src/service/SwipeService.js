import httpService from './httpService';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiUrl } from '../../config';
import * as SecureStore from 'expo-secure-store';
import base64 from 'react-native-base64';

const API_URL = apiUrl + '/swipe';
 


export async function getAllProfile() {
	console.log('>>> swipe/getAllProfile');
    let profileId = await SecureStore.getItemAsync('profileId');
	console.log(profileId)
	try {
		const response = await httpService.axiosInstance.get(API_URL+'/getAllProfile?profile='+profileId);
		console.log("<<< swipe/getAllProfile STATUS >>> "+response.status)
		return response;
	} catch (err) {
		console.log('>>> swipe/getAllProfile: '+err);
		return err;
	}
}
export async function getLikesForMyProfile() {
	console.log('>>> swipe/getLikesForMyProfile');
    let profileId = await SecureStore.getItemAsync('profileId');
	console.log("Profile id = ",profileId);
	try {
		const response = await httpService.axiosInstance.get(API_URL+'/getLikesForMyProfile?profile='+profileId);
		console.log("<<< swipe/getLikesForMyProfile STATUS >>> "+response.status)
		return response;
		} catch (err) {
		console.log('>>> swipe/getLikesForMyProfile: '+err);
		return err;
	}
} 
 
export default {
    getAllProfile,
	getLikesForMyProfile,

};
