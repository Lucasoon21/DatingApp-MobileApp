import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import AuthPage from './src/Authentication/AuthenticationScreen';
import { NativeRouter, Route, Link, Switch } from 'react-router-native';
import SwipeScreen from './src/Swipe/SwipeScreen';
import SettingsScreen from './src/Settings/SettingsScreen';
import ChatScreen from './src/Chat/ChatScreen';
import ProfileScreen from './src/Profile/ProfileScreen';
import SearchScreen from './src/Search/SearchScreen';
import SwipeNavigator from './src/Swipe/SwipeNavigator';

 export default function App() {
   return (
       <NativeRouter>
            
              <Switch>
                <Route exact path="/" component={AuthPage} />
                <Route exact path="/Main" component={SwipeNavigator} /> 
                <Route exact path="/Settings" component={SettingsScreen} /> 
                <Route exact path="/Chat" component={ChatScreen} />
                <Route exact path="/Profile" component={ProfileScreen} /> 
                <Route exact path="/Search" component={SearchScreen} />  
              </Switch>
           
       </NativeRouter>
   );
 }