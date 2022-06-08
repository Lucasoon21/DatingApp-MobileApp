import httpService from './httpService';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiUrl } from '../../config';
import * as SecureStore from 'expo-secure-store';
import base64 from 'react-native-base64';

const API_URL = apiUrl + '/profile';

export async function deleteAccount() {
	console.log('>>> profile/deleteAccount');
	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.delete(API_URL + '/deleteAccount?profile=' + profileId);
		console.log('<<< profile/deleteAccount STATUS >>> ' + response.status);
		return response;
	} catch (err) {
		console.log('>>> profile/deleteAccount: ' + err);
		return err;
	}
}

export async function deactivateAccount() {
	console.log('>>> profile/deactivateAccount');

	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.put(API_URL + '/deactivateAccount?profile=' + profileId);
		console.log('<<< profile/deactivateAccount STATUS >>> ' + response.status);
		return response;
	} catch (err) {
		console.log('>>> profile/deactivateAccount: ' + err);
		return err;
	}
}

export async function activateAccount() {
	console.log('>>> profile/activateAccount');

	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.put(API_URL + '/activateAccount?profile=' + profileId);
		console.log('<<< profile/activateAccount STATUS >>> ' + response.status);
		return response;
	} catch (err) {
		console.log('>>> profile/activateAccount: ' + err);
		return err;
	}
}

export async function changePassword(params) {
	console.log('>>> profile/changePassword');
	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.put(API_URL + '/changePassword', {
			profileId: profileId,
			oldPassword: params.oldPassword,
			newPassword: params.newPassword,
			newConfirmPassword: params.confirmPassword,
		});
		console.log('<<< profile/changePassword STATUS >>> ' + response.status);
		return response;
	} catch (err) {
		console.log('>>> profile/changePassword: ' + err);
		return err;
	}
}

export async function changeDescription(description) {
	console.log('>>> profile/changeDescription');
	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.put(API_URL + '/changeDescription', {
			profileId: profileId,
			description: description,
		});
		console.log('<<< profile/changeDescription STATUS >>> ' + response.status);
		return response.status;
	} catch (err) {
		console.log('>>> profile/changeDescription: ' + err);
		return err;
	}
}



export async function getDescription(id) {
	console.log('>>> profile/getDescription');
	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getDescription?profile='+id);
		console.log('<<< profile/getDescription STATUS >>> ' + response.status);
		return response;
	} catch (err) {
		console.log('>>> profile/getDescription: ' + err);
		return err;
	}
}


export async function changeProfileDetails(alcohol, job, height, weight, orientation, education, religious, children, cigarettes, eyeColor, city) {
	console.log('>>> profile/changeProfileDetails');
	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.put(API_URL + '/changeProfileDetails', {
			profileId: profileId,
			alcoholId: alcohol,
			job: job,
			height: height,
			weight: weight,
			orientationId: orientation,
			educationId: education,
			religiousId: religious,
			childrenId: children,
			cigarettesId: cigarettes,
			eyeColorId: eyeColor,
			city: city,
		});
		console.log('<<< profile/changeProfileDetails STATUS >>> ' + response.status);
		return response.status;
	} catch (err) {
		console.log('>>> profile/changeProfileDetails: ' + err);
		return err;
	}
}

export async function getProfileDetails(id) {
	console.log('>>> profile/getProfileDetails');
	let profileIdd = id;
	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getProfileDetails?profile='+profileIdd);
		console.log('<<< profile/getProfileDetails STATUS >>> ' + response.status);
		return response;
	} catch (err) {
		console.log('>>> profile/getProfileDetails: ' + err);
		return err;
	}
}

export async function getProfileHobby(id) {
	console.log('>>> profile/getProfileHobby');
	let profileId = id;
	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getProfileHobby?profile=' + profileId);
		console.log('<<< profile/getProfileHobby STATUS >>> ' + response.status);
		return response;
	} catch (err) {
		console.log('>>> profile/getProfileHobby: ' + err);
		return err;
	}
}

