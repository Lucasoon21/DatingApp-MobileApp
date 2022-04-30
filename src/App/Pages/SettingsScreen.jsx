import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Menu from '../Controls/Menu';
import { styles } from '../Styles/SettingsStyle';
import { TextInput, Button } from 'react-native-paper';
//import { Slider } from 'react-native-range-slider-expo';
//import RangeSlider, { Slider } from 'react-native-range-slider-expo';

import { Picker } from '@react-native-picker/picker';
import HobbyButton from '../Controls/HobbyButton';
import DropDownPicker from 'react-native-dropdown-picker';
import { Checkbox } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import PreferencesService from '../../service/PreferencesService';
import { Entypo } from '@expo/vector-icons';
import { RangeSlider, Slider } from '@sharcoux/slider';
import ProfileService from '../../service/ProfileService';
import Toast from 'react-native-toast-message';
import { configToast } from '../Components/configToast';
import LoaderElements from '../Components/LoaderElements';

const SettingsScreen = (props) => {
	const enableScroll = () => setScrollEnabled(true);
	const disableScroll = () => setScrollEnabled(false);

	const showToast = (type, headerText, subText) => {
		Toast.show({
			type: type,
			text1: headerText,
			text2: subText,
			visibilityTime: 10000,
		});
	};

	const deleteAccount = async () => {
		setReturnDelete(true);

		let response = await ProfileService.deleteAccount();
		if (response.status === 200) {
			await SecureStore.deleteItemAsync('access_token');
			await SecureStore.deleteItemAsync('refresh_token');
			await SecureStore.deleteItemAsync('profileId');
			await SecureStore.deleteItemAsync('userId');
			setReturnDelete(false);
			props.navigation.navigate('AuthScreen');
			showToast('success', 'Usunięto konto!', 'Twoja konto zostało usunięte pomyślnie');
		} else {
			showToast('error', 'Nie usunięto konta', 'Nieudało się usunąć konta. Sprbuj ponownie później');
		}
	};
	const deactivationAccount = async () => {
		console.log('deactivateAccount');
		setReturnDeactivate(true);
		let response = await ProfileService.deactivateAccount();
		if (response.status === 200) {
			await SecureStore.deleteItemAsync('access_token');
			await SecureStore.deleteItemAsync('refresh_token');
			await SecureStore.deleteItemAsync('profileId');
			await SecureStore.deleteItemAsync('userId');
			setReturnDeactivate(false);
			props.navigation.navigate('AuthScreen');
			showToast('success', 'Dezaktywowano konto!', 'Twoja konto zostało dezaktywowane pomyślnie');
		} else {
			showToast('error', 'Nie dezaktywowano konto', 'Nieudało się dezaktywować konta. Sprbuj ponownie później');
		}
	};
	const changePassword = () => {
		props.navigation.navigate('ChangePasswordScreen');
	};

	const [scrollEnabled, setScrollEnabled] = useState(true);

	const [fromAge, setFromAge] = useState(18);
	const [toAge, setToAge] = useState(60);
	const [returnAge, setReturnAge] = useState(false);
	const [returnKilometers, setReturnKilometers] = useState(false);
	const [returnWeight, setReturnWeight] = useState(false);
	const [returnHeight, setReturnHeight] = useState(false);
	const [returnHobby, setReturnHobby] = useState(false);
	const [returnSave, setReturnSave] = useState(false);
	const [returnDelete, setReturnDelete] = useState(false);
	const [returnDeactivate, setReturnDeactivate] = useState(false);

	const [returnGender, setReturnGender] = useState(false);
	const [gender, setGender] = useState([]);

	const [kilometers, setKilometers] = useState(10);
	const [interestedSex, setInterestedSex] = useState('Kobieta');
	const [fromHeight, setFromHeight] = useState(140);
	const [toHeight, setToHeight] = useState(200);
	const [fromWeight, setFromWeight] = useState(40);
	const [toWeight, setToWeight] = useState(130);
	const navigation = useNavigation();
	const [checked, setChecked] = React.useState(false);

	const [error, setError] = useState(false);

	const [education, setEducation] = useState([
		{ label: 'Podstawowe', status: false },
		{ label: 'Gimnazjalne', status: false },
		{ label: 'Zasadnicze zawodowe', status: false },
		{ label: 'Zasadnicze branżowe', status: false },
		{ label: 'Średnie', status: false },
		{ label: 'Wyższe 1 stopnia', status: false },
		{ label: 'Wyższe 2 stopnia', status: false },
		{ label: 'Wyższe 3 stopnia', status: false },
	]);

	const [religion, setReligion] = useState([
		{ label: 'Katolicyzm', status: false },
		{ label: 'Protestantyzm', status: false },
		{ label: 'Prawosławizm', status: false },
		{ label: 'Islam', status: false },
		{ label: 'Ateizm', status: false },
	]);
	const [children, setChildren] = useState([
		{ label: 'Nigdy nie chcę mieć dzieci', status: false },
		{ label: 'Nie chcę mieć dzieci teraz ale w dalszej przyszłości', status: false },
		{ label: 'Mam już dzieci i nie chcę więcej', status: false },
		{ label: 'Mam już dzieci oraz chcę więcej', status: false },
		{ label: 'Chcę mieć dzieci jak najszbciej', status: false },
	]);
	const [alcohol, setAlcohol] = useState([
		{ label: 'Nie piję', status: false },
		{ label: 'Piję okazjonalnie', status: false },
		{ label: 'Piję rzadko', status: false },
		{ label: 'Piję dosyć często', status: false },
		{ label: 'Piję nałogowo', status: false },
	]);

	const [cigarette, setCigarette] = useState([
		{ label: 'Nie palę', status: false },
		{ label: 'Palę okazjonalnie', status: false },
		{ label: 'Palę rzadko', status: false },
		{ label: 'Palę dosyć często', status: false },
		{ label: 'Palę nałogowo', status: false },
	]);

	const updateEducation = (index, status) => {
		let newArr = [...education];
		newArr[index].status = status;
		setEducation(newArr);
	};

	const updateReligion = (index, status) => {
		let newArr = [...religion];
		newArr[index].status = status;
		setReligion(newArr);
	};
	const updateChildren = (index, status) => {
		let newArr = [...children];
		newArr[index].status = status;
		setChildren(newArr);
	};

	const updateAlcohol = (index, status) => {
		let newArr = [...alcohol];
		newArr[index].status = status;
		setAlcohol(newArr);
	};
	const updateCigarette = (index, status) => {
		let newArr = [...cigarette];
		newArr[index].status = status;
		setCigarette(newArr);
	};

	const updateGender = (index, status) => {
		console.log('zmiana');
		let newArr = [...gender];
		newArr[index].decision = status;
		setGender(newArr);
	};
	const logout = async () => {
		//console.log('wyloguj');
		await SecureStore.deleteItemAsync('access_token');
		await SecureStore.deleteItemAsync('refresh_token');
		await SecureStore.deleteItemAsync('profileId');
		await SecureStore.deleteItemAsync('userId');
		//	const token = await SecureStore.getItemAsync('access_token');
		//console.log('changeAge token access wyloguj = ', token??"");
		navigation.navigate('AuthScreen');
	};

	useEffect(() => {
		async function fetchProfileHobby() {
			setReturnHobby(false);
			let response = await PreferencesService.getHobbyPreferences();
			if (response.status == 200) {
				setHobby(response.data);
				setReturnHobby(true);
			} else {
				setError(true);
			}
			//console.log(response.data)
		}
		const changeAge = (from, to) => {
			setFromAge(from);
			setToAge(to);
		};
		async function fetchProfileAge() {
			setReturnAge(false);
			let response = await PreferencesService.getAgePreferences();
			//	console.log(response.status ?? '---');

			if (response.status == 200) {
				changeAge(response.data.ageFrom, response.data.ageTo);
				setReturnAge(true);
			} else {
				setError(true);
			}
		}

		async function fetchProfileHeight() {
			setReturnHeight(false);
			let response = await PreferencesService.getHeightPreferences();
			//console.log(response.status ?? '---');
			if (response.status == 200) {
				setFromHeight(response.data.heightFrom);
				setToHeight(response.data.heightTo);
				setReturnHeight(true);
				//console.log(response.data);
			} else {
				setError(true);
			}
		}

		async function fetchProfileWeight() {
			setReturnWeight(false);
			let response = await PreferencesService.getWeightPreferences();
			if (response.status == 200) {
				console.log(response.data);
				setFromWeight(response.data.weightFrom);
				setToWeight(response.data.weightTo);
				setReturnWeight(true);
			} else {
				setError(true);
			}
		}

		async function fetchGenders() {
			setReturnGender(false);
			let response = await PreferencesService.getGenderPreferences();
			if (response.status == 200) {
				setGender(response.data);
				setReturnGender(true);
			} else {
				setError(true);
			}
		}
		function checkError() {
			if (error == true) {
				showToast('error', 'Nie wczytano danych', 'Nieudało się wczytać preferencji wyszukiwania użytkowników. Sprbuj ponownie później');

				setError(false);
			}
		}

		fetchProfileHeight();
		fetchProfileAge();
		fetchProfileHobby();
		fetchProfileWeight();
		fetchGenders();
		setReturnKilometers(true);
		checkError();
	}, []);

	const changePreferences = async () => {
		setReturnSave(true);
		let responseAge = await PreferencesService.changeAgePreferences(fromAge, toAge);
		let responseHobby = await PreferencesService.changePreferencesHobby(hobby);
		let responseHeight = await PreferencesService.changeHeightPreferences(fromHeight, toHeight);
		let responseWeight = await PreferencesService.changeWeightPreferences(fromWeight, toWeight);
		let responseGender = await PreferencesService.changePreferencesGender(gender);
		if (responseAge.status == 200 && responseWeight.status == 200 && responseHeight.status == 200 && responseHobby.status == 200 && responseGender.status == 200) {
			setReturnSave(false);
			showToast('success', 'zmieniono preferencje wyszukiwania!', 'Twoje preferencje co do wyszukiwania użytkowników zostało zmienione pomyślnie');
		} else {
			showToast('error', 'Nie zmieniono preferencji wyszukiwania!', 'Twoje preferencje co do wyszukiwania użytkowników nie zostało zmienione. Spróbuj ponownie później');
		}

		//	console.log(responseWeight.status)
	};

	const changeValueHobby = (index, status) => {
		let items = [...hobby];
		let item = { ...items[index] };
		item.decision = status === true ? 1 : 0;
		items[index] = item;
		setHobby(items);
	};
	const [hobby, setHobby] = useState([]);

	return (
		<View style={styles.container}>
			<View style={{ zIndex: 10, top: 0, position: 'absolute' }}>
				<Toast config={configToast} />
			</View>
			<ScrollView style={styles.scrollView}>
				<View style={styles.scrollContainer}>
					<View style={styles.sectionContainer}>
						<Text style={styles.headerText}>Działania dotyczące konta</Text>
						<Button mode='contained' onPress={() => deleteAccount()} title='Delete' style={styles.button} disabled={returnDelete || returnDeactivate || returnSave}>
							{returnDelete ? <>Trwa usuwanie...</> : <>Usuń konto</>}
						</Button>
						<Button mode='contained' onPress={() => deactivationAccount()} title='deactivate' style={styles.button} disabled={returnDelete || returnDeactivate || returnSave}>
							{returnDeactivate ? <>Trwa deaktywacja konta...</> : <>Deaktywuj konto</>}
						</Button>
						<Button mode='contained' onPress={() => changePassword()} title='changePassword' style={styles.button} disabled={returnDelete || returnDeactivate || returnSave}>
							Zmień hasło
						</Button>
						<Button mode='contained' onPress={() => logout()} title='logout' style={styles.button} disabled={returnDelete || returnDeactivate || returnSave}>
							{returnDeactivate ? <>Trwa wylogowanie...</> : <>Wyloguj</>}
						</Button>

						{returnSave ? (
							<LoaderElements />
						) : (
							<>
								<Button type='submit' title='submit' onPress={() => changePreferences()} mode='contained' disabled={returnDelete || returnDeactivate || returnSave} style={styles.button}>
									Zapisz preferencje
								</Button>
								{/* <Button type='submit' title='submit' onPress={() => changePreferences()} mode='contained' disabled={returnDelete || returnDeactivate || returnSave}>
									<Entypo name='save' size={20} color='rgba(250,250,250,1)' />
									<Text style={{ textAlignVertical: 'center', textAlign: 'center', fontSize: 17 }}> Zapisz preferencje</Text>
								</Button> */}
							</>
						)}
					</View>

					<View style={styles.sectionContainer}>
						<Text style={styles.headerText}>Zakres wieku</Text>

						{returnAge ? (
							<>
								<RangeSlider
									range={[fromAge, toAge]} // set the current slider's value
									minimumValue={18} // Minimum value
									maximumValue={60} // Maximum value
									step={1} // The step for the slider (0 means that the slider will handle any decimal value within the range [min, max])
									crossingAllowed={false} // If true, the user can make one thumb cross over the second thumb
									vertical={false} // If true, the slider will be drawn vertically
									inverted={false} // If true, min value will be on the right, and max on the left
									enabled={true} // If false, the slider won't respond to touches anymore
									trackHeight={6} // The track's height in pixel
									thumbSize={20} // The thumb's size in pixel
									slideOnTap={true} // If true, touching the slider will update it's value. No need to slide the thumb.
									onSlidingComplete={(value) => {
										setFromAge(value[0]);
										setToAge(value[1]);
									}}
									onValueChange={(value) => {
										setFromAge(value[0]);
										setToAge(value[1]);
									}}
									{...props} // Add any View Props that will be applied to the container (style, ref, etc)
								/>

								<Text style={styles.subText}>
									Wiek od: {fromAge} do {toAge}
								</Text>
							</>
						) : (
							<LoaderElements />
						)}
					</View>

					<View style={styles.sectionContainer}>
						<Text style={styles.headerText}>Maksymalna odległość</Text>
						{returnKilometers ? (
							<>
								<Slider
									value={kilometers} // set the current slider's value
									minimumValue={3} // Minimum value
									maximumValue={100} // Maximum value
									step={1} // The step for the slider (0 means that the slider will handle any decimal value within the range [min, max])
									minimumTrackTintColor='red' // The track color before the current value
									maximumTrackTintColor='grey' // The track color after the current value
									thumbTintColor='darkcyan' // The color of the slider's thumb
									vertical={false} // If true, the slider will be drawn vertically
									inverted={false} // If true, min value will be on the right, and max on the left
									enabled={true} // If false, the slider won't respond to touches anymore
									trackHeight={6} // The track's height in pixel
									thumbSize={20} // The thumb's size in pixel
									slideOnTap={true} // If true, touching the slider will update it's value. No need to slide the thumb.
									onValueChange={(value) => setKilometers(value)} // Called each time the value changed. The type is (value: number) => void
									onSlidingStart={undefined} // Called when the slider is pressed. The type is (value: number) => void
									onSlidingComplete={(value) => setKilometers(value)} // Called when the press is released. The type is (value: number) => void
									{...props} // Add any View Props that will be applied to the container (style, ref, etc)
								/>

								<Text style={styles.subText}>Szukaj w maksymalnej odległości do {kilometers} km</Text>
							</>
						) : (
							<LoaderElements />
						)}
					</View>

					<View style={styles.sectionContainer}>
						<Text style={styles.headerText}>Wzrost</Text>

						{returnHeight ? (
							<>
								<RangeSlider
									range={[fromHeight, toHeight]} // set the current slider's value
									minimumValue={140} // Minimum value
									maximumValue={200} // Maximum value
									step={1} // The step for the slider (0 means that the slider will handle any decimal value within the range [min, max])
									crossingAllowed={false} // If true, the user can make one thumb cross over the second thumb
									vertical={false} // If true, the slider will be drawn vertically
									inverted={false} // If true, min value will be on the right, and max on the left
									enabled={true} // If false, the slider won't respond to touches anymore
									trackHeight={6} // The track's height in pixel
									thumbSize={20} // The thumb's size in pixel
									slideOnTap={true} // If true, touching the slider will update it's value. No need to slide the thumb.
									onSlidingComplete={(value) => {
										setFromHeight(value[0]);
										setToHeight(value[1]);
									}}
									onValueChange={(value) => {
										setFromHeight(value[0]);
										setToHeight(value[1]);
									}}
									{...props} // Add any View Props that will be applied to the container (style, ref, etc)
								/>
								<Text style={styles.subText}>
									Wzrost od: {fromHeight} do {toHeight}
								</Text>
							</>
						) : (
							<LoaderElements />
						)}
					</View>

					<View style={styles.sectionContainer}>
						<Text style={styles.headerText}>Waga</Text>

						{returnWeight ? (
							<>
								<RangeSlider
									range={[fromWeight, toWeight]} // set the current slider's value
									minimumValue={30} // Minimum value
									maximumValue={130} // Maximum value
									step={1} // The step for the slider (0 means that the slider will handle any decimal value within the range [min, max])
									crossingAllowed={false} // If true, the user can make one thumb cross over the second thumb
									vertical={false} // If true, the slider will be drawn vertically
									inverted={false} // If true, min value will be on the right, and max on the left
									enabled={true} // If false, the slider won't respond to touches anymore
									trackHeight={6} // The track's height in pixel
									thumbSize={20} // The thumb's size in pixel
									slideOnTap={true} // If true, touching the slider will update it's value. No need to slide the thumb.
									onSlidingComplete={(value) => {
										setFromWeight(value[0]);
										setToWeight(value[1]);
									}}
									onValueChange={(value) => {
										setFromWeight(value[0]);
										setToWeight(value[1]);
									}}
									{...props} // Add any View Props that will be applied to the container (style, ref, etc)
								/>
								<Text style={styles.subText}>
									Waga od: {fromWeight} do {toWeight}
								</Text>
							</>
						) : (
							<LoaderElements />
						)}
					</View>

					<View style={styles.sectionContainer}>
						<Text style={styles.headerText}>Pokaż mi</Text>

						{returnGender ? (
							<>
								{gender.map((subItems, sIndex) => {
									return (
										<Checkbox.Item
											key={sIndex}
											label={subItems.name}
											status={subItems.decision == 1 ? 'checked' : 'unchecked'}
											onPress={() => updateGender(sIndex, subItems.decision == 1 ? 0 : 1)}
										/>
									);
								})}
							</>
						) : (
							<>
								<LoaderElements />
							</>
						)}
						{/* <Picker style={styles.pickerStyle} selectedValue={interestedSex} onValueChange={(itemValue) => setInterestedSex(itemValue)}>
								<Picker.Item label='Kobiety' value='Kobieta'></Picker.Item>
								<Picker.Item label='Mężczyzn' value='Mężczyzna'></Picker.Item>
								<Picker.Item label='Wszystkich' value='Kobiety i mężczyźni'></Picker.Item>
							</Picker> */}
					</View>

					<View style={styles.sectionContainer}>
						<Text style={styles.headerText}>Znajdź mi osoby które interesują się również...</Text>
						<View style={styles.hobbyContainer}>
							{returnHobby && hobby.length > 0 ? (
								<>
									{hobby.map((hobby, ind) => {
										return <HobbyButton text={hobby.name} edit={true} status={hobby.decision} index={ind} key={hobby.hobbyId} changeValue={changeValueHobby} />;
									})}
								</>
							) : (
								<>
									<LoaderElements />
								</>
							)}
						</View>
					</View>

					<View style={styles.sectionContainer}>
						<Text style={styles.headerText}>wykształcenie</Text>
						{education.map((subItems, sIndex) => {
							return <Checkbox.Item key={sIndex} label={subItems.label} status={subItems.status ? 'checked' : 'unchecked'} onPress={() => updateEducation(sIndex, !subItems.status)} />;
						})}
					</View>

					<View style={styles.sectionContainer}>
						<Text style={styles.headerText}>Religia</Text>
						{religion.map((subItems, sIndex) => {
							return <Checkbox.Item key={sIndex} label={subItems.label} status={subItems.status ? 'checked' : 'unchecked'} onPress={() => updateReligion(sIndex, !subItems.status)} />;
						})}
					</View>

					<View style={styles.sectionContainer}>
						<Text style={styles.headerText}>Dzieci</Text>
						{children.map((subItems, sIndex) => {
							return <Checkbox.Item key={sIndex} label={subItems.label} status={subItems.status ? 'checked' : 'unchecked'} onPress={() => updateChildren(sIndex, !subItems.status)} />;
						})}
					</View>

					<View style={styles.sectionContainer}>
						<Text style={styles.headerText}>Alkohol</Text>
						{alcohol.map((subItems, sIndex) => {
							return <Checkbox.Item key={sIndex} label={subItems.label} status={subItems.status ? 'checked' : 'unchecked'} onPress={() => updateAlcohol(sIndex, !subItems.status)} />;
						})}
					</View>

					<View style={styles.sectionContainer}>
						<Text style={styles.headerText}>Papierosy</Text>
						{cigarette.map((subItems, sIndex) => {
							return <Checkbox.Item key={sIndex} label={subItems.label} status={subItems.status ? 'checked' : 'unchecked'} onPress={() => updateCigarette(sIndex, !subItems.status)} />;
						})}
					</View>
				</View>
			</ScrollView>
			<Menu settings={true} {...props} />
		</View>
	);
};
export default SettingsScreen;
