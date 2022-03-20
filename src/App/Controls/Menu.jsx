import React from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform } from 'react-native';
import { Feather, Entypo, MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Link } from '@react-navigation/native';
import {  styles } from '../Styles/MenuStyle';

const Menu = (props) => {
    return (
        <View style={styles.menu}>
             <Link to={"/SettingsScreen"} style={styles.link}>
                <MaterialIcons name="settings" size={30} color={props.settings ? 'red' : 'rgba(180,180,180,1)'} style={styles.icon}/> 
            </Link>

            <Link to={{ screen: 'DetailsProfileScreen', params: { myProfile: true } }} style={styles.link}>
                <Ionicons name="person-circle" size={30} color={props.profile ? 'red' : 'rgba(180,180,180,1)'} style={styles.icon} />
            </Link>

            <Link to={"/SwipeScreen"} style={styles.link}>
                <MaterialIcons name="swipe" size={30} color={props.swipe ? 'red' : 'rgba(180,180,180,1)'} style={styles.icon} />
            </Link>

            <Link to={"/SearchScreen"} style={styles.link}>
                <Ionicons name="search-circle" size={30} color={props.search ? 'red' : 'rgba(180,180,180,1)'} style={styles.icon} />
            </Link>

            <Link to={"/PairsScreen"} style={styles.link}>
                <Entypo name="chat" size={30} color={props.chat ? 'red' : 'rgba(180,180,180,1)'} style={styles.icon} />
            </Link> 
        </View>
    );
};
export default Menu;

