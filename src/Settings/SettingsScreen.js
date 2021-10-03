import React from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform } from 'react-native';
import Menu from "../control/Menu";

function HomeScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screzen</Text>
        </View>
    );
}


const Settings = (props) => {
    return (
        <View style={styles.container}>
            <Text>
                aaav
            </Text>
            <Menu settings={true} />
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