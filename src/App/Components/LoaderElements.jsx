import React from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator } from 'react-native';

export function LoaderElements({}) {
	return (
		<View
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'rgba(255, 255, 255,0)'
			}}>
			<ActivityIndicator size='large' color='#6646ee' />
		</View>
	);
}
export default LoaderElements;