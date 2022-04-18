import React, { useState, useRef, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, Animated, PanResponder, TouchableOpacity, Button } from 'react-native';
import { Feather, Entypo, MaterialIcons } from '@expo/vector-icons';
import Menu from '../Controls/Menu';
import CardUser from '../Components/CardUser';
import { person as tablicaOsob } from '../Assets/ProfileData';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { CARD, ACTION_OFFSET } from '../../utils/constants';
import { Fontisto } from '@expo/vector-icons';
import SwipeService from '../../service/SwipeService';
import DecisionService from '../../service/DecisionService';
import Swiper from 'react-native-deck-swiper';
import { SafeAreaView } from 'react-native-web';

//const SwipeScreen = (props) => {
const SwipeScreen = (props) => {
	const [persons, setPersons] = useState([]);
	const [cards, setCards] = useState(['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']);
	const swipe = useRef(new Animated.ValueXY()).current;
	const tiltSign = useRef(new Animated.Value(1)).current;
	const swipeRef = useRef(null);
	const [usersIsReturned, setUsersInReturned] = useState(false);
	const [currIndex, setCurrIndex] = useState(0);
	async function fetchProfiles() {
		let response = await SwipeService.getAllProfile();
		if (response.status == 200) {
			//	console.log(response.data);
			setPersons(response.data);

			//console.log(response.data);
		}
	}

	useEffect(() => {
		setCurrIndex(0)
		fetchProfiles();

		/*//console.log('Aktualnie na początku', persons[0]);
		const willFocusSubscription = props.navigation.addListener('focus', () => {
			if (!persons.length) {
				setPersons([]);
			}
			setPersons([]);
			fetchProfiles();
		});
		return willFocusSubscription;*/
	}, [persons.length]);

	useEffect(() => {
		if (persons.length > 0) {
			setUsersInReturned(true);
		} else {
			setCurrIndex(0)
			setUsersInReturned(false);
			fetchProfiles();
		}
	}, [persons.length]);
	/*
						return <CardUser profile={card ?? null} name={card.name ?? ''} images={card.image ?? ''} age={card.age ?? ''} />;
					*/
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
		console.log('user swiped', userSwiped);
		let response = await DecisionService.swipeDecision({
			decision: 1,
			selectProfileUserId: userSwiped.profileId,
		});
	};
	const renderCards = () => {
		if (usersIsReturned === true) {
			return (
				<Swiper
					ref={swipeRef}
					cards={persons}
					renderCard={(card) => (card ? <CardUser profile={card ?? null} name={card.name ?? ''} images={card.image ?? ''} age={card.age ?? ''} /> : <Text>Null</Text>)}
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
					//overlayLabelStyle={{padding: 0}}
					cardVerticalMargin={0}
					cardHorizontalMargin={30}
					cardStyle={{ margin: 0 }}
					cardIndex={0}
					backgroundColor={'#4FD0E9'}
					verticalSwipe={false}
					animateCardOpacity
					stackSize={3}
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
					}}>
					{/* <Button 
		onPress={() => {
			console.log('oulala');
		}}
		title='Press me'>
		You can press me
	</Button> */}
				</Swiper>
			);
		} else {
			return <Text>Loading</Text>;
		}
	};

	const panResponder = PanResponder.create({
		onMoveShouldSetPanResponder: () => true,
		onPanResponderMove: (_, { dx, dy, y0 }) => {
			swipe.setValue({ x: dx, y: dy });
			tiltSign.setValue(y0 > CARD.HEIGHT / 2 ? 1 : -1);
		},
		onPanResponderRelease: (_, { dx, dy }) => {
			const direction = Math.sign(dx);
			const isActionActive = Math.abs(dx) > ACTION_OFFSET;

			if (isActionActive) {
				Animated.timing(swipe, {
					duration: 200,
					toValue: {
						x: direction * CARD.OUT_OF_SCREEN,
						y: dy,
					},
					useNativeDriver: true,
				}).start(removeTopCard);
			} else {
				Animated.spring(swipe, {
					toValue: {
						x: 0,
						y: 0,
					},
					useNativeDriver: true,
					friction: 5,
				}).start();
			}
		},
	});

	const removeTopCard = useCallback(() => {
		setPersons((prevState) => prevState.slice(1));
		swipe.setValue({ x: 0, y: 0 });
	}, [swipe]);

	/*
	const handleChoice = useCallback(
		(direction) => {
			Animated.timing(swipe.x, {
				toValue: direction * CARD.OUT_OF_SCREEN,
				duration: 400,
				useNativeDriver: true,
			}).start(removeTopCard);

			swipeDecision(direction);
		},
		[removeTopCard, swipe.x],
	);

	const swipeDecision = async (decision) => {
		console.log(decision);
		console.log('person ', persons[0]);
		let response = await DecisionService.swipeDecision({
			selectProfileUserId: persons[0].profileId,
			decision: decision,
		});
	};
*/
	return (
		<>
			<View style={styles.container}>
				{/* {persons
					.map((person, index) => {
						const isFirst = index === 0;
						// const panHandlers = isFirst ? panResponder.panHandlers : {};

						const dragHandlers = isFirst ? panResponder.panHandlers : {};
						return <CardUser key={index} profile={person} name={person.name} images={person.image} age={person.age} isFirst={isFirst} swipe={swipe} tiltSign={tiltSign} {...dragHandlers} />;
					})
					.reverse()} */}
				{/* .reverse()} */}

				{/* <Swiper
					cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
					containerStyle={{ width: 100, height: 200, backgroundColor: 'red', marginTop: 50, marginLeft: 100 }}
					renderCard={(card) => {
						return (
							<View style={[styles.card, { backgroundColor: 'blue' }]}>
								<Text>Elo</Text>
								<Image source={require('../../Images/default.jpg')} style={styles.image} />
							</View>
						);
					}}
				/> */}

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
			<Menu swipe={true} {...props} />
		</>
	);
};
export default SwipeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		padding: 30,
		backgroundColor: '#F5FCFF',
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
	/*cardsContainer: {
		padding: 0,
		margin: 0,
		width:'100%',
		height: '100%',
		top: 0,
	}*/
});

{
	/*<InteractButton />
                        <Octicons name="person" size={40} color="black" />
                        <MaterialIcons name="person-outline" size={40} color="black" />
                        <Ionicons name="person-circle-outline" size={40} color="black" />
                        <MaterialIcons name="person-outline" size={45} color="black" />
                    */
}
{
	/*<InteractButton />
                        <AntDesign name="dislike1" size={40} color="black" />
                        */
}
{
	/*<InteractButton />
                        <AntDesign name="like1" size={40} color="black" />
                        <SimpleLineIcons name="like" size={40} color="black" />
                        */
}
