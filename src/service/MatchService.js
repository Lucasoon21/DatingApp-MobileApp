import httpService from './httpService';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiUrl } from '../../config';
import * as SecureStore from 'expo-secure-store';
import base64 from 'react-native-base64';

const API_URL = apiUrl + '/match';



export async function getAllMatch() {
    let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.get(API_URL+'/getProfileRelationship?profile='+profileId);
		//console.log(response.status);
		return response;
	} catch (err) {
		console.log('fetch matches  ' + err.message);
		return err;
	}
}


export default {
    getAllMatch,

};
