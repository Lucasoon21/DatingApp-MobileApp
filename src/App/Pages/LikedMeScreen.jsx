import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import DecisionService from '../../service/DecisionService';
import SwipeService from '../../service/SwipeService';
import { CARD } from '../../utils/constants';
import CardUser from '../Components/CardUser';
import LoaderElements from '../Components/LoaderElements';
import Menu from '../Controls/Menu';
import EmptyLikedMe from './EmptyLikedMe';

//const SwipeScreen = (props) => {
const LikedMeScreen = (props) => {
	const [persons, setPersons] = useState([]);
	const swipeRef = useRef(null);
	const [usersIsReturned, setUsersInReturned] = useState(false);
	const [currIndex, setCurrIndex] = useState(0);

	useEffect(() => {
		setCurrIndex(0);
		fetchProfiles();
	}, [persons.length]);

	useEffect(() => {
		if (persons.length > 0) {
			setUsersInReturned(true);
		} else {
			setCurrIndex(0);
			setUsersInReturned(false);
			fetchProfiles();
		}
	}, [persons.length]);

	async function fetchProfiles() {
		let response = await SwipeService.getLikesForMyProfile();
		if (response.status == 200) {
			setPersons(response.data);
			setUsersInReturned(true);
		}
	}

	const profile = () => {
		console.log('curr index', currIndex);
		props.navigation.navigate('DetailsForeignProfileScreen', {
			myProfile: false,
			profileUser: persons[currIndex],
		});
	};

	const swipeLeft = async (index) => {
		setCurrIndex(index + 1);
		console.log('left ', index);
		if (!persons[index]) return;
		const userSwiped = persons[index];
		console.log('user swiped', userSwiped);
		let response = await DecisionService.swipeDecision({
			decision: 0,
			selectProfileUserId: userSwiped.profileId,
		});
	};

	const swipeRight = async (index) => {
		setCurrIndex(index + 1);
		console.log('right ', index);
		if (!persons[index]) return;
		const userSwiped = persons[index];
		//console.log('user swiped', userSwiped);
		let response = await DecisionService.swipeDecision({
			decision: 1,
			selectProfileUserId: userSwiped.profileId,
		});
		console.log('rs', response.data);
		if (response.status == 200 && response.data != '') {
			console.log('Match!', response.data);
			props.navigation.navigate('NewMatchScreen', { name: response.data.name, profileId: response.data.profileId, image: response.data.profileImageDTO });
		}
	};
	const renderCards = () => {
		if (usersIsReturned === true) {
			return (
				<Swiper
					ref={swipeRef}
					cards={persons}
					backgroundColor='rgba(220,220,220,1)'
					swipeAnimationDuration={200}
					renderCard={(card) => (card ? <CardUser profile={card ?? null} name={card.name ?? ''} images={card.image ?? ''} age={card.age ?? ''} /> : <EmptyLikedMe />)}
					onSwiped={(cardIndex) => {
						console.log('CARD INDEX', cardIndex);
					}}
					onSwipedAll={() => {
						setCurrIndex(0);
						console.log('onSwipedAll');
						setPersons([]);
						fetchProfiles();
					}}
					onSwipedLeft={(cardIndex) => {
						swipeLeft(cardIndex);
						console.log('left', cardIndex);
					}}
					onSwipedRight={(cardIndex) => {
						swipeRight(cardIndex);
						console.log('right', cardIndex);
					}}
					cardVerticalMargin={0}
					cardHorizontalMargin={30}
					cardStyle={{ margin: 0 }}
					cardIndex={0}
					verticalSwipe={false}
					animateCardOpacity
					stackSize={1}
					overlayLabels={{
						left: {
							title: 'NOPE',
							style: {
								label: {
									textAlign: 'right',
									color: 'red',
								},
							},
						},
						right: {
							title: 'LIKE',
							style: {
								label: {
									textAlign: 'left',
									color: 'green',
								},
							},
						},
					}}></Swiper>
			);
		} else {
			return (
				<View style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<LoaderElements />
				</View>
			);
		}
	};

	return (
		<>
			<View style={styles.container}>
				{renderCards()}
				<View style={styles.actionButton}>
					<TouchableOpacity style={styles.button} onPress={() => swipeRef.current.swipeLeft()}>
						<AntDesign name='dislike2' size={40} color='red' />
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={profile}>
						<Ionicons name='md-person-outline' size={40} color='black' />
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={() => swipeRef.current.swipeRight()}>
						<AntDesign name='like2' size={40} color='green' />
					</TouchableOpacity>
				</View>
			</View>
			<Menu search={true} {...props} />
		</>
	);
};
export default LikedMeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		padding: 30,
		backgroundColor: 'rgba(220,220,220,1)',
	},
	actionButton: {
		position: 'absolute',
		backgroundColor: 'rgba(255,255,255,1)',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		bottom: 70,
		borderWidth: 2,
		borderStyle: 'solid',
		borderColor: 'rgba(220,220,220,1)',
		borderLeftWidth: 0,

		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,

		elevation: 10,
	},
	button: {
		flex: 1,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderLeftWidth: 2,
		borderColor: 'rgba(220,220,220,1)',
		padding: 10,
	},
	image: {
		maxWidth: CARD.WIDTH,
		maxHeight: CARD.HEIGHT,
		width: CARD.WIDTH,
		height: CARD.HEIGHT,
		borderRadius: 1,
		// borderRadius: CARD.BORDER_RADIUS,

		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},

	card: {
		flex: 1,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: '#E8E8E8',
		justifyContent: 'center',
		backgroundColor: 'white',
	},

	text: {
		textAlign: 'center',
		fontSize: 50,
		backgroundColor: 'transparent',
	},
});
