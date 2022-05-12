import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Linking, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import LoginPanel from '../Components/LoginPanel';
import RegisterPanel from '../Components/RegisterPanel';
import Toast from 'react-native-toast-message';
import { configToast } from '../Components/configToast';

const AuthenticationScreen = () => {
	const [loginPan, setLoginPanel] = useState(true);

	return (
		<View style={styles.container}>
			<View style={styles.menuTop}>
				<Button
					onPress={() => {
						setLoginPanel(true);
					}}
					style={loginPan? [styles.xd, styles.activeTopMenu] : styles.xd}>
					<Text style={styles.menuTopElement}>Logowanie</Text>
				</Button>
				<Button
					onPress={() => {
						setLoginPanel(false);
					}}
					style={!loginPan? [styles.xd, styles.activeTopMenu] : styles.xd}>
					<Text style={styles.menuTopElement}>Rejestracja</Text>
				</Button>
			</View>

			<View>{loginPan ? <LoginPanel /> : <RegisterPanel />}</View>
			<View></View>
		</View>
	);
};
export default AuthenticationScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: '100%',
		paddingVertical: 20,
	},
	menuTop: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-around',
		alignItems: 'center',
		height: 50,
		//backgroundColor: 'rgba(240,240,240,1)',

		borderBottomColor: 'rgba(220,220,220,1)',
		borderBottomWidth: 2,
		borderStyle: 'solid',
		backgroundColor: 'rgba(255,255,255,1)',
	},
	xd: {
		width: '50%',
	},
	menuTopElement: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		textAlignVertical: 'center',
		//backgroundColor:  'rgba(255,255,55,1)',
    color: 'black',
		height: '100%',
	},
	activeTopMenu: {
		//backgroundColor:  'rgba(250,250,250,1)',
		borderBottomColor: 'red',
		borderBottomWidth: 3,
		borderStyle: 'solid',
	},
});
