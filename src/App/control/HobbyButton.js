import React, { Component, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar, TouchableOpacity, Button } from "react-native";
const HobbyButton = (props) => {
    const [status, setStatus] = useState(true);
    return (
        <View style={[styles.item, status ? styles.item : styles.itemNo]}>
            {props.edit ? (
                <TouchableOpacity onPress={() => setStatus(!status)}>
                    <Text style={[styles.title]}>{props.text}</Text>
                </TouchableOpacity>
            ) : (<Text style={[styles.title]}>{props.text}</Text>)}

        </View>

    );
}
export default HobbyButton;

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#ff859f",
        paddingVertical: 7,
        paddingHorizontal: 11,
        margin: 3,
        display: "flex",
        borderRadius: 15,
        alignContent: 'space-between',
        alignSelf: 'flex-end'
    },
    title: {
        fontSize: 18,
        textAlign: "center",
    },
    itemNo: {
        backgroundColor: "#c2c2c2",
    }
});