import React from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform } from 'react-native';
import Menu from "../control/Menu";

const Chat = (props) => {
    return (
        <View style={styles.container}>
            <Text>
                xddaaa
            </Text>
            <Menu chat={true}/>
        </View>
    );
};
export default Chat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 0,
    },


});