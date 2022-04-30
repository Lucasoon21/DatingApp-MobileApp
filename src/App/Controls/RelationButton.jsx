import React, { Component, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar, TouchableOpacity } from "react-native";

const RelationButton = (props) => {
    const [relationParam,setRelationParam] = useState(props.type);

    const change = () => {
      props.changeValue(props.index, (relationParam+1) % 3)
      setRelationParam((relationParam+1) % 3)
  }

    return (
        <View style={[relationParam==0? styles.neutral : (relationParam==1? styles.yes : styles.no), styles.item]}>
            {props.edit ? (
                <TouchableOpacity onPress={() => change()}>
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
        paddingHorizontal: 5,
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