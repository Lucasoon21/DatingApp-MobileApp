import { StyleSheet, Text, View, Image, Linking } from 'react-native';
import React from 'react';
import { TextInput, Button } from 'react-native-paper';

const AreUnderAgeScreen = (props) => {
	const goBack = () => props.navigation.goBack();
	return (
		<View style={styles.container}>
			<Text style={styles.headerText}>Ojj :(</Text>
			<Text style={styles.text}>Niestety masz poniżej 18 lat</Text>
			<Text style={styles.text}>Abv korzystać z aplikacji musisz mieć ukończon 18 lat</Text>
			<Text style={styles.text}>Wróć kiedy osiągniesz pełnoletność ;)</Text>
			<Button mode='contained'onPress={() => goBack()}>
				Wróc do strony głównej
			</Button>
		</View>
	);
};

export default AreUnderAgeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerText: {
		fontSize: 50,
		marginVertical: 15,
		textAlign: 'center',
	},
	text: {
		fontSize: 20,
		marginVertical: 15,
		textAlign: 'center',
	}
});
