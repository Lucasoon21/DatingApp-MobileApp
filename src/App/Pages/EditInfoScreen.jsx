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
import ProfileService from '../../service/ProfileService';

const weightArray = new Array(120).fill().map((value, index) => ({ id: index + 30 }));

const heightArray = new Array(100).fill().map((value, index) => ({ id: index + 100 }));

const EditInfoScreen = (props) => {
//	var today = new Date();
//	var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

	//console.log('======== START =======' + time);
	// const goBack = () => props.navigation.goBack();

	
	const [cigarette, setCigarette] = useState('');
	const [alcohol, setAlcohol] = useState('');
	const [children, setChildren] = useState('');
	const [religion, setReligion] = useState('');
	const [education, setEducation] = useState('');
	const [orientation, setOrientation] = useState('');
	const [weight, setWeight] = useState('');
	const [height, setHeight] = useState('');
	const [eyeColor, setEyeColor] = useState('');
	const [job, setJob] = useState('');
	
	const [characterWorkCount, setCharacterWorkCount] = useState(job.length);
	const MAX_LENGTH_WORK = 50;

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
		async function fetchDetailsProfile(){
            let response = await ProfileService.getProfileDetails();
            if(response.status === 200){
                let data = response.data
                console.log("ok",data.alcohol.id)
               
                setAlcohol(data.alcohol.id)
                setCigarette(data.cigarettes.id)
                setChildren(data.children.id)
                setReligion(data.religious.id)
                setEducation(data.education.id)
                setOrientation(data.orientation.id)
                setWeight(data.weight)
                setHeight(data.height)
                setEyeColor(data.eyeColor.id)
                setJob(data.job)
               
                
                
                 
            } else {
                console.log("nie ok")
            }
            //console.log(response);
        }
        fetchDetailsProfile()
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
			return <Picker.Item label={Zodiac.name} value={Zodiac.id} key={Zodiac.id} />;
		});
	};

	const renderReligiousList = () => {
		return religiousDropdown.map((Religious) => {
			return <Picker.Item label={Religious.name} value={Religious.id} key={Religious.id} />;
		});
	};

	const renderRelationshipList = () => {
		return relationshipDropdown.map((Relationship) => {
			return <Picker.Item label={Relationship.name} value={Relationship.id} key={Relationship.id} />;
		});
	};

	const renderOrientationList = () => {
		return orientationDropdown.map((Orientation) => {
			return <Picker.Item label={Orientation.name} value={Orientation.id} key={Orientation.id} />;
		});
	};

	const renderHobbyList = () => {
		return hobbyDropdown.map((Hobby) => {
			return <Picker.Item label={Hobby.name} value={Hobby.id} key={Hobby.id} />;
		});
	};

	const renderGenderList = () => {
		return genderDropdown.map((Gender) => {
			return <Picker.Item label={Gender.name} value={Gender.id} key={Gender.id} />;
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
		let response =  await ProfileService.changeProfileDetails(alcohol, job, height, weight, 
			orientation, education, religion, children, cigarette, eyeColor);
		console.log('response ', response);
		console.log(alcohol+" - "+job+" - "+height+" - "+weight+" - "+orientation+" - "+
		education+" - "+religion+" - "+children+" - "+cigarette+" - "+eyeColor)
		if (response == 200) {
			alert('Zmieniono szczegóły profilu');
		} else {
			alert('Nieudało się zmienić szczegółów opisu');
		}
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

						<Picker style={styles.pickerStyle} selectedValue={alcohol} onValueChange={(itemValue) => {setAlcohol(itemValue)
						console.log(itemValue)}}>
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
						<MaterialCommunityIcons name='human-male-height-variant' size={24} color='black' />
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
					<Button type='submit' title='submit' onPress={() => changeProfileDetails()} mode='contained'>
						<Entypo name='save' size={25} color='rgba(250,250,250,1)' />
						<Text style={{ textAlignVertical: 'center', textAlign: 'center', fontSize: 25 }}>Zapisz</Text>
					</Button>
				</View>
			</ScrollView>
			<Menu profile={true} />
		</View>
	);
};
export default EditInfoScreen;
