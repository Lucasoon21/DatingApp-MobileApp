import React from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform } from 'react-native';
import Menu from "../Controls/Menu";
import EditDescriptionScreen from '../Pages/EditDescriptionScreen';
import EditHobbyScreen from '../Pages/EditHobbyScreen';
import EditInfoScreen from '../Pages/EditInfoScreen';
import EditSearchingScreen from '../Pages/EditSearchingScreen';
import EditPhotoScreen from '../Pages/EditPhotoScreen';
import ProfileUserScreen from '../Pages/ProfileUserScreen';
import DetailsProfileScreen  from '../Pages/DetailsProfileScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from '../Styles/ProfileStyle';

const { Navigator, Screen } = createNativeStackNavigator();


const ProfileScreen = (props) => {
    return (
        <>
                    {/* <Screen name="Profile" component={DetailsProfileScreen}></Screen>  */}
                    {/* <Screen name="Profile" children={()=> <DetailsProfileScreen myProfile={true} />}   ></Screen> */}
            {/* <NavigationContainer>
                <Navigator screenOptions={{ headerShown: false }} initalRouteName="Profile">
                    <Screen name="ProfileDetails" component={DetailsProfileScreen} initialParams={{myProfile: true}}></Screen>
                    <Screen name="Profile" component={ProfileUserScreen} initialParams={{myProfile: true}}></Screen> 
                    <Screen name="EditDescription" component={EditDescriptionScreen}></Screen>
                    <Screen name="EditHobby" component={EditHobbyScreen}></Screen>
                    <Screen name="EditInfo" component={EditInfoScreen}></Screen>
                    <Screen name="EditSearching" component={EditSearchingScreen}></Screen>
                    <Screen name="EditPhoto" component={EditPhotoScreen}></Screen>
                </Navigator>
            </NavigationContainer> */}

            {/* <DetailsProfileScreen myProfile={true} /> */}
        </>
    );
};
export default ProfileScreen;