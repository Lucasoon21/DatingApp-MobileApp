import React from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform } from 'react-native';
import Menu from "../control/Menu";
import EditDescriptionScreen from '../Profile/EditDescriptionScreen';
import EditHobbyScreen from '../Profile/EditHobbyScreen';
import EditInfoScreen from '../Profile/EditInfoScreen';
import EditSearchingScreen from '../Profile/EditSearchingScreen';
import EditPhotoScreen from '../Profile/EditPhotoScreen';
import ProfileUserScreen from '../Profile/ProfileUserScreen';
import DetailsProfileScreen  from '../DetailsProfile/DetailsProfileScreen';

import { NativeRouter, Route, Link } from "react-router-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from '../Profile/style';

const { Navigator, Screen } = createNativeStackNavigator();


const ProfileScreen = (props) => {
    return (
        <>
            <NavigationContainer>
                <Navigator screenOptions={{ headerShown: false }} initalRouteName="Profile">
                    {/* <Screen name="Profile" component={DetailsProfileScreen}></Screen>  */}
                    {/* <Screen name="Profile" children={()=> <DetailsProfileScreen myProfile={true} />}   ></Screen> */}
                    <Screen name="ProfileDetails" component={DetailsProfileScreen} initialParams={{myProfile: true}}></Screen>
                    <Screen name="Profile" component={ProfileUserScreen} initialParams={{myProfile: true}}></Screen> 
                    <Screen name="EditDescription" component={EditDescriptionScreen}></Screen>
                    <Screen name="EditHobby" component={EditHobbyScreen}></Screen>
                    <Screen name="EditInfo" component={EditInfoScreen}></Screen>
                    <Screen name="EditSearching" component={EditSearchingScreen}></Screen>
                    <Screen name="EditPhoto" component={EditPhotoScreen}></Screen>
                </Navigator>
            </NavigationContainer>

            {/* <DetailsProfileScreen myProfile={true} /> */}
        </>
    );
};
export default ProfileScreen;