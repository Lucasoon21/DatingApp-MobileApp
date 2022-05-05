import React, { Component } from 'react';
import AuthenticationScreen from './src/App/Pages/AuthenticationScreen';
import ChatScreen from './src/App/Pages/ChatScreen';
import ConversationsScreen from './src/App/Pages/ConversationsScreen';
import DetailsProfileScreen from './src/App/Pages/DetailsProfileScreen';
import EditDescriptionScreen from './src/App/Pages/EditDescriptionScreen';
import EditHobbyScreen from './src/App/Pages/EditHobbyScreen';
import EditInfoScreen from './src/App/Pages/EditInfoScreen';
import EditPhotoScreen from './src/App/Pages/EditPhotoScreen';
import EditRelationshipScreen from './src/App/Pages/EditRelationshipScreen';
import PairsScreen from './src/App/Pages/PairsScreen';
import NewMatchScreen from './src/App/Pages/NewMatchScreen';
import SettingsScreen from './src/App/Pages/SettingsScreen';
import SwipeScreen from './src/App/Pages/SwipeScreen';
import StartLoadingScreen from './src/App/Pages/StartLoadingScreen';
import LikedMeScreen from './src/App/Pages/LikedMeScreen';
import RegisterDetailsScreen from './src/App/Pages/RegisterDetailsScreen';
import ChangePasswordScreen from './src/App/Pages/ChangePasswordScreen';
import AreUnderAgeScreen from './src/App/Pages/AreUnderAgeScreen';
import ActivateAccountScreen from './src/App/Pages/ActivateAccountScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { StyleSheet, Text, View, Image, Linking, Platform, Animated, PanResponder, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import httpService from './src/service/httpService';

export class Routes extends Component {
	state = {
		userIsLogin: false,
		isLoading: true,
	};

	async componentDidMount() {
		this.setState({
			isLoading: true,
		});
		const token = await SecureStore.getItemAsync('access_token');
		httpService.setJwt(token);
		this.setState({
			userIsLogin: token ? true : false,
			isLoading: false,
		});
	}
	async componentDidUpdate() {
		const token = await SecureStore.getItemAsync('access_token');
		this.setState({
			userIsLogin: token ? true : false,
		});
	}
	render() {
		const { Navigator, Screen, Group } = createNativeStackNavigator();
		return (
			<>
				{this.state.isLoading ? (
					<StartLoadingScreen />
				) : (
					<NavigationContainer>
						<Navigator screenOptions={{ headerShown: false }} initialRouteName={this.state.userIsLogin ? 'SwipeScreen' : 'AuthScreen'}>
							{this.state.userIsLogin == false ? (
								<>
									<Screen name='AuthScreen' component={AuthenticationScreen}></Screen>
									<Screen name='RegisterDetailsScreen' component={RegisterDetailsScreen}></Screen>
									<Screen name='AreUnderAgeScreen' component={AreUnderAgeScreen}></Screen>
									<Screen name='ActivateAccountScreen' component={ActivateAccountScreen}></Screen>
								</>
							) : (
								<>
									<Screen name='SwipeScreen' component={SwipeScreen}></Screen>
									<Screen name='ActivateAccountScreen' component={ActivateAccountScreen}></Screen>
									<Screen name='LikedMeScreen' component={LikedMeScreen}></Screen>
									<Screen name='ChatScreen' component={ChatScreen}></Screen>
									<Screen name='ConversationScreen' component={ConversationsScreen}></Screen>
									<Screen name='DetailsProfileScreen' component={DetailsProfileScreen} initialParams={{ myProfile: false }} />
									<Screen name='DetailsForeignProfileScreenn' component={DetailsProfileScreen} initialParams={{ myProfile: false }} />
									<Screen name='EditDescriptionScreen' component={EditDescriptionScreen}></Screen>
									<Screen name='EditHobbyScreen' component={EditHobbyScreen}></Screen>
									<Screen name='EditInfoScreen' component={EditInfoScreen}></Screen>
									<Screen name='EditPhotoScreen' component={EditPhotoScreen}></Screen>
									<Screen name='EditRelationshipScreen' component={EditRelationshipScreen}></Screen>
									<Screen name='PairsScreen' component={PairsScreen}></Screen>
									<Screen name='NewMatchScreen' component={NewMatchScreen}></Screen>
									<Screen name='ChangePasswordScreen' component={ChangePasswordScreen}></Screen>
									<Screen name='SettingsScreen' component={SettingsScreen}></Screen>
									<Screen name='DetailsForeignProfileScreen' component={DetailsProfileScreen}
										initialParams={{ myProfile: false }}
										screenOptions={{ presentation: 'transparentModal' }}
									/>
								</>
							)}
						</Navigator>
					</NavigationContainer>
				)}
			</>
		);
	}
}
