import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import Menu from '../Controls/Menu';
import { CARD } from '../../utils/constants';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import HobbyButton from '../Controls/HobbyButton';
import RelationButton from '../Controls/RelationButton';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ProfileService from '../../service/ProfileService';

const DetailsProfileScreen = (props) => {
	 const goBack = () => props.navigation.goBack();
	// const goEditPhoto = () => props.navigation.navigate("EditPhotoScreen")
	const goEditDescription = () => props.navigation.navigate('EditDescriptionScreen');
	const goEditInfo = () => props.navigation.navigate('EditInfoScreen');

	const goEditHobby = () => props.navigation.navigate('EditHobbyScreen');
	 const goEditSearching = () => props.navigation.navigate("EditRelationshipScreen")
	const [description, setDescription] = useState('');
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
	const [gender, setGender] = useState('');
	const [name, setName] = useState('');
	const [zodiac, setZodiac] = useState('');

	const [hobby, setHobby] = useState([]);
	const [relationship, setRelationship] = useState([]);

	useEffect(() => {
		async function fetchDetailsProfile() {
			let response = await ProfileService.getProfileDetails();
			if (response.status === 200) {
				let data = response.data;
			//	console.log('ok', data.alcohol);
				setDescription(data.description);
				setAlcohol(data.alcohol.name);
				setCigarette(data.cigarettes.name);
				setChildren(data.children.name);
				setReligion(data.religious.name);
				setEducation(data.education.name);
				setOrientation(data.orientation.name);
				setWeight(data.weight);
				setHeight(data.height);
				setEyeColor(data.eyeColor.name);
				setJob(data.job);
				setGender(data.gender.name);
				setName(data.name);
				setZodiac(data.zodiac.name);
			} else {
				console.log('nie ok');
			}
			//console.log(response);
		}
		async function fetchProfileHobby() {
			let response = await ProfileService.getProfileHobby();
			setHobby(response.data);
		}
		async function fetchProfileRelationship() {
			let response = await ProfileService.getProfileRelationship();
			setRelationship(response.data);
		}
		const willFocusSubscription = props.navigation.addListener('focus', () => {
			setHobby([])
			setRelationship([]);
			fetchDetailsProfile();
			fetchProfileHobby();
			fetchProfileRelationship();
		})
		
		return willFocusSubscription;

	}, [props.navigation]);

	return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollView}>
				<View style={styles.scrollContainer}>
					{props.route.params.myProfile ? null : (
                        <TouchableOpacity onPress={goBack} style={styles.buttonBack}>
                            <Ionicons name="arrow-back" size={40} color="rgba(250,250,250,1)" />
                        </TouchableOpacity>
                    )} 
                  {/*  {props.route.params.myProfile ? (
                        <TouchableOpacity onPress={goEditPhoto} style={styles.buttonEdit}>
                            <MaterialIcons name="edit" size={40} color="rgba(250,250,250,1)" />
                        </TouchableOpacity>
                    ) : null} */}

					<Image source={require('../../Images/person1.jpg')} style={styles.image} />

					<View style={styles.sectionInfo}>
						{props.route.params.myProfile ? (
							<TouchableOpacity onPress={goEditDescription} style={styles.buttonEditProfile}>
								<MaterialIcons name='edit' size={30} color='rgba(0,0,0,1)' />
							</TouchableOpacity>
						) : null}
						<Text style={styles.name}>{name}, 22</Text>
						<Text style={styles.localization}>
							<Entypo name='location-pin' size={25} color='black' /> 88 km stąd
						</Text>
						<Text style={styles.description}>{description}</Text>
					</View>
					<View style={styles.sectionInfo}>
						{props.route.params.myProfile ? (
							<TouchableOpacity onPress={goEditInfo} style={styles.buttonEditProfile}>
								<MaterialIcons name='edit' size={30} color='rgba(0,0,0,1)' />
							</TouchableOpacity>
						) : null}
						<Text style={styles.textHeader}>O mnie</Text>
						<View style={styles.personalInfo}>
							<View style={styles.infoGroup}>
								<Text style={styles.infoHeader}>Imię</Text>
								<Text style={styles.info}>{name}</Text>
							</View>

							<View style={styles.infoGroup}>
								<Text style={styles.infoHeader}>Zawód</Text>
								<Text style={styles.info}>{job}</Text>
							</View>

							<View style={styles.infoGroup}>
								<Text style={styles.infoHeader}>Wzrost</Text>
								<Text style={styles.info}>{height}</Text>
							</View>

							<View style={styles.infoGroup}>
								<Text style={styles.infoHeader}>Waga</Text>
								<Text style={styles.info}>{weight}</Text>
							</View>

							<View style={styles.infoGroup}>
								<Text style={styles.infoHeader}>Płeć</Text>
								<Text style={styles.info}>{gender}</Text>
							</View>

							<View style={styles.infoGroup}>
								<Text style={styles.infoHeader}>Orientacja</Text>
								<Text style={styles.info}>{orientation}</Text>
							</View>

							<View style={styles.infoGroup}>
								<Text style={styles.infoHeader}>Znak zodiaku</Text>
								<Text style={styles.info}>{zodiac}</Text>
							</View>

							<View style={styles.infoGroup}>
								<Text style={styles.infoHeader}>Wykszatałcenie</Text>
								<Text style={styles.info}>{education}</Text>
							</View>

							<View style={styles.infoGroup}>
								<Text style={styles.infoHeader}>Religia</Text>
								<Text style={styles.info}>{religion}</Text>
							</View>

							<View style={styles.infoGroup}>
								<Text style={styles.infoHeader}>Dzieci</Text>
								<Text style={styles.info}>{children}</Text>
							</View>

							<View style={styles.infoGroup}>
								<Text style={styles.infoHeader}>Alkohol</Text>
								<Text style={styles.info}>{alcohol}</Text>
							</View>

							<View style={styles.infoGroup}>
								<Text style={styles.infoHeader}>Papierosy</Text>
								<Text style={styles.info}>{cigarette}</Text>
							</View>
							<View style={styles.infoGroup}>
								<Text style={styles.infoHeader}>Kolor oczu</Text>
								<Text style={styles.info}>{eyeColor}</Text>
							</View>
						</View>
					</View>

					<View style={styles.sectionInfo}>
						{props.route.params.myProfile ? (
							<TouchableOpacity onPress={goEditHobby} style={styles.buttonEditProfile}>
								<MaterialIcons name='edit' size={30} color='rgba(0,0,0,1)' />
							</TouchableOpacity>
						) : null}
						<Text style={styles.textHeader}>Zainteresowania</Text>
						<View style={styles.hobbyContainer}>
{                        hobby.map((hobby, index) => {
                            return <HobbyButton text={hobby.name} edit={false} status={hobby.decision} key={index}/>;
                        })}
						</View>
					</View>

					<View style={styles.sectionInfo}>
						{props.route.params.myProfile ? (
                            <TouchableOpacity onPress={goEditSearching} style={styles.buttonEditProfile}>
                                <MaterialIcons name="edit" size={30} color="rgba(0,0,0,1)" />
                            </TouchableOpacity>
                        ) : null} 
						<Text style={styles.textHeader}>Szukam ...</Text>
						<View style={styles.hobbyContainer}>
						{relationship.map((relationship, ind) => {
						//console.log(hobby)
						return <RelationButton text={relationship.name} edit={false} type={relationship.decision} index={ind} key={relationship.relationshipId} />;
					})}
 
							{/* <RelationButton text='Związku' type={0} />
						
							<RelationButton text='FWB' type={1} />
							
							<RelationButton text='Przyjaźni' type={2} />
							
							<RelationButton text='Nie wiem' type={0} />
							<RelationButton text='Rozmowy' type={0} />
							<RelationButton text='ONS' type={1} /> */}
						</View>
					</View>
				</View>
			</ScrollView>
			<Menu swipe={props.route.params.myProfile ? false : true} profile={props.route.params.myProfile ? true : false} />
		</View>
	);
};
export default DetailsProfileScreen;

