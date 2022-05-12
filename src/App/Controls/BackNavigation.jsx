import React from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function BackNavigation({ goBack }) {
	return (
		<TouchableOpacity onPress={goBack} style={styles.buttonBack}>
			<Ionicons name='arrow-back' size={40} color='rgba(50,50,50,1)' />
			<Text style={styles.textBack}>Cofnij</Text>
		</TouchableOpacity>
	);
}
export default BackNavigation;

const styles = StyleSheet.create({
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
});

