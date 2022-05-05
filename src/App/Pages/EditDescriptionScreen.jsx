import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, TouchableOpacity, ScrollView, StatusBar, TextInput, ActivityIndicator } from 'react-native';
import Menu from '../Controls/Menu';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import { styles } from '../Styles/ProfileStyle';
import ProfileService from '../../service/ProfileService';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';
import { configToast } from '../Components/configToast';
import BackNavigation from '../Components/BackNavigation';
import LoaderElements from '../Components/LoaderElements';
import { useToast } from 'react-native-toast-notifications';

const EditDescriptionScreen = (props) => {
	const goBack = () => props.navigation.goBack();

	const [description, setDescription] = useState('');
	const [returnDescription, setReturnDescription] = useState(false);

	const [characterCount, setCharacterCount] = useState(description.length);
	const MAX_LENGTH = 500;

	const toast = useToast();
	const showToast = (type, headerText, subText) => {
		toast.show(subText, {
			type: type,
			placement: 'top',
			duration: 40000,
			animationDuration: 100,
			animationType: 'zoom-in',
			data: {
				title: headerText,
			},
		});
	};

	useEffect(() => {
		async function fetchDescription() {
			setReturnDescription(false);
			let profileId = await SecureStore.getItemAsync('profileId');
			let response = await ProfileService.getDescription(profileId);
			if (response.status == 200) {
				setDescription(response.data.description);
				setCharacterCount(response.data.description.length || 0);
				setReturnDescription(true);
			}
		}
		fetchDescription();
	}, []);

	const changeDescription = async () => {
		let response = await ProfileService.changeDescription(description);
		if (response == 200) {
			showToast('success', 'Opis zmieniony!', 'Twoja zmiana opisu została zakończona pomyślnie');
		} else {
			showToast('error', 'Nie zmieniono opisu', 'Nieudało się zmienić opisu. Sprbuj ponownie później');
		}
	};

	return (
		<View style={styles.container}>
			<View style={{ zIndex: 10, top: 0, position: 'absolute' }}>
				<Toast config={configToast} />
			</View>

			<BackNavigation goBack={goBack} />

			<View style={styles.sectionContainer}>
				<Text style={styles.headerText}>Edycja opisu </Text>

				{returnDescription ? (
					<>
						<TextInput
							multiline
							numberOfLines={9}
							onChangeText={(text) => {
								setDescription(text);
								setCharacterCount(text.length);
							}}
							value={description}
							style={styles.textInput}
							editable
							maxLength={MAX_LENGTH}
						/>
						<Text style={styles.characterCount}>
							{characterCount}/{MAX_LENGTH}
						</Text>

						<Button type='submit' title='submit' onPress={() => changeDescription()} mode='contained' style={styles.buttonSave}>
							<Entypo name='save' size={25} color='rgba(250,250,250,1)' />
							<Text style={{ textAlignVertical: 'center', textAlign: 'center', fontSize: 25 }}>Zapisz</Text>
						</Button>
					</>
				) : (
<LoaderElements />
				)}
			</View>
			<Menu profile={true} {...props} />
		</View>
	);
};
export default EditDescriptionScreen;