export async function changeProfileHobby(hobbyList) {
	console.log('>>> profile/changeProfileHobby');

	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.put(API_URL + '/changeProfileHobby', {
			profileId: profileId,
			listHobby: hobbyList,
		});
		console.log('<<< profile/changeProfileHobby STATUS >>> ' + response.status);
		return response;
	} catch (err) {
		console.log('>>> profile/changeProfileHobby: ' + err);
		return err;
	}
}

export async function getProfileRelationship(id) {
	console.log('>>> profile/getProfileRelationship');
	let profileId = id;
	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getProfileRelationship?profile=' + profileId);
		console.log('<<< profile/getProfileRelationship STATUS >>> ' + response.status);
		return response;
	} catch (err) {
		console.log('>>> profile/getProfileRelationship: ' + err);
		return err;
	}
}

export async function changeProfileRelationship(listRelationship) {
	console.log('>>> profile/changeProfileRelationship');

	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.put(API_URL + '/changeProfileRelationship', {
			profileId: profileId,
			listRelationship: listRelationship,
		});
		console.log('<<< profile/changeProfileRelationship STATUS >>> ' + response.status);
		return response;
	} catch (err) {
		console.log('>>> profile/changeProfileRelationship: ' + err);
		return err;
	}
}

export async function uploadImage(params) {
	console.log('>>> profile/uploadImage');
	let profileId = await SecureStore.getItemAsync('profileId');

	try {
		const response = await httpService.axiosInstance.put(API_URL + '/uploadImage', {
			deleteHashImgur: params.deletehash,
			idImgur: params.idImage,
			linkImgur: params.link,
			profileId: profileId,
		});
		console.log(response)
		console.log('<<< profile/uploadImage STATUS >>> ' + response.status);
		return response.status;
	} catch (err) {
		console.log('>>> profile/uploadImage: ' + err);
		return err;
	}
}

export async function getProfileImage(id) {
	console.log('>>> profile/getProfileImages');
	let profileId = id;

	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getProfileImages?profile=' + profileId);
		console.log('<<< profile/getProfileImages STATUS >>> ' + response.status);
		return response;
	} catch (err) {
		console.log('>>> profile/getProfileImages: ' + err);
		return err;
	}
}

export async function deleteProfileImage(params) {
	console.log('>>> profile/deleteProfileImage');

	let profileId = await SecureStore.getItemAsync('profileId');

	try {
		const response = await httpService.axiosInstance.delete(API_URL + '/deleteProfileImage', {
			data: {
				profileId: profileId,
				deleteHashImgur: params.deleteHashImgur,
				idImgur: params.idImgur,
				linkImgur: params.linkImgur,
			},
		});
		console.log('<<< profile/deleteProfileImage STATUS >>> ' + response.status);
		return response;
	} catch (err) {
		console.log('>>> profile/deleteProfileImage: ' + err);
		return err;
	}
}

export async function changeMainPhotoProfile(idImgur) {
	console.log('>>> profile/changeMainPhotoProfile');

	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.put(API_URL + '/changeMainPhotoProfile', {
			profileId: profileId,
			imgurPhotoId: idImgur,
		});
		console.log('<<< profile/changeMainPhotoProfile STATUS >>> ' + response.status);
		return response;
	} catch (err) {
		console.log('>>> profile/changeMainPhotoProfile: ' + err);
		return err;
	}
}

export default {
	changePassword,
	changeDescription,
	getDescription,
	changeProfileDetails,
	getProfileDetails,
	getProfileHobby,
	changeProfileHobby,
	getProfileRelationship,
	changeProfileRelationship,
	uploadImage,
	getProfileImage,
	deleteProfileImage,
	changeMainPhotoProfile,
	deactivateAccount,
	activateAccount,
	deleteAccount,
};


