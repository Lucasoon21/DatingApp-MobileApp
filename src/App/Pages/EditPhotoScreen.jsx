import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import Menu from '../Controls/Menu';
import DetailsProfileScreen from '../Pages/DetailsProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../Styles/EditImageStyle';
import { TextInput, Button, ProgressBar, Colors } from 'react-native-paper';
//import * as ImagePicker from "react-native-image-picker"
import * as ImagePicker from 'expo-image-picker';
import ProfileService from '../../service/ProfileService';
import * as ExpoFileSystem from 'expo-file-system';
import axios from 'axios';

const EditPhotoScreen = (props) => {
	const [galleryPermission, setGalleryPermission] = useState('');
	const [imageUri, setImageUri] = useState('');

	const goBack = () => props.navigation.goBack();
	const [picture, setPicture] = useState('');
	const [progress, setProgress] = useState(0.0);
	const [response, setResponse] = useState('tutaj response');
	const [gallery, setGallery] = useState([]);

	useEffect(() => {
		fetchImages();
		//console.log(response);
	}, []);

	async function fetchImages() {
		let responseImage = await ProfileService.getProfileImage();
		if (responseImage.status == 200) {
			setGallery(responseImage.data);
			console.log('galeria', gallery);
		}
		//console.log(responseImage)
	}

	const loadImageToApp = async () => {
		let responsePermissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (responsePermissions.status !== 'granted') {
			alert('Potrzebne są uprawnienia');
		}
		if (responsePermissions.status === 'granted') {
			let responseImage = await ImagePicker.launchImageLibraryAsync({
				mediaType: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [1, 1],
				base64: true,
				quality: 1,
			});
			//console.log(responseImage);
			if (!responseImage.cancelled) {
				setPicture(responseImage.uri);
			}
		}
	};

	const uploadImage = () => {
		const xhr = new XMLHttpRequest();
		const formData = new FormData();
		formData.append('image', {
			uri: picture,
			type: 'image/jpeg',
			name: 'photo.jpg',
		});
		//	xhr.overrideMimeType("application/json");
		xhr.upload.addEventListener('progress', handleProgress);
		xhr.addEventListener('load', async () => {
			setProgress(100.0);
			setResponse(xhr.response);

			//console.log('============');
			//console.log(JSON.parse(xhr.responseText))
			let res = JSON.parse(xhr.responseText);
			//	console.log("status = ", res.status)
			if (res.status == 200 && res.success === true) {
				console.log('OK');
				let data = res.data;
				let responseUpload = await ProfileService.uploadImage({
					deletehash: data.deletehash,
					idImage: data.id,
					link: data.link,
				});
				setPicture();
				fetchImages();
				if (responseUpload != 200) {
					let rs = await deleteImage(data.deletehash);
				}
			} else {
				console.log('nie');
			}
		});
		xhr.open('POST', 'https://api.imgur.com/3/upload');
		xhr.setRequestHeader('Authorization', 'Client-ID 9df4cb7d5f31ba6');
		xhr.send(formData);
	};

	const handleProgress = (event) => {
		setProgress(Math.round((event.loaded * 100) / event.total));
	};
	const deleteImage = async (deleteHash) => {
		console.log('start delete');
		let status = '';
		const xhr = new XMLHttpRequest();
		xhr.addEventListener('load', async () => {
			console.log(xhr.response);
			let res = JSON.parse(xhr.responseText);
			console.log(res);
			status = res.status;
			//return res.status
		});
		xhr.open('DELETE', 'https://api.imgur.com/3/image/' + deleteHash);
		xhr.setRequestHeader('Authorization', 'Client-ID 9df4cb7d5f31ba6');
		xhr.send();
		console.log('fdsfsd', status);
		//console.log(xhr.response.data);
		return status;
	};
	const deleteImageFromProfile = async (image) => {
		let resp = await ProfileService.deleteProfileImage(image);
		if (resp.status == 200) {
			await deleteImage(image.deleteHashImgur);
		}
		fetchImages();
		//console.log("image",resp)
	};

	return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollView}>
				<TouchableOpacity onPress={goBack} style={styles.buttonBack}>
					<Ionicons name='arrow-back' size={40} color='rgba(250,250,250,1)' />
				</TouchableOpacity>
				<View style={styles.imagesGroup}>
					<View style={{ width: '100%', height: 30 }}>
						<ProgressBar progress={progress / 100.0 || 0} color={Colors.red800} visible={true} style={{ width: '100%', height: 10 }} />
					</View>
					{picture ? (
						<>
							<View style={styles.imageContainer}>
								<Image source={{ uri: picture }} style={[styles.image, { width: '100%', height: '100%' }]} />
							</View>

							<View style={styles.addImageContainer}>
								<Button style={styles.addImageButton} labelStyle={{ color: 'white' }} contentStyle={{ height: '100%' }} onPress={() => uploadImage()}>
									Dodaj obrazek do api
								</Button>
							</View>
							<View style={styles.addImageContainer}>
								<Button style={styles.addImageButton} labelStyle={{ color: 'white' }} contentStyle={{ height: '100%' }} onPress={() => setPicture()}>
									Usuń obrazek
								</Button>
							</View>
						</>
					) : (
						<>

							<View style={styles.addImageContainer}>
								<Button style={styles.addImageButton} labelStyle={{ color: 'white' }} contentStyle={{ height: '100%' }} onPress={() => loadImageToApp()}>
									Załaduj obrazek
								</Button>
							</View>
						</>
					)}

					{gallery.length > 0 ? (
						gallery.map((image, ind) => {
							return (
								<View style={styles.imageContainer} key={image.idImgur}>
									<Image source={{ uri: image.linkImgur }} style={styles.image} />
									<Button style={styles.buttomImgRemove} labelStyle={{ color: 'white' }} onPress={() => deleteImageFromProfile(image)}>
										X
									</Button>
								</View>
							);
						})
					) : (
						<View style={styles.imageContainer}>
							<Image source={require('../../Images/person1.jpg')} style={styles.image} />
							<Button style={styles.buttomImgRemove} labelStyle={{ color: 'white' }}>
								X
							</Button>
						</View>
					)}

					{/* <View>
						<Text>{response}</Text>
					</View>
					<View>
						<Text>{progress} %</Text>
					</View> */}
				</View>
			</ScrollView>
			<Menu profile={true} />
		</View>
	);
};
export default EditPhotoScreen;
{
	/* {gallery.map((image, ind) => {
						
						const options = {
							method: 'GET',
							url: 'https://api.imgur.com/3/image/'+image.idImgur,
							headers: {Authorization: 'Client-ID 9df4cb7d5f31ba6'}
						};
						
						axios.request(options).then(function (response) {
							console.log(response.data);
						}).catch(function (error) {
							console.error(error);
						});



						return (
							<View style={styles.imageContainer} key={image.idImgur}>
								<Image source={{ uri: image.linkImgur }} style={styles.image} />
								<Button style={styles.buttomImgRemove} labelStyle={{ color: 'white' }} onPress={() => deleteImageFromProfile(image)}>
									X
								</Button>
							</View>
						);
					})} */
}
{
	/* 
					<View style={styles.imageContainer}>
						<Image source={require('../../Images/person1.jpg')} style={styles.image} />
						<Button style={styles.buttomImgRemove} labelStyle={{ color: 'white' }}>
							X
						</Button>
					</View>

*/
}
