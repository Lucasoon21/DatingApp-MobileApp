import React from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, StatusBar } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight,
        backgroundColor: 'rgba(220,220,220,1)',
        padding: 0,
    },
    sectionContainer: {
        backgroundColor: 'rgba(250,250,250,1)',
        width: '90%',
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 20,
        borderRadius: 20,
    },
    sectionContainerFlex:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10,
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    characterCount: {
        textAlign: 'right',
    },
    buttonBack: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderBottomColor: 'rgba(200,200,200,1)',
        borderBottomWidth: 2,
        borderStyle: 'solid',
    },
    textBack: {
        fontSize: 20,
        marginLeft: 10,
    },
    scrollView: {
        width: '100%',
        marginBottom: 50,
    },
    scrollContainer: {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: 30,
    },
    textInput: {
        fontSize: 17, 
        padding: 20, 
        backgroundColor: "rgba(240,240,240,1)", 
        borderRadius: 20, 
        //marginTop: 20, 
        textAlignVertical: 'top'
    },
    textInputWork: {
        paddingVertical: 10,
        width: 200,
    },

    pickerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        maxHeight: 60,
        borderColor: 'silver',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 5,
        backgroundColor: 'rgba(245, 245, 245, 0.9)',
        minHeight: 60,
        marginBottom: 20

    },
    pickerStyle: {
        width: 200,
        height: 50,
        maxHeight: 50,
    },
    infoHeader: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputView: {
        width: 200,
    },
    workTextContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    characterWorkCount: {
        textAlign: 'left',
    },
    itemStyle: {
        backgroundColor: 'red',
    },
    hobbyContainerEdit: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginBottom: 15,
    },
    textHeader:{
        fontSize: 30,
        fontWeight: 'bold',
    },
    input: {
		//maxHeight: 50,
		width: 300,
		marginBottom: 20,
	},
})
export {styles}