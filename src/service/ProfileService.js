import httpService from './httpService';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiUrl } from '../../config';
import * as SecureStore from 'expo-secure-store';
import base64 from 'react-native-base64';

const API_URL = apiUrl + '/profile';

export async function changeDescription(description) {
	let profileId = await SecureStore.getItemAsync('profileId');
	let userId = await SecureStore.getItemAsync('userId');
	//console.log(profileId)
	//console.log(userId)
	try {
		const response = await httpService.axiosInstance.put(API_URL + '/changeDescription', {
			profileId: profileId,
			description: description,
		});
		//console.log('response', response.status);
		return response.status;
	} catch (err) {
		console.log('change description  ' + err.message);
		return err;
	}
}

export async function changeProfileDetails(alcohol, job, height, weight, orientation, education, religious, children, cigarettes, eyeColor) {
	let profileId = await SecureStore.getItemAsync('profileId');
	let userId = await SecureStore.getItemAsync('userId');
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
		});
		//('response', response);
		return response.status;
	} catch (err) {
		console.log('change description  ' + err.message);
		return err;
	}
}

export async function getProfileDetails() {
	let profileIdd = await SecureStore.getItemAsync('profileId');
	let userId = await SecureStore.getItemAsync('userId');
	try {
		const response = await httpService.axiosInstance.put(API_URL + '/getProfileDetails', {
			profileId: profileIdd,
		});
		//console.log('response', response.data);
		return response;
	} catch (err) {
		console.log('change description  ' + err.message);
		return err;
	}
}

export async function getProfileHobby() {
	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getProfileHobby?profile=' + profileId);
		//console.log('response', response.data);
		return response;
	} catch (err) {
		console.log('change description  ' + err.message);
		return err;
	}
}

export async function changeProfileHobby(hobbyList) {
	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.put(API_URL + '/changeProfileHobby', {
			profileId: profileId,
			listHobby: hobbyList,
		});
		//console.log('response', response.data);
		return response;
	} catch (err) {
		console.log('change description  ' + err.message);
		return err;
	}
}

export async function getProfileRelationship() {
	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.get(API_URL + '/getProfileRelationship?profile=' + profileId);
		//console.log('response', response.data);
		return response;
	} catch (err) {
		console.log('change description  ' + err.message);
		return err;
	}
}

export async function changeProfileRelationship(listRelationship) {
	let profileId = await SecureStore.getItemAsync('profileId');
	try {
		const response = await httpService.axiosInstance.put(API_URL + '/changeProfileRelationship', {
			profileId: profileId,
			listRelationship: listRelationship,
		});
		//console.log('response', response.data);
		return response;
	} catch (err) {
		console.log('change description  ' + err.message);
		//console.log(httpService.axiosInstance.defaults)
		return err;
	}
}

export async function uploadImage(params) {
	let profileId = await SecureStore.getItemAsync('profileId');
	console.log('\n\n\n\n\n====================================================================================');
	try {
		//console.log(params)
		const response = await httpService.axiosInstance.put(API_URL + '/uploadImage', {
			deleteHashImgur: params.deletehash,
			idImgur: params.idImage,
			linkImgur: params.link,
			profileId: profileId,
		});
		return response.status;
	} catch (err) {
		console.log('image response  ' + err);
		return err;
	}
}

export async function getProfileImage() {
	let profileId = await SecureStore.getItemAsync('profileId');
	//console.log('\n\n\n\n\n====================================================================================');
	try {
		//console.log(params)
		const response = await httpService.axiosInstance.put(API_URL + '/getProfileImages?profile=' + profileId);
		//console.log(response.data);
		return response;
	} catch (err) {
		console.log('image response  ' + err);
		return err;
	}
}

export async function deleteProfileImage(params) {
	let profileId = await SecureStore.getItemAsync('profileId');
	//console.log('\n\n\n\n\n====================================================================================');
	try {
		//console.log(params)
		

		const response = await httpService.axiosInstance.delete(API_URL + '/deleteProfileImage', { data: {
			profileId: profileId,
			deleteHashImgur: params.deleteHashImgur,
			idImgur: params.idImgur,
			linkImgur: params.linkImgur
		} });
		//console.log(response.data);
		return response;
	} catch (err) {
		console.log('image response  ' + err);
		return err;
	}
}

export default {
	changeDescription,
	changeProfileDetails,
	getProfileDetails,
	getProfileHobby,
	changeProfileHobby,
	getProfileRelationship,
	changeProfileRelationship,
	uploadImage,
	getProfileImage,
	deleteProfileImage,
};

/*	//console.log("image: ",image)
		let encodeImage = base64.encode(image);
		let base64Img = 'data:image/jpg;base64,' + encodeImage;

		let urlImgbb = 'https://api.imgbb.com/1/upload?key=a8d783b23f679e4a7e8fe86fcd2f4fd8&image=' + encodeImage;
		url = 'https://api.imageshack.com/v2/images';
		//url = "https://post.imageshack.us/upload_api.php"

		



		let res2 = await axios.post(url, {
			params: { 
				fileupload: encodeImage,
				key: '2489BFKRde716bd4d1c6ba2376ee156ce701587c',
				api_key: '2489BFKRde716bd4d1c6ba2376ee156ce701587c',
			},
		});
		const options = {
			method: 'POST',
			url: 'https://api.imgbb.com/1/upload',
			params: {
			  key: 'a8d783b23f679e4a7e8fe86fcd2f4fd8',
			 // image: 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII='
				image: fd
			}
		  };
		  
		  axios.request(options).then(function (response) {
			console.log(response.data);
		  }).catch(function (error) {
			console.error(error);
		  });
*/
