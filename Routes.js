import React, { Component } from 'react';
import AuthenticationScreen from './src/App/Pages/AuthenticationScreen';
import ChatScreen from './src/App/Pages/ChatScreen';
import ConversationsScreen from './src/App/Pages/ConversationsScreen';
import DetailsProfileScreen from './src/App/Pages/DetailsProfileScreen';
import EditDescriptionScreen from './src/App/Pages/EditDescriptionScreen';
import EditHobbyScreen from './src/App/Pages/EditHobbyScreen';
import EditInfoScreen from './src/App/Pages/EditInfoScreen';
import EditPhotoScreen from './src/App/Pages/EditPhotoScreen';
import EditSearchingScreen from './src/App/Pages/EditSearchingScreen';
import PairsScreen from './src/App/Pages/PairsScreen';
import SearchScreen from './src/App/Pages/SearchScreen';
import SettingsScreen from './src/App/Pages/SettingsScreen';
import SwipeScreen from './src/App/Pages/SwipeScreen';
import RegisterDetailsScreen from './src/App/Pages/RegisterDetailsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JwtManager from './src/Api/JwtManager';
import * as SecureStore from 'expo-secure-store';

class ProtectedRoute extends Component {
	render() {
		const Component = this.props.component;
		const isAuthentication = AsyncStorage.getItem('access_token');

		return isAuthentication ? <Component /> : <Redirect to={{ pathname: '/AuthScreen' }} />;
	}
}

export class Routes extends Component {
	state = {
		userIsLogin: false,
	};
	async componentDidMount() {
		const token = await SecureStore.getItemAsync('access_token');
		this.setState({
			userIsLogin: token ? true : false,
		});
		console.log('xdd token access = ', token ?? "");
	}
	async componentDidUpdate() {
		const token = await SecureStore.getItemAsync('access_token');
		this.setState({
			userIsLogin: token ? true : false,
		});
		//console.log('xdd token access = ', token ?? "");
		
	}
	render() {
		const { Navigator, Screen, Group } = createNativeStackNavigator();
		return (
			<>
				<NavigationContainer>
					{/*console.log('is login: ', this.state.userIsLogin)*/}
					<Navigator screenOptions={{ headerShown: false }} initialRouteName={this.state.userIsLogin ? 'SwipeScreen' : 'AuthScreen'}>
						{this.state.userIsLogin == false ? (
							<>
								<Screen name='AuthScreen' component={AuthenticationScreen}></Screen>
								<Screen name='RegisterDetailsScreen' component={RegisterDetailsScreen}></Screen>
							</>
						) : (
							<>
								<Screen name='SwipeScreen' component={SwipeScreen}></Screen>
								<Screen name='ChatScreen' component={ChatScreen}></Screen>
								<Screen name='ConversationScreen' component={ConversationsScreen}></Screen>
								<Screen name='DetailsProfileScreen' component={DetailsProfileScreen} initialParams={{ myProfile: false }} />
								<Screen name='EditDescriptionScreen' component={EditDescriptionScreen}></Screen>
								<Screen name='EditHobbyScreen' component={EditHobbyScreen}></Screen>
								<Screen name='EditInfoScreen' component={EditInfoScreen}></Screen>
								<Screen name='EditPhotoScreen' component={EditPhotoScreen}></Screen>
								<Screen name='EditSearchingScreen' component={EditSearchingScreen}></Screen>
								<Screen name='PairsScreen' component={PairsScreen}></Screen>
								<Screen name='SearchScreen' component={SearchScreen}></Screen>
								<Screen name='SettingsScreen' component={SettingsScreen}></Screen>
							</>
						)}
					</Navigator>
				</NavigationContainer>

				{/* <NativeRouter>
					<Switch>
						<Screen  name="" component={AuthenticationScreen}></Screen>
						<Screen  name="ChatScreen" component={ChatScreen}></Screen>
						<Screen  name="ConversationScreen" component={ConversationsScreen}></Screen>
						<Screen  name="DetailsProfileScreen" component={DetailsProfileScreen}></Screen>
						<Screen  name="EditDescriptionScreen" component={EditDescriptionScreen}></Screen>

						<Screen  name="EditHobbyScreen" component={EditHobbyScreen}></Screen>
						<Screen  name="EditInfoScreen" component={EditInfoScreen}></Screen>
						<Screen  name="EditPhotoScreen" component={EditPhotoScreen}></Screen>
						<Screen  name="EditSearchingScreen" component={EditSearchingScreen}></Screen>
						<Screen  name="PairsScreen" component={PairsScreen}></Screen>
						<Screen  name="SearchScreen" component={SearchScreen}></Screen>
						<Screen  name="SettingsScreen" component={SettingsScreen}></Screen>
						<Screen  name="SwipeScreen" component={SwipeScreen}></Screen>
						<Screen  name="RegisterDetailsScreen" component={RegisterDetailsScreen}></Screen>
					</Switch>
				</NativeRouter> */}
			</>
		);
	}
}
