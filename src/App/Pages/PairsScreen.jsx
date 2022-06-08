import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Linking, Platform, ScrollView, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import Menu from '../Controls/Menu';
import DetailsProfileScreen from './DetailsProfileScreen';
import { contact, styles } from '../Styles/ChatStyle';
import PairComponent from '../Components/PairComponent';
import MatchService from '../../service/MatchService';
import { Assets, Colors, Typography, View, Drawer, Text, Avatar, Badge } from 'react-native-ui-lib';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import EmptyPairs from './EmptyPairs';
import LoaderElements from '../Components/LoaderElements';
import { Button, TextInput } from 'react-native-paper';

const PairsScreen = (props) => {
	const goPairs = () => props.navigation.navigate('PairsScreen');
	const goConversation = () => props.navigation.navigate('ConversationScreen');

	const [pairs, setPairs] = useState([]);
	const [returnPairs, setReturnPairs] = useState(false);
	useEffect(() => {
		fetchMatches();
	}, []);

	const fetchMatches = async () => {
		setReturnPairs(false);
		let response = await MatchService.getAllMatch();

		if (response.data != null) {
			setPairs(response.data);
		}
		setReturnPairs(true);
	};
	const renderLeftActions = (item) => {
		const removePair = async () => {
			let response = await MatchService.deleteMatch(item.profileId);
			if (response.status == 200) {
				fetchMatches();
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

				{returnPairs ? (
					<>
						{pairs.length > 0 ? (
							<>
								<TouchableOpacity style={styles.containerContact} onPress={() => fetchMatches()}>
									<ScrollView style={styles.containerContact}>
										{pairs.map((pair, i) => {
											return (
												<View style={styles.pairComponent} key={i}>
													<Swipeable renderLeftActions={() => renderLeftActions(pair)}>
														<PairComponent navigation={props.navigation} profile={pair} />
													</Swipeable>
												</View>
											);
										})}
									</ScrollView>
								</TouchableOpacity>
							</>
						) : (
							<>
								<Button onPress={() => fetchMatches()}>
									<Text>Odśwież</Text>
								</Button>
								<EmptyPairs />
							</>
						)}
					</>
				) : (
					<View style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<LoaderElements />
					</View>
				)}

				<Menu chat={true} {...props} />
			</View>
		</GestureHandlerRootView>
	);
};
export default PairsScreen;
