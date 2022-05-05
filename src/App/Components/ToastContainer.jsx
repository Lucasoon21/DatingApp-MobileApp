import React from 'react';
import { ToastProvider } from 'react-native-toast-notifications';
import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { Text, View, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export function ToastContainer(props) {
	return (
		<View
			style={{
				marginTop: 30,
				maxWidth: '85%',
				minWidth: '85%',
				paddingHorizontal: 15,
				paddingVertical: 10,
				backgroundColor: props.backgroundColor,
				marginVertical: 4,
				borderRadius: 8,
				borderLeftColor: props.borderLeftColor,
				borderLeftWidth: 6,
				justifyContent: 'center',
				paddingLeft: 5,
				display: 'flex',
				flexDirection: 'row',
			}}>
			<View
				style={{
					display: 'flex',
					justifyContent: 'center',
				}}>
				{props.icon}
			</View>
			<View
				style={{
					width: '70%',
				}}>
				<Text
					style={{
						color: '#fff',
						marginRight: 16,
						fontSize: 19,
						fontWeight: '700',
					}}>
					{props.toast.data.title}
				</Text>
				<Text
					style={{
						color: '#fff',
						marginRight: 16,
						fontSize: 15,
						fontWeight: '400',
					}}>
					{props.toast.message}
				</Text>
			</View>
			<TouchableOpacity
				onPress={() => props.toast.onHide()}
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<AntDesign name='closecircleo' size={32} color='#fff' />
			</TouchableOpacity>
		</View>
	);
}
