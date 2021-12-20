import React from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform } from 'react-native';
import Menu from "../control/Menu";

const SearchScreen = (props) => {
    return (
        <View style={styles.container}>
            <Text>
                xddaaa
            </Text>
            <Menu search={true}/>
        </View>
    );
};
export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 0,
    },


});