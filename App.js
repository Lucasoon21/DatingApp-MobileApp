import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Routes } from './Routes';
import { ToastProvider } from 'react-native-toast-notifications';
import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { Text, View, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { ToastContainer } from './src/App/Components/ToastContainer';
export default function App() {
	return (
		<ToastProvider
			placement='bottom'
			dangerIcon={<MaterialCommunityIcons name='close' color='#fff' />}
			successIcon={<MaterialCommunityIcons name='check' color='#fff' size={18} />}
			offset={10}
			// Custom type example
			renderType={{
				success: (toast) => (
					<ToastContainer toast={toast} backgroundColor={'rgb(76,175,80)'} borderLeftColor={'rgb(10,175,10)'} icon={<IconButton icon='check-circle-outline' size={32} color='#fff' />} />
				),
				error: (toast) => (
					<ToastContainer toast={toast} backgroundColor={'rgb(255,82,82)'} borderLeftColor={'rgb(255,32,32)'} icon={<IconButton icon='close-circle-outline' size={32} color='#fff' />} />
				),
				info: (toast) => (
					<ToastContainer toast={toast} backgroundColor={'rgb(33,150,243)'} borderLeftColor={'rgb(33,110,243)'} icon={<IconButton icon='information-outline' size={32} color='#fff' />} />
				),

				warining: (toast) => (
					<ToastContainer toast={toast} backgroundColor={'rgb(255,193,7)'} borderLeftColor={'rgb(255,143,7)'} icon={<IconButton icon='alert-outline' size={32} color='#fff' />} />
				),
			}}>
			<Routes />
		</ToastProvider>
	);
}