const styles = StyleSheet.create({
	infoGroup: {
		paddingBottom: 5,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	infoHeader: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	info: {
		fontSize: 18,
	},

	container: {
		flex: 1,
		alignItems: 'center',
		paddingTop: StatusBar.currentHeight,
		backgroundColor: 'rgba(220,220,220,1)',
		padding: 0,
	},
	scrollView: {
		width: '100%',
		marginBottom: 50,
	},
	scrollContainer: {
		display: 'flex',
		alignItems: 'center',
		paddingBottom: 30,
	},
	buttonBack: {
		position: 'absolute',
		left: 10,
		top: 10,
		zIndex: 30,
	},
	buttonEditProfile: {
		position: 'absolute',
		right: 30,
		top: 35,
		zIndex: 30,
	},
	buttonEdit: {
		position: 'absolute',
		right: 20,
		top: 10,
		zIndex: 30,
		// backgroundColor: 'rgba(104, 104, 104, 0.67)',
		// height: 60,
		// width: 60,
		// display: 'flex',
		// justifyContent: 'center',
		// alignItems: 'center',
		// borderRadius: 50,
		// shadowColor: "#000",
		// shadowOffset: {
		//     width: 0,
		//     height: 12,
		// },
		// shadowOpacity: 0.58,
		// shadowRadius: 16.00,

		// elevation: 24,
	},

	image: {
		maxWidth: '100%',
		maxHeight: CARD.HEIGHT,
		width: '100%',
		height: CARD.HEIGHT,
		borderRadius: 1,
		// borderRadius: CARD.BORDER_RADIUS,
		backgroundColor: 'red',
		padding: 0,
		margin: 0,
	},
	sectionInfo: {
		backgroundColor: 'rgba(250,250,250,1)',
		width: '90%',
		paddingTop: 30,
		paddingBottom: 30,
		paddingLeft: 30,
		paddingRight: 30,
		marginTop: 20,
		borderRadius: 20,
	},
	name: {
		fontSize: 35,
		fontWeight: 'bold',
		textTransform: 'uppercase',
	},
	localization: {
		fontSize: 25,
		marginBottom: 10,
	},
	description: {
		fontSize: 17,
	},
	textHeader: {
		fontSize: 30,
		fontWeight: 'bold',
	},
	hobbyContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		alignSelf: 'flex-end',
	},
});

{
	/* <View style={styles.header}>
                <TouchableOpacity onPress={goBack}>
                    <Ionicons name="arrow-back" size={40} color="rgba(50,50,50,1)" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Michał, 22</Text>
                <Text style={styles.headerText}>88 km stąd</Text>

            </View> */
}
