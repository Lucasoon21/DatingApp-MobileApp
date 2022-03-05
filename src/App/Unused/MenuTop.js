import React from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, TouchableOpacity, ScrollView } from 'react-native';
import Menu from "../Controls/Menu";
import DetailsProfileScreen from '../Pages/DetailsProfileScreen';
import { styles } from '../Styles/ChatStyle';


const MenuTop = (props) => {
   // const goPairs = () => props.navigation.navigate("Pairs")
    //const goConversation = () => props.navigation.navigate("Conversations")
   // const goChat = () => props.navigation.navigate("Chat")
    
    return (

        <View style={styles.menuTop}>
            <TouchableOpacity onPress={props.goPairs} >
                <Text style={styles.menuTopElement}>Pary</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.goConversation} >
                <Text style={styles.menuTopElement}>Rozmowy</Text>
            </TouchableOpacity>
        </View>

    );
};
export default MenuTop;
