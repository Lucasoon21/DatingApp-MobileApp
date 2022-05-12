import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator } from 'react-native';
import Menu from '../Controls/Menu';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../Styles/ProfileStyle';
import HobbyButton from '../Controls/HobbyButton';
import RelationButton from '../Controls/RelationButton';
import ProfileService from '../../service/ProfileService';
import { Button } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';
import { configToast } from '../Components/configToast';
import BackNavigation from '../Controls/BackNavigation';
import LoaderElements from '../Components/LoaderElements';
import { useToast } from 'react-native-toast-notifications';

const EditRelationshipScreen = (props) => {
	const goBack = () => props.navigation.goBack();

	const [relationship, setRelationship] = useState([]);
	const [returnRelationship, setReturnRelationship] = useState(false);

	useEffect(() => {
		async function fetchProfileRelationship() {
			setReturnRelationship(false);
			let profileId = await SecureStore.getItemAsync('profileId');
			let response = await ProfileService.getProfileRelationship(profileId);
			if (response.status == 200) {
				setRelationship(response.data);
				setReturnRelationship(true);
			}
		}
		fetchProfileRelationship();
	}, []);

	const changeValueRelationship = (index, status) => {
		let items = [...relationship];
		let item = { ...items[index] };
		item.decision = status;
		items[index] = item;
		setRelationship(items);
	};

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

	const changeRelationshipHobby = async () => {
		let response = await ProfileService.changeProfileRelationship(relationship);
		if (response.status == 200) {
			showToast('success', 'Szukane relacje zmienione!', 'Twoja zmiana szukanych relacji została zakończona pomyślnie');
		} else {
			showToast('error', 'Nie zmieniono szukanych relacji', 'Nieudało się szukanych relacji. Sprbuj ponownie później');
		}
	};
	return (
		<View style={styles.container}>
			<BackNavigation goBack={goBack} />

			<View style={{ zIndex: 10, top: 0, position: 'absolute' }}>
				<Toast config={configToast} />
			</View>
			<View style={[styles.sectionContainer]}>
				<Text style={styles.textHeader}>Szukam...</Text>
				{returnRelationship ? (
					<>
						{relationship.length > 0 ? (
							<>
								<View style={styles.hobbyContainerEdit}>
									{relationship.map((relationship, ind) => {
										//console.log(hobby)
										return (
											<RelationButton
												text={relationship.name}
												edit={true}
												type={relationship.decision}
												index={ind}
												key={relationship.relationshipId}
												changeValue={changeValueRelationship}
											/>
										);
									})}
								</View>
								<Button type='submit' title='submit' onPress={() => changeRelationshipHobby()} mode='contained'>
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
export default EditRelationshipScreen;
