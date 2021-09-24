import React from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform } from 'react-native';
import { Feather, Entypo, MaterialIcons } from '@expo/vector-icons';
import { NativeRouter, Route, Link } from "react-router-native";

const Menu = (props) => {
    return (
        <View style={styles.menu}>
            <Link to={"/Settings"} style={styles.link}>
                <MaterialIcons name="settings" size={30} color={props.settings ? 'red' : 'rgba(180,180,180,1)'} style={styles.icon}/>
            </Link>

            <Link to={"/Main"} style={styles.link}>
                <MaterialIcons name="swipe" size={30} color={props.swipe ? 'red' : 'rgba(180,180,180,1)'} style={styles.icon} />
            </Link>

            <Link to={"/Chat"} style={styles.link}>
                <Entypo name="chat" size={30} color={props.chat ? 'red' : 'rgba(180,180,180,1)'} style={styles.icon} />
            </Link>
        </View>
    );
};
export default Menu;

const styles = StyleSheet.create({
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,

        
    },
    link: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopColor: 'rgba(220,220,220,1)',
        borderTopWidth: 2,
        borderStyle: 'solid',
        
    },
    icon: {
        padding: 10
    }
});