import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import AuthPage from "./src/App/Authentication/AuthenticationScreen"
import { NativeRouter, Route, Link, Switch } from 'react-router-native';
import SwipeScreen from './src/App/Swipe/SwipeScreen';
import SettingsScreen from './src/App/Settings/SettingsScreen';
import ChatNavigator from './src/App/Chat/ChatNavigator';
import ProfileScreen from './src/App/Profile/ProfileScreen';
import SearchScreen from './src/App/Search/SearchScreen';
import SwipeNavigator from './src/App/Swipe/SwipeNavigator';
import RegisterDetailPanel from './src/App/Authentication/RegisterDetailPanel'
import JwtManager from './src/Api/JwtManager';

 export default function App() {
   useEffect(() => {
     const token = JwtManager.getAccessToken();
     if(token!==null) {
       
     }
   })

   return (
       <NativeRouter>
            
              <Switch>
                <Route exact path="/" component={AuthPage} />
                <Route exact path="/Main" component={SwipeNavigator} /> 
                <Route exact path="/Settings" component={SettingsScreen} /> 
                <Route exact path="/Chat" component={ChatNavigator} />
                <Route exact path="/Profile" component={ProfileScreen} /> 
                <Route exact path="/Search" component={SearchScreen} />
                <Route exact path="/RegisterDetail" component={RegisterDetailPanel} />  
              </Switch>
           
       </NativeRouter>
   );
 }