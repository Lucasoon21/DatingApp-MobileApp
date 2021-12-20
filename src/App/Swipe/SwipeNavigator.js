import React, { useState, useRef, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, Animated, PanResponder, TouchableOpacity } from 'react-native';
import { Feather, Entypo, MaterialIcons } from '@expo/vector-icons';
import { NativeRouter, Route, Link } from "react-router-native";
import Menu from "../control/Menu";
import CardUser from "../Swipe/CardUser"
import { person as personArray } from "../control/data"
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { CARD, ACTION_OFFSET } from '../../utils/constants';
import { Fontisto } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  DetailsProfileScreen  from '../DetailsProfile/DetailsProfileScreen';
import  SwipeScreen  from '../Swipe/SwipeScreen';


const {Navigator, Screen } = createNativeStackNavigator();



const SwipeNavigator = () => {
    
    return (

    
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }} initalRouteName="Swipe">
                 <Screen name="Swipe" component={SwipeScreen}></Screen>
                 <Screen name="ProfileDetails" component={DetailsProfileScreen} initialParams={{myProfile: false}}></Screen>  
            </Navigator>
        </NavigationContainer>
    )
}
export default SwipeNavigator;