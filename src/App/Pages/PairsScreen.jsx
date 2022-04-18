import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, ScrollView, TouchableOpacity } from 'react-native';
import Menu from "../Controls/Menu";
import DetailsProfileScreen from './DetailsProfileScreen';
import { contact, styles } from '../Styles/ChatStyle';
import MenuTop from '../Unused/MenuTop';
import PairComponent from '../Components/PairComponent';
import MatchService from '../../service/MatchService';

const PairsScreen = (props) => {
    const goPairs = () => props.navigation.navigate("PairsScreen")
    const goConversation = () => props.navigation.navigate("ConversationScreen")
    const goChat = () => props.navigation.navigate("ChatScreen")
    const [loading, setLoading] = useState(true)
    
    const [pairs, setPairs] = useState([])

    useEffect(() => {
        const fetchMatches = async () => {
            let response = await MatchService.getAllMatch()
            console.log(response.data)
            if(response.data!=null){
                setPairs(response.data)
            }
        }
        fetchMatches()
    },[])

    return (
        <View style={styles.container}>
            <View style={styles.menuTop}>
                <TouchableOpacity
                    onPress={goPairs}
                    style={[styles.xd, styles.activeTopMenu]}
                >
                    <Text style={styles.menuTopElement}>Pary</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={goConversation}
                    style={styles.xd}
                >
                    <Text style={styles.menuTopElement}>Rozmowy</Text>
                </TouchableOpacity>
            </View>
 
            <ScrollView style={styles.containerContact}>

                {pairs.map((pair, i) => {
                   return <PairComponent navigation={props.navigation} profile={pair} key={i}/>
                })}
                {/* <PairComponent navigation={props.navigation}/>
                <PairComponent navigation={props.navigation}/>
                <PairComponent navigation={props.navigation}/>
                <PairComponent navigation={props.navigation}/>
                <PairComponent navigation={props.navigation}/> */}
            </ScrollView>


            <Menu chat={true}  {...props}/>
        </View>
    );
};
export default PairsScreen;
