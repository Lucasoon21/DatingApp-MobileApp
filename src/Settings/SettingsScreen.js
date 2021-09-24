import React from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform } from 'react-native';
import Menu from "../control/Menu";

const Settings = (props) => {
    return (
        <View style={styles.container}>
            <Text>
                aaa
            </Text>
            <Menu settings={true}/>
        </View>
    );
};
export default Settings;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 0,
    },


});