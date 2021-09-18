import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import AuthPage from './src/Authentication/AuthenticationScreen';
import { NativeRouter, Route, Link, Switch } from 'react-router-native';
import SwipeScreen from './src/Main/SwipeScreen';

 export default function App() {
   return (
       <NativeRouter>
            <View style={styles.container}>
              <Switch>
                <Route exact path="/" component={AuthPage} />
                <Route exact path="/Main" component={SwipeScreen} /> 
              </Switch>
            </View>
       </NativeRouter>
   );
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
