import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import AuthPage from './src/Authentication/AuthenticationScreen';
import { NativeRouter, Route, Link, Switch } from 'react-router-native';
import SwipeScreen from './src/Main/SwipeScreen';
import SettingsScreen from './src/Settings/SettingsScreen';
import ChatScreen from './src/Chat/ChatScreen';

 export default function App() {
   return (
       <NativeRouter>
            
              <Switch>
                <Route exact path="/" component={AuthPage} />
                <Route exact path="/Main" component={SwipeScreen} /> 
                <Route exact path="/Settings" component={SettingsScreen} /> 
                <Route exact path="/Chat" component={ChatScreen} />  
              </Switch>
           
       </NativeRouter>
   );
 }