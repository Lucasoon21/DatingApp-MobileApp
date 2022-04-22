import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Linking, Platform, ScrollView, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import Menu from '../Controls/Menu';
import DetailsProfileScreen from './DetailsProfileScreen';
import { contact, styles } from '../Styles/ChatStyle';
import MenuTop from '../Unused/MenuTop';
import PairComponent from '../Components/PairComponent';
import MatchService from '../../service/MatchService';
import { Assets, Colors, Typography, View, Drawer, Text, Button, Avatar, Badge } from 'react-native-ui-lib';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const PairsScreen = (props) => {
	const goPairs = () => props.navigation.navigate('PairsScreen');
	const goConversation = () => props.navigation.navigate('ConversationScreen');
	const goChat = () => props.navigation.navigate('ChatScreen');
	const [loading, setLoading] = useState(true);

	const [pairs, setPairs] = useState([]);
	const [returnPairs, setReturnPairs] = useState(false);
	useEffect(() => {
		fetchMatches();
	}, []);

	const fetchMatches = async () => {
		setReturnPairs(false);
		let response = await MatchService.getAllMatch();
		console.log(response.data);
		if (response.data != null) {
			setPairs(response.data);
			setReturnPairs(true);
		}
	};
	const renderLeftActions = (item) => {
		const removePair = async () => {
			console.log('1', item);
			let response = await MatchService.deleteMatch(item.profileId);
			if (response.status == 200) {
				console.log('usunięto');
				fetchMatches();
			} else {
				console.log('bład');
			}
		};
		return (
			<TouchableOpacity
				onPress={() => removePair()}
				style={{
					backgroundColor: '#ff0000',
					justifyContent: 'center',
					alignItems: 'flex-end',
				}}>
				<Text
					style={{
						color: '#1b1a17',
						paddingHorizontal: 10,
						fontWeight: '600',
						paddingHorizontal: 30,
						paddingVertical: 20,
					}}>
					Usuń parę
				</Text>
			</TouchableOpacity>
		);
	};

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<View style={styles.container}>
				<View style={styles.menuTop}>
					<TouchableOpacity onPress={goPairs} style={[styles.xd, styles.activeTopMenu]}>
						<Text style={styles.menuTopElement}>Pary</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={goConversation} style={styles.xd}>
						<Text style={styles.menuTopElement}>Rozmowy</Text>
					</TouchableOpacity>
				</View>

				<ScrollView style={styles.containerContact}>
					{returnPairs ? (
						<>
							{pairs.length > 0 ? (
								<>
									{pairs.map((pair, i) => {
										return (
											<View style={styles.pairComponent} key={i}>
												<Swipeable renderLeftActions={() => renderLeftActions(pair)}>
													<PairComponent navigation={props.navigation} profile={pair} />
												</Swipeable>
											</View>
										);
									})}
								</>
							) : ( 
								<>
									<Text>Brak par</Text>
								</>
							)}
						</>
					) : (
						<>
							<ActivityIndicator size='large' color='#0000ff' />
						</>
					)}
					{/* <PairComponent navigation={props.navigation}/>
                <PairComponent navigation={props.navigation}/>
                <PairComponent navigation={props.navigation}/>
                <PairComponent navigation={props.navigation}/>
                <PairComponent navigation={props.navigation}/> */}
				</ScrollView>

				<Menu chat={true} {...props} />
			</View>
		</GestureHandlerRootView>
	);
};
export default PairsScreen;
const stylesSwipe = StyleSheet.create({
	leftAction: {
		backgroundColor: 'red',
	},
});
