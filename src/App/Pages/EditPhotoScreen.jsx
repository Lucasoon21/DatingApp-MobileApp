import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator } from 'react-native';
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
import { Constants, Spacings, Carousel, RadioButton, RadioGroup, Badge } from 'react-native-ui-lib';
import 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';
import { configToast } from '../Components/configToast';
import BackNavigation from '../Components/BackNavigation';
import LoaderElements from '../Components/LoaderElements';

const EditPhotoScreen = (props) => {
	const goBack = () => props.navigation.goBack();
	const [progress, setProgress] = useState(0.0);
	const [gallery, setGallery] = useState([]);
	const [mainPhoto, setMainPhoto] = useState('');
	const [galleryReturn, setGalleryReturn] = useState(false);

	useEffect(() => {
		fetchImages();
	}, []);

	const showToast = (type, headerText, subText) => {
		Toast.show({
			type: type,
			text1: headerText,
			text2: subText,
			visibilityTime: 10000,
		});
	};

	async function changeMainPhoto() {
		let response = await ProfileService.changeMainPhotoProfile(mainPhoto);
		if (response.status == 200) {
			showToast('success', 'Zmieniono profilowe!', 'Twoje zmiana zdjęcia profilowego została zakończona pomyślnie');
		} else {
			showToast('error', 'Nie zmieniono profilowego', 'Nieudało się zmienić zdjęcia profilowego. Sprbuj ponownie później');
		}
	}

	async function fetchImages() {
		setGalleryReturn(false);
		let profileId = await SecureStore.getItemAsync('profileId');
		let responseImage = await ProfileService.getProfileImage(profileId);
		if (responseImage.status == 200) {
			setGallery(responseImage.data);
			let arrayTmp = responseImage.data;
			let xd = arrayTmp.find((mainPh) => mainPh.isMainPhoto === true);
			console.log('xd', xd);
			if (xd != null) {
				setMainPhoto(xd.idImgur);
			}
			setGalleryReturn(true);
		} else {
			showToast('error', 'Błąd', 'Nie udało się wczytać twoich zdjęć. Sprbuj ponownie później');
		}
		setProgress(0.0);
	}

	const loadImageToApp = async () => {
		let responsePermissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (responsePermissions.status !== 'granted') {
			alert('Potrzebne są uprawnienia');
			showToast('error', 'Błąd uprawnień', 'Aby dodać zdjęcie musisz przyznać aplikacji odpowiednie uprawnienia');
		}
		if (responsePermissions.status === 'granted') {
			let responseImage = await ImagePicker.launchImageLibraryAsync({
				mediaType: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [1, 1],
				base64: true,
				quality: 1,
			});
			if (!responseImage.cancelled) {
				uploadImage(responseImage.uri);
			}
		}
	};

	const uploadImage = (uriImage) => {
		const xhr = new XMLHttpRequest();
		const formData = new FormData();
		formData.append('image', {
			uri: uriImage,
			type: 'image/jpeg',
			name: 'photo.jpg',
		});
		xhr.upload.addEventListener('progress', handleProgress);
		xhr.addEventListener('load', async () => {
			setProgress(100.0);

			let res = JSON.parse(xhr.responseText);
			if (res.status == 200 && res.success === true) {
				console.log('OK');
				let data = res.data;
				let responseUpload = await ProfileService.uploadImage({
					deletehash: data.deletehash,
					idImage: data.id,
					link: data.link,
				});
				fetchImages();
				if (responseUpload != 200) {
					let rs = await deleteImage(data.deletehash);
					showToast('error', 'Błąd', 'Nie udało się dodać zdjęcia. Sprbuj ponownie później');
				} else {
					showToast('success', 'Dodano zdjęcie', 'Udało się dodać zdjęcie!');
				}
				setProgress(0.0);
			} else {
				showToast('error', 'Błąd', 'Nie udało się dodać zdjęcia. Sprbuj ponownie później');
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
		let status = '';
		const xhr = new XMLHttpRequest();
		xhr.addEventListener('load', async () => {
			let res = JSON.parse(xhr.responseText);
			status = res.status;
		});
		xhr.open('DELETE', 'https://api.imgur.com/3/image/' + deleteHash);
		xhr.setRequestHeader('Authorization', 'Client-ID 9df4cb7d5f31ba6');
		xhr.send();
		return status;
	};

	const deleteImageFromProfile = async (image) => {
		let resp = await ProfileService.deleteProfileImage(image);
		if (resp.status == 200) {
			await deleteImage(image.deleteHashImgur);
			showToast('success', 'Usunięto zdjęcie', 'Pomyślnie usunięto zdjęcie z twojego profilu!');
		}
		fetchImages();
	};

	return (
		<View style={styles.container}>
			<View style={{ zIndex: 10, top: 0, position: 'absolute' }}>
				<Toast config={configToast} />
			</View>
			<ScrollView style={styles.scrollView}>
			<BackNavigation goBack={goBack} />

				<RadioGroup initialValue={mainPhoto} onValueChange={(value) => setMainPhoto(value)} style={{ height: '100%' }}>
					<View style={styles.imagesGroup}>
						<View style={{ width: '100%', height: 30 }}>
							<ProgressBar progress={progress / 100.0 || 0} color={Colors.red800} visible={true} style={{ width: '100%', height: 10 }} />
						</View>
						<View style={styles.buttonsActionsContainer}>
							<Button style={styles.buttonAction} labelStyle={{ color: 'white', fontWeight: 'bold', fontSize: 16, paddingVertical: 5 }} onPress={() => loadImageToApp()}>
								Załaduj obrazek
							</Button>
							<Button style={styles.buttonAction} labelStyle={{ color: 'white', fontWeight: 'bold', fontSize: 16, paddingVertical: 5 }} onPress={() => changeMainPhoto()}>
								Zmień profilowe
							</Button>
						</View>

						{galleryReturn ? (
							<>
								{gallery.length > 0 ? (
									gallery.map((image, ind) => {
										return (
											<View style={styles.imageContainer} key={image.idImgur}>
												<Image source={{ uri: image.linkImgur }} style={styles.image} />
												<Badge label={'X'} size={30} onPress={() => deleteImageFromProfile(image)} />
												<View style={styles.radioStyles}>
													<RadioButton value={image.idImgur} size={20} borderRadius={0} label='Zdjęcie główne' />
												</View>
											</View>
										);
									})
								) : (
									<View style={styles.notImagesInProfileContainer}>
										<Text style={styles.notImagesHeaderText}>Nie masz żadnego zdjęcia</Text>
										<Text style={styles.notImagesSubText}>
											Aktualnie w swoim profilu nie masz żadnego zdjęcia. Dodaj kilka zdjęć aby przyciągnąć uwagę jak największej ilości użytkowników. Aktualnie wyświetlane jest domyślne
											zdjęcie
										</Text>

										<View style={styles.imageContainerNot}>
											<Image source={require('../../Images/default.jpg')} style={styles.imageNot} />
										</View>
									</View>
								)}
							</>
						) : (
							<>
								<LoaderElements />
							</>
						)}
					</View>
				</RadioGroup>
			</ScrollView>
			<Menu profile={true} {...props} />
		</View>
	);
};
export default EditPhotoScreen;
