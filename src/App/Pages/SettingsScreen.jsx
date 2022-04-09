import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, TouchableOpacity, ScrollView } from 'react-native';
import Menu from '../Controls/Menu';
import { styles } from '../Styles/SettingsStyle';
import { TextInput, Button } from 'react-native-paper';
import RangeSlider, { Slider } from 'react-native-range-slider-expo';
import { Picker } from '@react-native-picker/picker';
import HobbyButton from '../Controls/HobbyButton';
import DropDownPicker from 'react-native-dropdown-picker';
import { Checkbox } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import PreferencesService from '../../service/PreferencesService';
import { Entypo } from '@expo/vector-icons';

const SettingsScreen = (props) => {
	const deleteAccount = () => {
		console.log('deleteAccount');
	};
	const deactivationAccount = () => {
		console.log('deactivateAccount');
	};
	const changePassword = () => {
		console.log('changePassword');
	};

	const [fromAge, setFromAge] = useState(18);
	const [toAge, setToAge] = useState(100);
	const [kilometers, setKilometers] = useState(0);
	const [interestedSex, setInterestedSex] = useState('Kobieta');
	const [fromHeight, setFromHeight] = useState(100);
	const [toHeight, setToHeight] = useState(200);
	const [fromWeight, setFromWeight] = useState(30);
	const [toWeight, setToWeight] = useState(150);
	const navigation = useNavigation();
	const [checked, setChecked] = React.useState(false);

	const [zodiac, setZodiac] = useState([
		{ label: 'Baran', status: false },
		{ label: 'Byk', status: false },
		{ label: 'Bliźnięta', status: false },
		{ label: 'Rak', status: false },
		{ label: 'Lew', status: false },
		{ label: 'Panna', status: false },
		{ label: 'Waga', status: false },
		{ label: 'Skorpion', status: false },
		{ label: 'Strzelec', status: false },
		{ label: 'Koziorożec', status: false },
		{ label: 'Wodnik', status: false },
		{ label: 'Ryby', status: false },
	]);

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

	const updatezodiac = (index, status) => {
		//  console.log("\n\ index: "+index + ", status: "+status);
		//  console.log("PRZED \t label: "+zodiac[index].label + ", status: "+zodiac[index].status);
		let newArr = [...zodiac];
		newArr[index].status = status;
		setZodiac(newArr);
		//console.log("PO \t label: "+zodiac[index].label + ", status: "+zodiac[index].status);
	};

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

	const logout = async () => {
		//console.log('wyloguj');
		await SecureStore.deleteItemAsync('access_token');
		await SecureStore.deleteItemAsync('refresh_token');
		await SecureStore.deleteItemAsync('profileId');
		await SecureStore.deleteItemAsync('userId');
		//	const token = await SecureStore.getItemAsync('access_token');
		//console.log('xdd token access wyloguj = ', token??"");
		navigation.navigate('AuthScreen');
	};

	useEffect(() => {
		async function fetchProfileHobby() {
			let response = await PreferencesService.getHobbyPreferences();
			if(response.status ==200) {
				setHobby(response.data);
			}
			console.log(response.data)
		}
		async function fetchProfileAge() {
			let response = await PreferencesService.getAgePreferences();
			console.log(response.status ?? '---');
			if (response.status == 200) {
				setFromAge(response.data.ageFrom);
				setToAge(response.data.ageTo);
				//console.log(response.data);
			}
		}

		async function fetchProfileHeight() {
			let response = await PreferencesService.getHeightPreferences();
			console.log(response.status ?? '---');
			if (response.status == 200) {
				setFromHeight(response.data.heightFrom);
				setToHeight(response.data.heightTo);
				//console.log(response.data);
			}
		}

		async function fetchProfileWeight() {
			let response = await PreferencesService.getWeightPreferences();
			console.log(response.status ?? '---');
			if (response.status == 200) {
				setFromWeight(response.data.weightFrom);
				setToWeight(response.data.weightTo);
			//	console.log(response.data);
			}
		}
		fetchProfileHeight();
		fetchProfileAge();
		fetchProfileHobby();
		fetchProfileWeight();
	}, []);

	const changePreferences = async () => {
		let responseAge = await PreferencesService.changeAgePreferences(fromAge, toAge);
		console.log(responseAge.status)
		let responseHobby = await PreferencesService.changePreferencesHobby(hobby)
		console.log(responseHobby.status)
		let responseHeight = await PreferencesService.changeHeightPreferences(fromHeight, toHeight);
		console.log(responseHeight.status)
		let responseWeight = await PreferencesService.changeWeightPreferences(fromWeight, toWeight);
		console.log(responseWeight.status)

	}

	const changeValueHobby = (index, status) => {
		console.log("index="+index)
		console.log("status="+status)
		let items = [...hobby]
		let item = {...items[index]}
		item.decision = status===true? 1:0
		items[index]=item;
		setHobby(items)
	//	console.log(hobby)
		//console.log("===========================================================")
		//console.log(hobby)
	}
	const [hobby, setHobby] = useState([]);



	return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollView}>
				<View style={styles.scrollContainer}>
					<View style={styles.sectionContainer}>
						<Text style={styles.headerText}>Działania dotyczące konta</Text>
						<Button mode='contained' onPress={() => deleteAccount()} title='Delete' style={styles.button}>
							Usuń konto
						</Button>
						<Button mode='contained' onPress={() => deactivationAccount()} title='deactivate' style={styles.button}>
							Dezaktywuj konto
						</Button>
						<Button mode='contained' onPress={() => changePassword()} title='changePassword' style={styles.button}>
							Zmień hasło
						</Button>
						<Button mode='contained' onPress={() => logout()} title='logout' style={styles.button}>
							Wyloguj
						</Button>
						<Button type='submit' title='submit' onPress={() => changePreferences()} mode='contained'>
							<Entypo name='save' size={25} color='rgba(250,250,250,1)' />
						<Text style={{ textAlignVertical: 'center', textAlign: 'center', fontSize: 25 }}>Zapisz</Text>
					</Button>
					</View>

					<View style={styles.sectionContainer}>
						<Text style={styles.headerText}>Zakres wieku</Text>
						<RangeSlider min={18} max={100} fromValueOnChange={(value) => setFromAge(value)} toValueOnChange={(value) => setToAge(value)} initialFromValue={fromAge} initialToValue={toAge} />
						<Text style={styles.subText}>
							Wiek od: {fromAge} do {toAge}
						</Text>
					</View>

					<View style={styles.sectionContainer}>
						<Text style={styles.headerText}>Maksymalna odległość</Text>
						<Slider
							min={3}
							max={100} //step={4}
							valueOnChange={(value) => setKilometers(value)}
							initialValue={50}
							knobColor='red'
							valueLabelsBackgroundColor='black'
							inRangeBarColor='orange'
							outOfRangeBarColor='purple'
						/>
						<Text style={styles.subText}>Szukaj w maksymalnej odległości do {kilometers} km</Text>
					</View>

					<View style={styles.sectionContainer}>
						<Text style={styles.headerText}>Pokaż mi</Text>
						<View style={styles.pickerView}>
							<Picker style={styles.pickerStyle} selectedValue={interestedSex} onValueChange={(itemValue) => setInterestedSex(itemValue)}>
								<Picker.Item label='Kobiety' value='Kobieta'></Picker.Item>
								<Picker.Item label='Mężczyzn' value='Mężczyzna'></Picker.Item>
								<Picker.Item label='Wszystkich' value='Kobiety i mężczyźni'></Picker.Item>
							</Picker>
						</View>
					</View>

					<View style={styles.sectionContainer}>
						<Text style={styles.headerText}>Znajdź mi osoby które interesują się również...</Text>
						<View style={styles.hobbyContainer}>
						{
                        hobby.map((hobby,ind) => {
							//console.log(hobby)
                            return <HobbyButton text={hobby.name} edit={true} status={hobby.decision} index={ind} key={hobby.hobbyId} changeValue={changeValueHobby} />;
                        })
                    }
							{/* <HobbyButton text='Sport' edit={true} index={1} status={true} changeValue={changeValueHobby}/>
							<HobbyButton text='Muzyka' edit={true} index={1} status={true} changeValue={changeValueHobby}/>
							<HobbyButton text='Gotowanie' edit={true} index={1} status={true} changeValue={changeValueHobby}/>
							<HobbyButton text='Taniec' edit={true} index={1} status={true} changeValue={changeValueHobby}/> 
							<HobbyButton text='Podróże' edit={true} index={1} status={true} changeValue={changeValueHobby}/>
							<HobbyButton text='Sport' edit={true} index={1} status={true} changeValue={changeValueHobby}/> */}

						</View>
					</View>

					<View style={styles.sectionContainer}>
						<Text style={styles.headerText}>Wzrost</Text>
						<RangeSlider min={100} max={200} fromValueOnChange={(value) => setFromHeight(value)} toValueOnChange={(value) => setToHeight(value)} initialFromValue={fromHeight} initialToValue={toHeight} />
						<Text style={styles.subText}>
							Wzrost od: {fromHeight} do {toHeight}
						</Text>
					</View>

					<View style={styles.sectionContainer}>
						<Text style={styles.headerText}>Waga</Text>
						<RangeSlider min={30} max={150} fromValueOnChange={(value) => setFromWeight(value)} toValueOnChange={(value) => setToWeight(value)}  initialFromValue={fromWeight} initialToValue={toWeight} />
						<Text style={styles.subText}>
							Waga od: {fromWeight} do {toWeight}
						</Text>
					</View>

					<View style={styles.sectionContainer}>
						<Text style={styles.headerText}>Znak zodiacu</Text>
						{zodiac.map((subItems, sIndex) => {
							return <Checkbox.Item key={sIndex} label={subItems.label} status={subItems.status ? 'checked' : 'unchecked'} onPress={() => updatezodiac(sIndex, !subItems.status)} />;
						})}
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

					<View style={styles.sectionContainer}></View>
				</View>
			</ScrollView>
			<Menu settings={true} />
		</View>
	);
};
export default SettingsScreen;
