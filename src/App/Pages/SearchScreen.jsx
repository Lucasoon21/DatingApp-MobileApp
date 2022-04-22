import React from 'react';
import { StyleSheet, Image, Linking, Platform } from 'react-native';
import Menu from '../Controls/Menu';
import { Avatar, AvatarHelper, View, Text, Colors, Typography, Button } from 'react-native-ui-lib'; //eslint-disable-line

const SearchScreen = (props) => {
    return (
        <View style={styles.container}>
            <Text>
                xddaaa
            </Text>
            <Menu search={true}  {...props}/>
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

/*
const SearchScreen = (props) => {
    return (
        <View style={styles.container}>
            <Text>
                xddaaa
            </Text>
            <Menu search={true}  {...props}/>
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
*/
