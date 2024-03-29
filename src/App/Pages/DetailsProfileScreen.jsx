import { MaterialIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Carousel } from 'react-native-ui-lib';
import ProfileService from '../../service/ProfileService';
import { CARD } from '../../utils/constants';
import LoaderElements from '../Components/LoaderElements';
import BackNavigation from '../Controls/BackNavigation';
import HobbyButton from '../Controls/HobbyButton';
import Menu from '../Controls/Menu';
import RelationButton from '../Controls/RelationButton';

const DetailsProfileScreen = (props) => {
	const goBack = () => props.navigation.goBack();
	const goEditPhoto = () => props.navigation.navigate('EditPhotoScreen');
	const goEditDescription = () => props.navigation.navigate('EditDescriptionScreen');
	const goEditInfo = () => props.navigation.navigate('EditInfoScreen');

	const goEditHobby = () => props.navigation.navigate('EditHobbyScreen');
	const goEditSearching = () => props.navigation.navigate('EditRelationshipScreen');
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

	const [age, setAge] = useState('');
	const [city, setCity] = useState('');

	const [hobby, setHobby] = useState([]);
	const [relationship, setRelationship] = useState([]);
	const [gallery, setGallery] = useState([]);

	const [returnDetails, setReturnDetails] = useState(false);
	const [returnHobby, setReturnHobby] = useState(false);
	const [returnRelationship, setReturnRelationship] = useState(false);
	const [returnImages, setReturnImages] = useState(false);

	useEffect(() => {
		async function fetchDetailsProfile(profileId) {
			setReturnDetails(false);
			let response = await ProfileService.getProfileDetails(profileId);
			if (response.status === 200) {
				let data = response.data;
				setDescription(data.description);
				setAlcohol(data.alcohol);
				setCigarette(data.cigarettes);
				setChildren(data.children);
				setReligion(data.religious);
				setEducation(data.education);
				setOrientation(data.orientation);
				setWeight(data.weight);
				setHeight(data.height);
				setEyeColor(data.eyeColor);
				setJob(data.job);
				setGender(data.gender);
				setName(data.name);

				setAge(data.age);
				setCity(data.city);
				setReturnDetails(true);
			} 
		}
		async function fetchProfileHobby(profileId) {
			setReturnHobby(false);
			let response = await ProfileService.getProfileHobby(profileId);
			if (response.status == 200) {
				setHobby(response.data);
				setReturnHobby(true);
			}
		}
		async function fetchProfileRelationship(profileId) {
			setReturnRelationship(false);
			let response = await ProfileService.getProfileRelationship(profileId);
			if (response.status == 200) {
				setRelationship(response.data);
				setReturnRelationship(true);
			}
		}
		const willFocusSubscription = props.navigation.addListener('focus', async () => {
			let isLoggedUser = props.route.params.myProfile;
			let profileId = isLoggedUser ? await SecureStore.getItemAsync('profileId') : props.route.params.profileUser.profileId;
			setHobby([]);
			setRelationship([]);
			fetchDetailsProfile(profileId);
			fetchProfileHobby(profileId);
			fetchProfileRelationship(profileId);
			fetchImages(profileId);
		});

		return willFocusSubscription;
	}, [props.navigation, props.route.params.myProfile]);

	async function fetchImages(profileId) {
		setReturnImages(false);
		let responseImage = await ProfileService.getProfileImage(profileId);
		if (responseImage.status == 200) {
			setGallery(responseImage.data);
			setReturnImages(true);
		}
	}

	return (
		<View style={styles.container}>
			<ScrollView style={props.route.params.chat? [styles.scrollView] : [styles.scrollView, {marginBottom: 50}]}>
				<View style={styles.scrollContainer}>
					{props.route.params.myProfile ? null : <BackNavigation goBack={goBack} />}

					{returnImages ? (
						<>
							{props.route.params.myProfile ? (
								<TouchableOpacity onPress={goEditPhoto} style={[styles.buttonEdit, styles.buttonEditPhoto]}>
									<MaterialIcons name='edit' size={40} color='rgba(250,250,250,1)' />
								</TouchableOpacity>
							) : null}

							{gallery.length > 0 ? (
								<>
									{gallery.length == 1 ? (
										<Image source={{ uri: gallery[0].linkImgur }} style={styles.image} />
									) : (
										<Carousel
											containerStyle={{
												width: '100%',
											}}
											loop
											pageControlProps={{
												size: 10,
												containerStyle: styles.loopCarousel,
											}}
											pageControlPosition={Carousel.pageControlPositions.OVER}
											animated
											//showCounter
										>
											{gallery.map((item, i) => {
												return <Image source={{ uri: item.linkImgur }} style={styles.image} key={item.idImgur} />;
											})}
										</Carousel>
									)}
								</>
							) : (
								<Image source={require('../../Images/default.jpg')} style={styles.image} />
							)}
						</>
					) : (
						<LoaderElements />
					)}

					<View style={styles.sectionInfo}>
						{returnDetails ? (
							<>
								{props.route.params.myProfile ? (
									<TouchableOpacity onPress={goEditDescription} style={styles.buttonEditProfile}>
										<MaterialIcons name='edit' size={30} color='rgba(0,0,0,1)' />
									</TouchableOpacity>
								) : null}
								<Text style={styles.name}>
									{name},{age}
								</Text>
								{/* <Text style={styles.localization}>
									<Entypo name='location-pin' size={25} color='black' /> 88 km stąd
								</Text> */}
								<Text style={styles.description}>{description}</Text>
							</>
						) : (
							<LoaderElements />
						)}
					</View>

					<View style={styles.sectionInfo}>
						<Text style={styles.textHeader}>O mnie</Text>

						{returnDetails ? (
							<>
								{props.route.params.myProfile ? (
									<TouchableOpacity onPress={goEditInfo} style={styles.buttonEditProfile}>
										<MaterialIcons name='edit' size={30} color='rgba(0,0,0,1)' />
									</TouchableOpacity>
								) : null}
								<View style={styles.personalInfo}>
									<View style={styles.infoGroup}>
										<Text style={styles.infoHeader}>Imię</Text>
										<Text style={styles.info}>{name}</Text>
									</View>
									<View style={styles.infoGroup}>
										<Text style={styles.infoHeader}>Miasto</Text>
										<Text style={styles.info}>{city}</Text>
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
							</>
						) : (
							<LoaderElements />
						)}
					</View>

					<View style={styles.sectionInfo}>
						<Text style={styles.textHeader}>Zainteresowania</Text>

						{returnHobby ? (
							<>
								{props.route.params.myProfile ? (
									<TouchableOpacity onPress={goEditHobby} style={styles.buttonEditProfile}>
										<MaterialIcons name='edit' size={30} color='rgba(0,0,0,1)' />
									</TouchableOpacity>
								) : null}
								<View style={styles.hobbyContainer}>
									{hobby.map((hobby, index) => {
										return <HobbyButton text={hobby.name} edit={false} status={hobby.decision} key={index} />;
									})}
								</View>
							</>
						) : (
							<LoaderElements />
						)}
					</View>

					<View style={styles.sectionInfo}>
						<Text style={styles.textHeader}>Szukam ...</Text>
						{returnRelationship ? (
							<>
								{props.route.params.myProfile ? (
									<TouchableOpacity onPress={goEditSearching} style={styles.buttonEditProfile}>
										<MaterialIcons name='edit' size={30} color='rgba(0,0,0,1)' />
									</TouchableOpacity>
								) : null}
								<View style={styles.hobbyContainer}>
									{relationship.map((relationship, ind) => {
									
										return <RelationButton text={relationship.name} edit={false} type={relationship.decision} index={ind} key={relationship.relationshipId} />;
									})}
								</View>
							</>
						) : (
							<LoaderElements />
						)}
					</View>
				</View>
			</ScrollView>
			{props.route.params.chat ? <></> : <Menu swipe={props.route.params.myProfile ? false : true} profile={props.route.params.myProfile ? true : false} {...props} />}
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
		maxWidth: '55%',
		textAlign: 'right',
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
		//marginBottom: 50,
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
	buttonEditPhoto: {
		backgroundColor: 'rgba(104, 104, 104, 0.47)',
		borderRadius: 30,
		padding: 10,
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
		paddingLeft: 20,
		paddingRight: 20,
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
