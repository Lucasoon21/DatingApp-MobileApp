import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator } from 'react-native';
import Menu from '../Controls/Menu';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../Styles/ProfileStyle';
import HobbyButton from '../Controls/HobbyButton';
import ProfileService from '../../service/ProfileService';
import { Button } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';
import { configToast } from '../Components/configToast';
import BackNavigation from '../Components/BackNavigation';
import LoaderElements from '../Components/LoaderElements';
import { useToast } from 'react-native-toast-notifications';

const EditHobbyScreen = (props) => {
	const goBack = () => props.navigation.goBack();

	const [hobby, setHobby] = useState([]);
	const [returnHobby, setReturnHobby] = useState(false);

	useEffect(() => {
		async function fetchProfileHobby() {
			setReturnHobby(false);
			let profileId = await SecureStore.getItemAsync('profileId');

			let response = await ProfileService.getProfileHobby(profileId);
			if (response.status === 200) {
				setHobby(response.data);
				setReturnHobby(true);
			}
		}
		fetchProfileHobby();
	}, []);

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

	const changeProfileHobby = async () => {
		let response = await ProfileService.changeProfileHobby(hobby);
		if (response.status == 200) {
			showToast('success', 'Hobby zmienione!', 'Twoja zmiana hobby profilu została zakończona pomyślnie');
		} else {
			showToast('error', 'Nie zmieniono hobby', 'Nieudało się zmienić hobby. Sprbuj ponownie później');
		}
	};

	const changeValueHobby = (index, status) => {
		let items = [...hobby];
		let item = { ...items[index] };
		item.decision = status === true ? 1 : 0;
		items[index] = item;
		setHobby(items);
	};

	return (
		<View style={styles.container}>
			<BackNavigation goBack={goBack} />

			<View style={{ zIndex: 10, top: 0, position: 'absolute' }}>
				<Toast config={configToast} />
			</View>
			<View style={[styles.sectionContainer]}>
				<Text style={styles.textHeader}>Hobby</Text>
				{returnHobby ? (
					<>
						{hobby.length > 0 ? (
							<>
								<View style={styles.hobbyContainerEdit}>
									{hobby.map((hobby, ind) => {
										//console.log(hobby)
										return <HobbyButton text={hobby.name} edit={true} status={hobby.decision == 0 ? false : true} index={ind} key={hobby.hobbyId} changeValue={changeValueHobby} />;
									})}
								</View>
								<Button type='submit' title='submit' onPress={() => changeProfileHobby()} mode='contained'>
									<Entypo name='save' size={25} color='rgba(250,250,250,1)' />
									<Text style={{ textAlignVertical: 'center', textAlign: 'center', fontSize: 25 }}>Zapisz</Text>
								</Button>
							</>
						) : (
							<LoaderElements />
						)}
					</>
				) : (
					<LoaderElements />
				)}
			</View>
			<Menu profile={true} {...props} />
		</View>
	);
};
export default EditHobbyScreen;
