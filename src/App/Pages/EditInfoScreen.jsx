import React, { useState, useEffect, useCom } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, TouchableOpacity, ScrollView, StatusBar, TextInput } from 'react-native';
import Menu from '../Controls/Menu';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../Styles/ProfileStyle';
import { Picker } from '@react-native-picker/picker';
import { render } from 'react-dom';
import { Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import DictionaryService from '../../service/DictionaryService';

const weightArray = new Array(120).fill().map((value, index) => ({ id: index + 30 }));

const heightArray = new Array(100).fill().map((value, index) => ({ id: index + 100 }));

const EditInfoScreen = (props) => {
	var today = new Date();
	var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

	console.log('======== START =======' + time);
	// const goBack = () => props.navigation.goBack();

	const [work, setWork] = useState('');
	const [characterWorkCount, setCharacterWorkCount] = useState(work.length);
	const MAX_LENGTH_WORK = 50;

	const [cigarette, setCigarette] = useState('');
	const [alcohol, setAlcohol] = useState('');
	const [children, setChildren] = useState('');
	const [religion, setReligion] = useState('');
	const [education, setEducation] = useState('');
	const [orientation, setOrientation] = useState('');
	const [weight, setWeight] = useState('');
	const [height, setHeight] = useState('');
    const [eyeColor, setEyeColor] = useState('');

	const [orientationDropdown, setOrientationDropdown] = useState([]);
	const [zodiacDropdown, setZodiacDropdown] = useState([]);
	const [educationDropdown, setEducationDropdown] = useState([]);
	
	const [eyeColorDropdown, setEyeColorDropdown] = useState([]);
    const [religiousDropdown, setReligiousDropdown] = useState([]);
	const [childrenDropdown, setChildrenDropdown] = useState([]);
	const [alcoholDropdown, setAlcoholDropdown] = useState([]);
	const [cigarettesDropdown, setCigarettesDropdown] = useState([]);


	const [weightDropdown, setWeightDropdown] = useState([]);
	const [heightDropdown, setHeightDropdown] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getDropdownList();
	}, []);

	const getDropdownList = async () => {
		let Alcohol = await DictionaryService.getAlcoholDictionary();
		setAlcoholDropdown(Alcohol);
		let Children = await DictionaryService.getChildrenDictionary();
		setChildrenDropdown(Children);
		let Cigarettes = await DictionaryService.getCigarettesDictionary();
		setCigarettesDropdown(Cigarettes);
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

		// let Hobby = await DictionaryService.getHobbyDictionary();
		// setHobbyDropdown(Hobby);
		// let Gender = await DictionaryService.getGenderDictionary();
		// setGenderDropdown(Gender);
		// let Relationship = await DictionaryService.getRelationshipDictionary();
		// setRelationshipDropdown(Relationship);
	};

	const renderZodiacList = () => {
		return zodiacDropdown.map((Zodiac) => {
			return <Picker.Item label={Zodiac.name} value={Zodiac.name} key={Zodiac.id} />;
		});
	};

	const renderReligiousList = () => {
		return religiousDropdown.map((Religious) => {
			return <Picker.Item label={Religious.name} value={Religious.name} key={Religious.id} />;
		});
	};

	const renderRelationshipList = () => {
		return relationshipDropdown.map((Relationship) => {
			return <Picker.Item label={Relationship.name} value={Relationship.name} key={Relationship.id} />;
		});
	};

	const renderOrientationList = () => {
		return orientationDropdown.map((Orientation) => {
			return <Picker.Item label={Orientation.name} value={Orientation.name} key={Orientation.id} />;
		});
	};

	const renderHobbyList = () => {
		return hobbyDropdown.map((Hobby) => {
			return <Picker.Item label={Hobby.name} value={Hobby.name} key={Hobby.id} />;
		});
	};

	const renderGenderList = () => {
		return genderDropdown.map((Gender) => {
			return <Picker.Item label={Gender.name} value={Gender.name} key={Gender.id} />;
		});
	};

	const renderEyeColorList = () => {
		return eyeColorDropdown.map((EyeColor) => {
			return <Picker.Item label={EyeColor.name} value={EyeColor.name} key={EyeColor.id} />;
		});
	};

	const renderEducationList = () => {
		return educationDropdown.map((Education) => {
			return <Picker.Item label={Education.name} value={Education.name} key={Education.id} />;
		});
	};

	const renderCigarettesList = () => {
		return cigarettesDropdown.map((Cigarettes) => {
			return <Picker.Item label={Cigarettes.name} value={Cigarettes.name} key={Cigarettes.id} />;
		});
	};

	const renderChildrenList = () => {
		return childrenDropdown.map((Children) => {
			return <Picker.Item label={Children.name} value={Children.name} key={Children.id} />;
		});
	};
	const renderAlcoholList = () => {
		return alcoholDropdown.map((alcohol) => {
			return <Picker.Item label={alcohol.name} value={alcohol.name} key={alcohol.id} />;
		});
	};

	return (
		<View style={styles.container}>
			{/* <TouchableOpacity onPress={goBack} style={styles.buttonBack}>
                <Ionicons name="arrow-back" size={40} color="rgba(50,50,50,1)" />
                <Text style={styles.textBack}>Cofnij</Text>
            </TouchableOpacity> */}

			<ScrollView style={styles.scrollView}>
				<View style={styles.scrollContainer}>
					<View style={[styles.sectionContainer, styles.sectionContainerFlex]}>
						<Entypo name='drink' size={24} color='black' />
						<Text style={styles.infoHeader}>Alkohol</Text>

						<Picker style={styles.pickerStyle} selectedValue={alcohol} onValueChange={(itemValue) => setAlcohol(itemValue)}>
							{renderAlcoholList()}
						</Picker>
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
								setWork(text);
								setCharacterWorkCount(text.length);
							}}
							value={work}
							style={[styles.textInput, styles.textInputWork]}
							editable
							maxLength={MAX_LENGTH_WORK}
						/>
					</View>

					<View style={[styles.sectionContainer, styles.sectionContainerFlex]}>
						<MaterialCommunityIcons name='human-male-height-variant' size={24} color='black' />
						<Text style={styles.infoHeader}>Wzrost</Text>

						<Picker style={styles.pickerStyle} selectedValue={height} onValueChange={(itemValue) => setHeight(itemValue)}>
							<Picker.Item label='Nie chcę podawać' value='Nie chcę podawać'></Picker.Item>
							{heightArray.map((item) => (
								<Picker.Item label={item.id.toString() + ' cm'} value={item.id.toString() + ' cm'} key={item.id}></Picker.Item>
							))}
							<Picker.Item label='>= 200 cm' value='>= 200 cm'></Picker.Item>
						</Picker>
					</View>

					<View style={[styles.sectionContainer, styles.sectionContainerFlex]}>
						<FontAwesome5 name='weight' size={24} color='black' />
						<Text style={styles.infoHeader}>Waga</Text>

						<Picker style={styles.pickerStyle} selectedValue={weight} onValueChange={(itemValue) => setWeight(itemValue)}>
							<Picker.Item label='Nie chcę podawać' value='Nie chcę podawać'></Picker.Item>
							<Picker.Item label='< 30 kg' value='< 30 kg'></Picker.Item>
							{weightArray.map((item) => (
								<Picker.Item label={item.id.toString() + ' kg'} value={item.id.toString() + ' kg'} key={item.id + 200}></Picker.Item>
							))}
							<Picker.Item label='>= 150 kg' value='>= 150 kg'></Picker.Item>
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
							{/* <Picker.Item label='Podstawowe' value='Podstawowe'></Picker.Item>
							<Picker.Item label='Gimnazjalne' value='Gimnazjalne'></Picker.Item>
							<Picker.Item label='Zasadnicze zawodowe' value='Zasadnicze zawodowe'></Picker.Item>
							<Picker.Item label='Zasadnicze branżowe' value='Zasadnicze branżowe'></Picker.Item>
							<Picker.Item label='Średnie' value='Średnie'></Picker.Item>
							<Picker.Item label='Wyższe 1 stopnia' value='Wyższe 1 stopnia'></Picker.Item>
							<Picker.Item label='Wyższe 2 stopnia' value='Wyższe 2 stopnia'></Picker.Item>
							<Picker.Item label='Wyższe 3 stopnia' value='Wyższe 3 stopnia'></Picker.Item> */}
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
							{/* <Picker.Item label='Nigdy nie chcę mieć dzieci' value='Nigdy nie chcę mieć dzieci'></Picker.Item>
							<Picker.Item label='Nie chcę mieć dzieci teraz ale w dalszej przyszłości' value='Nie chcę mieć dzieci teraz ale w dalszej przyszłości'></Picker.Item>
							<Picker.Item label='Mam już dzieci i nie chcę więcej' value='Mam już dzieci i nie chcę więcej'></Picker.Item>
							<Picker.Item label='Mam już dzieci oraz chcę więcej' value='Mam już dzieci oraz chcę więcej'></Picker.Item>
							<Picker.Item label='Chcę mieć dzieci jak najszbciej' value='Chcę mieć dzieci jak najszbciej'></Picker.Item> */}
                            {renderChildrenList()}
						</Picker>
					</View>

					<View style={[styles.sectionContainer, styles.sectionContainerFlex]}>
						<MaterialCommunityIcons name='cigar' size={24} color='black' />
						<Text style={styles.infoHeader}>Papierosy</Text>
						<Picker style={styles.pickerStyle} selectedValue={cigarette} onValueChange={(itemValue) => setCigarette(itemValue)}>
							{/* <Picker.Item label='Nie palę' value='Nie palę'></Picker.Item>
							<Picker.Item label='Palę okazjonalnie' value='Palę okazjonalnie'></Picker.Item>
							<Picker.Item label='Palę rzadko' value='Palę rzadko'></Picker.Item>
							<Picker.Item label='Palę dosyć często' value='Palę dosyć często'></Picker.Item>
							<Picker.Item label='Palę nałogowo' value='Palę nałogowo'></Picker.Item> */} 
                            {renderCigarettesList()}
						</Picker>
					</View>

                    <View style={[styles.sectionContainer, styles.sectionContainerFlex]}>
						<MaterialCommunityIcons name='eye' size={24} color='black' />
						<Text style={styles.infoHeader}>Kolor oczu</Text>
						<Picker style={styles.pickerStyle} selectedValue={cigarette} onValueChange={(itemValue) => setCigarette(itemValue)}>

                            {renderEyeColorList()}
						</Picker>
					</View>
				</View>
			</ScrollView>
			<Menu profile={true} />
		</View>
	);
};
export default EditInfoScreen;
