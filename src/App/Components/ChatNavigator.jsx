import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, ScrollView, TouchableOpacity } from 'react-native';
import Menu from "../Controls/Menu";
import { styles } from './style';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  PairsScreen from  './PairsScreen';
import  ConversationsScreen  from  '../Pages/ConversationsScreen';
import MenuTop from '../Unused/MenuTop';
import ChatScreen from './ChatScreen';
import DetailsProfileScreen from '../Pages/DetailsProfileScreen';

const { Navigator, Screen } = createNativeStackNavigator();

const Chat = (props) => {
 /*   const [pairsScreen, setPairsScreen] = useState(false);
    const goPairs = () => props.navigation.navigate("Pairs")
    const goConversation = () => props.navigation.navigate("Conversations")
    const goChat = () => props.navigation.navigate("Chat")
*/
    return (
        <>
        {/*
        <View style={styles.container}>
            <MenuTop />
             <View style={styles.menuTop}>
                <TouchableOpacity onPress={goPairs} ><Text style={styles.menuTopElement}>Pary</Text></TouchableOpacity>
                <TouchableOpacity onPress={goConversation} ><Text style={styles.menuTopElement}>Rozmowy</Text></TouchableOpacity>
            </View> */}
                    {/* <Screen name="Profile" component={DetailsProfileScreen}></Screen>  */}
                    {/* <Screen name="Profile" children={()=> <DetailsProfileScreen myProfile={true} />}   ></Screen> */}
{/*
            <NavigationContainer>
                <Navigator screenOptions={{ headerShown: false }} initalRouteName="Pairs">
                    <Screen name="Pairs" component={PairsScreen}></Screen>
                    <Screen name="Conversations" component={ConversationsScreen}></Screen>
                    <Screen name="Chat" component={ChatScreen}></Screen> 
                    <Screen name="ProfileUser" component={DetailsProfileScreen} initialParams={{myProfile: false}}></Screen> 
                </Navigator>
            </NavigationContainer>
            <Menu chat={true} />
        */} 

            {/* <ScrollView style={styles.scrollView}>
                <View style={styles.scrollContainer}>
                    <Text>
                        xddaaa
                    </Text>
                </View>
            </ScrollView> 
            <Menu chat={true} />
            </View>
            */}
            </>
    );
};
export default Chat;

