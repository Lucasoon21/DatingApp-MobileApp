import React, { useState, useEffect, useCom } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, TouchableOpacity, ScrollView, StatusBar, TextInput } from 'react-native';
import Menu from '../Controls/Menu';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../Styles/ProfileStyle';
import { Picker } from '@react-native-picker/picker';
import { render } from 'react-dom';
import { Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
//import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome, FontAwesomeIcon } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import DictionaryService from '../../service/DictionaryService';
import ProfileService from '../../service/ProfileService';
import Toast from 'react-native-toast-message';
import { configToast } from '../Components/configToast';
import BackNavigation from '../Controls/BackNavigation';
import { useToast } from 'react-native-toast-notifications';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import LoaderElements from '../Components/LoaderElements';

const weightArray = new Array(91).fill().map((value, index) => ({ id: index + 40 }));

const heightArray = new Array(61).fill().map((value, index) => ({ id: index + 140 }));

const EditInfoScreen = (props) => {
	const goBack = () => props.navigation.goBack();

	const [cigarette, setCigarette] = useState('');
	const [alcohol, setAlcohol] = useState('');
	const [children, setChildren] = useState('');
	const [religion, setReligion] = useState('');
	const [education, setEducation] = useState('');
	const [orientation, setOrientation] = useState('');
	const [weight, setWeight] = useState(40);
	const [height, setHeight] = useState(140);
	const [eyeColor, setEyeColor] = useState('');
	const [job, setJob] = useState('');
	const [city, setCity] = useState('');
	const [returnSave, setReturnSave] = useState(false);

	const [characterWorkCount, setCharacterWorkCount] = useState(job.length);
	const [characterCityCount, setCharacterCityCount] = useState(job.length);
	const MAX_LENGTH_WORK = 50;

	const [orientationDropdown, setOrientationDropdown] = useState([]);
	const [zodiacDropdown, setZodiacDropdown] = useState([]);
	const [educationDropdown, setEducationDropdown] = useState([]);
	const [eyeColorDropdown, setEyeColorDropdown] = useState([]);
	const [religiousDropdown, setReligiousDropdown] = useState([]);
	const [childrenDropdown, setChildrenDropdown] = useState([]);
	const [alcoholDropdown, setAlcoholDropdown] = useState([]);
	const [cigarettesDropdown, setCigarettesDropdown] = useState([]);

	const [tmp, setTmp] = useState('');
	const [tmp2, setTmp2] = useState('');

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
		getDropdownList();
		async function fetchDetailsProfile() {
			let profileId = await SecureStore.getItemAsync('profileId');
			let response = await ProfileService.getProfileDetails(profileId);
			if (response.status === 200) {
				let data = response.data;

				data.alcohol != null ? setAlcohol(data.alcohol.id) : null;
				data.cigarettes != null ? setCigarette(data.cigarettes.id) : null;
				data.children != null ? setChildren(data.children.id) : null;
				data.religious != null ? setReligion(data.religious.id) : null;
				data.education != null ? setEducation(data.education.id) : null;
				data.orientation != null ? setOrientation(data.orientation.id) : null;
				data.weight != null && data.weight > 40 && data.weight <= 130 ? setWeight(data.weight) : null;
				data.height != null && data.height > 140 && data.height <= 200 ? setHeight(data.height) : null;
				data.eyeColor != null ? setEyeColor(data.eyeColor.id) : null;
				data.job != null ? setJob(data.job) : null;
				setCity(data.city)
			} else {
				console.log('nie ok');
			}
		}
		fetchDetailsProfile();
	}, []);

	const getDropdownList = async () => {
		let Alcohol = await DictionaryService.getAlcoholDictionary();
		setAlcoholDropdown(Alcohol);
		
		let Children = await DictionaryService.getChildrenDictionary();
		setChildrenDropdown(Children);
		
		let Cigarettes = await DictionaryService.getCigarettesDictionary();
		setCigarettesDropdown(Cigarettes);
		console.log(Cigarettes[0].id);
		
		let Education = await DictionaryService.getEducationDictionary();
		setEducationDropdown(Education);
		
		let EyeColor = await DictionaryService.getEyeColorDictionary();
		setEyeColorDropdown(EyeColor);
		
		let Orientation = await DictionaryService.getOrientationDictionary();
		setOrientationDropdown(Orientation);
		
		let Religious = await DictionaryService.getReligiousDictionary();
		setReligiousDropdown(Religious);
		
		let Zodiac = await DictionaryService.getZodiacDictionary();
		setZodiacDropdown(Zodiac);
		
		setAlcohol(Alcohol[0].id);
		setChildren(Children[0].id);
		setCigarette(Cigarettes[0].id);
		setEducation(Education[0].id);
		setEyeColor(EyeColor[0].id);
		setOrientation(Orientation[0].id);
		setReligion(Religious[0].id);
	};

	const renderReligiousList = () => {
		return religiousDropdown.map((Religious) => {
			return <Picker.Item label={Religious.name} value={Religious.id} key={Religious.id} />;
		});
	};

	const renderOrientationList = () => {
		return orientationDropdown.map((Orientation) => {
			return <Picker.Item label={Orientation.name} value={Orientation.id} key={Orientation.id} />;
		});
	};

	const renderEyeColorList = () => {
		return eyeColorDropdown.map((EyeColor) => {
			return <Picker.Item label={EyeColor.name} value={EyeColor.id} key={EyeColor.id} />;
		});
	};

	const renderEducationList = () => {
		return educationDropdown.map((Education) => {
			return <Picker.Item label={Education.name} value={Education.id} key={Education.id} />;
		});
	};

	const renderCigarettesList = () => {
		return cigarettesDropdown.map((Cigarettes) => {
			return <Picker.Item label={Cigarettes.name} value={Cigarettes.id} key={Cigarettes.id} />;
		});
	};

	const renderChildrenList = () => {
		return childrenDropdown.map((Children) => {
			return <Picker.Item label={Children.name} value={Children.id} key={Children.id} />;
		});
	};
	const renderAlcoholList = () => {
		return alcoholDropdown.map((alcohol) => {
			return <Picker.Item label={alcohol.name} value={alcohol.id} key={alcohol.id} />;
		});
	};

	const changeProfileDetails = async () => {
		setReturnSave(true);
		console.log(alcohol, job, height, weight, orientation, education, religion, children, cigarette, eyeColor);
		let response = await ProfileService.changeProfileDetails(alcohol, job, height, weight, orientation, education, religion, children, cigarette, eyeColor, city);
		if (response == 200) {
			showToast('success', 'Dane szczegółowe zmienione!', 'Szczegółowe dane twojego profilu zostały zmienione');
		} else {
			showToast('error', 'Nie zmieniono danych profilu', 'Nieudało się zmienić danych profilu. Sprbuj ponownie później');
		}
		setReturnSave(false);
	};

	return (
		<View style={styles.container}>
			<BackNavigation goBack={goBack} />

			<View style={{ zIndex: 10, top: 0, position: 'absolute' }}>
				<Toast config={configToast} />
			</View>

			<ScrollView style={styles.scrollView}>
				<View style={styles.scrollContainer}>

					<View style={[styles.sectionContainer, styles.sectionContainerFlex]}>
					<FontAwesome5 name="city" size={24} color="black" />
						<View style={styles.workTextContainer}>
							<Text style={styles.infoHeader}>Miasto</Text>
							<Text style={styles.characterWorkCount}>
								{characterCityCount}/{MAX_LENGTH_WORK}
							</Text>
						</View>

						<TextInput
							onChangeText={(text) => {
								setCity(text);
								setCharacterCityCount(text.length);
							}}
							value={city}
							style={[styles.textInput, styles.textInputWork]}
							editable
							maxLength={MAX_LENGTH_WORK}
						/>
					</View>


					<View style={[styles.sectionContainer, styles.sectionContainerFlex]}>
						<MaterialIcons name='work' size={24} color='black' />
						<View style={styles.workTextContainer}>
							<Text style={styles.infoHeader}>Zawód</Text>
							<Text style={styles.characterWorkCount}>
								{characterWorkCount}/{MAX_LENGTH_WORK}
							</Text>
						</View>

						<TextInput
							onChangeText={(text) => {
								setJob(text);
								setCharacterWorkCount(text.length);
							}}
							value={job}
							style={[styles.textInput, styles.textInputWork]}
							editable
							maxLength={MAX_LENGTH_WORK}
						/>
					</View>

					<View style={[styles.sectionContainer, styles.sectionContainerFlex]}>
						{/* <MaterialCommunityIcons name='human-male-height-variant' size={24} color='black' /> */}
						<MaterialCommunityIcons name='human-male-height' size={24} color='black' />

						<Text style={styles.infoHeader}>Wzrost</Text>

						<Picker style={styles.pickerStyle} selectedValue={height} onValueChange={(itemValue) => setHeight(itemValue)}>
							{/* <Picker.Item label='Nie chcę podawać' value='0'></Picker.Item> */}
							{heightArray.map((item) => (
								<Picker.Item label={item.id.toString() + ' cm'} value={item.id} key={item.id}></Picker.Item>
							))}
							{/* <Picker.Item label='>= 200 cm' value='999'></Picker.Item> */}
						</Picker>
					</View>

					<View style={[styles.sectionContainer, styles.sectionContainerFlex]}>
						<FontAwesome5 name='weight' size={24} color='black' />
						<Text style={styles.infoHeader}>Waga</Text>

						<Picker style={styles.pickerStyle} selectedValue={weight} onValueChange={(itemValue) => setWeight(itemValue)}>
							{/* <Picker.Item label='Nie chcę podawać' value='Nie chcę podawać'></Picker.Item>
							<Picker.Item label='< 30 kg' value={0}></Picker.Item> */}
							{weightArray.map((item) => (
								<Picker.Item label={item.id.toString() + ' kg'} value={item.id} key={item.id + 200}></Picker.Item>
							))}
							{/* <Picker.Item label='>= 150 kg' value={0}></Picker.Item> */}
						</Picker>
					</View>

					<View style={[styles.sectionContainer, styles.sectionContainerFlex]}>
						<FontAwesome name='intersex' size={24} color='black' />
						<Text style={styles.infoHeader}>Orientacja</Text>

						<Picker style={styles.pickerStyle} selectedValue={orientation} onValueChange={(itemValue) => setOrientation(itemValue)}>
							{renderOrientationList()}
						</Picker>
					</View>

					<View style={[styles.sectionContainer, styles.sectionContainerFlex]}>
						<Ionicons name='school' size={24} color='black' />
						<Text style={styles.infoHeader}>Wykształcenie</Text>

						<Picker style={styles.pickerStyle} selectedValue={education} onValueChange={(itemValue) => setEducation(itemValue)}>
							{renderEducationList()}
						</Picker>
					</View>

					<View style={[styles.sectionContainer, styles.sectionContainerFlex]}>
						<FontAwesome5 name='church' size={24} color='black' />
						<Text style={styles.infoHeader}>Religia</Text>

						<Picker style={styles.pickerStyle} selectedValue={religion} onValueChange={(itemValue) => setReligion(itemValue)}>
							{renderReligiousList()}
						</Picker>
					</View>

					<View style={[styles.sectionContainer, styles.sectionContainerFlex]}>
						<MaterialIcons name='child-friendly' size={24} color='black' />
						<Text style={styles.infoHeader}>Dzieci</Text>

						<Picker style={styles.pickerStyle} selectedValue={children} onValueChange={(itemValue) => setChildren(itemValue)}>
							{renderChildrenList()}
						</Picker>
					</View>

					<View style={[styles.sectionContainer, styles.sectionContainerFlex]}>
						<Entypo name='drink' size={24} color='black' />
						<Text style={styles.infoHeader}>Alkohol</Text>

						<Picker
							style={styles.pickerStyle}
							selectedValue={alcohol}
							onValueChange={(itemValue) => {
								setAlcohol(itemValue);
							}}>
							{renderAlcoholList()}
						</Picker>
					</View>

					<View style={[styles.sectionContainer, styles.sectionContainerFlex]}>
						<MaterialCommunityIcons name='cigar' size={24} color='black' />
						<Text style={styles.infoHeader}>Papierosy</Text>
						<Picker style={styles.pickerStyle} selectedValue={cigarette} onValueChange={(itemValue) => setCigarette(itemValue)}>
							{renderCigarettesList()}
						</Picker>
					</View>

					<View style={[styles.sectionContainer, styles.sectionContainerFlex]}>
						<MaterialCommunityIcons name='eye' size={24} color='black' />
						<Text style={styles.infoHeader}>Kolor oczu</Text>
						<Picker style={styles.pickerStyle} selectedValue={eyeColor} onValueChange={(itemValue) => setEyeColor(itemValue)}>
							{renderEyeColorList()}
						</Picker>
					</View>

					{returnSave ? (
						<LoaderElements />
					) : (
						<Button type='submit' title='submit' onPress={() => changeProfileDetails()} mode='contained' style={{ marginTop: 20, width: '90%' }}>
							<Entypo name='save' size={25} color='rgba(250,250,250,1)' />
							<Text style={{ textAlignVertical: 'center', textAlign: 'center', fontSize: 25 }}>Zapisz</Text>
						</Button>
					)}
				</View>
			</ScrollView>
			<Menu profile={true} {...props} />
		</View>
	);
};
export default EditInfoScreen;
