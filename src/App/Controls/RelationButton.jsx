import React, { Component, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar, TouchableOpacity } from "react-native";

const RelationButton = (props) => {
    const [relationParam,setRelationParam] = useState(props.type);
    return (
        <View style={[relationParam==0? styles.yes : (relationParam==1? styles.no : styles.neutral), styles.item]}>
            {props.edit ? (
                <TouchableOpacity onPress={() => setRelationParam((relationParam+1) % 3)
                }>
                    <Text style={[styles.title]}>{props.text}</Text>
                </TouchableOpacity>
            ) : (<Text style={[styles.title]}>{props.text}</Text>)}

        </View>

    );
}
export default RelationButton;

const styles = StyleSheet.create({
    item: {
        //backgroundColor: "#ff859f",
        paddingVertical: 7,
        paddingHorizontal: 11,
        margin: 3,
        display: "flex",
        borderRadius: 15,
        alignContent: 'space-between',
        alignSelf: 'flex-end'
      },
      yes: {
        backgroundColor: "#94e866",
      },
      no: {
        backgroundColor: "#ff859f",
      },
      neutral: {
        backgroundColor: "#c2c2c2",
      },
      title: {
        fontSize: 18,
        textAlign: "center",
      }
});