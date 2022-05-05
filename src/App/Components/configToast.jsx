import React from 'react';
import { Text, View } from 'react-native';
import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { IconButton } from 'react-native-paper';

export const configToast = {
	success: (props) => (
		<BaseToast
			{...props}
			style={{ borderLeftColor: 'rgb(10,175,10)', height: 170, backgroundColor: 'rgb(76,175,80)', zIndex: 1000 }}
			contentContainerStyle={{ paddingHorizontal: 5, paddingVertical: 25 }}
			text1Style={{
				fontSize: 20,
				fontWeight: '700',
				color: 'white',
			}}
			text1NumberOfLines={2}
			text2NumberOfLines={4}
			text2Style={{
				fontSize: 17,
				fontWeight: '400',
				color: 'white',
			}}
			renderLeadingIcon={() => (
				<View style={{ display: 'flex', justifyContent: 'center' }}>
					<IconButton icon='check-circle-outline' size={32} color='#fff' />
				</View>
			)}
		/>
	),

	error: (props) => (
		<ErrorToast
			{...props}
			style={{ borderLeftColor: 'rgb(255,32,32)', height: 170, backgroundColor: 'rgb(255,82,82)', zIndex: 1000 }}
			contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 15 }}
			text1Style={{
				fontSize: 20,
				fontWeight: '700',
				color: 'white',
			}}
			text1NumberOfLines={2}
			text2NumberOfLines={4}
			text2Style={{
				fontSize: 17,
				fontWeight: '400',
				color: 'white',
			}}
			renderLeadingIcon={() => (
				<View style={{ display: 'flex', justifyContent: 'center' }}>
					<IconButton icon='close-circle-outline' size={32} color='#fff' />
				</View>
			)}
		/>
	),
	info: (props) => (
		<BaseToast
			{...props}
			style={{ borderLeftColor: 'rgb(33,110,243)', height: 170, backgroundColor: '  rgb(33,150,243)', zIndex: 1000 }}
			contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 25 }}
			text1Style={{
				fontSize: 20,
				fontWeight: '700',
				color: 'white',
			}}
			text1NumberOfLines={2}
			text2NumberOfLines={4}
			text2Style={{
				fontSize: 17,
				fontWeight: '400',
				color: 'white',
			}}
			renderLeadingIcon={() => (
				<View style={{ display: 'flex', justifyContent: 'center' }}>
					<IconButton icon='information-outline' size={32} color='#fff' />
				</View>
			)}
		/>
	),
	warning: (props) => (
		<BaseToast
			{...props}
			style={{ borderLeftColor: 'rgb(255,143,7)', height: 170, backgroundColor: '   rgb(255,193,7)', zIndex: 1000 }}
			contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 25 }}
			text1Style={{
				fontSize: 20,
				fontWeight: '700',
				color: 'white',
			}}
			text1NumberOfLines={2}
			text2NumberOfLines={4}
			text2Style={{
				fontSize: 17,
				fontWeight: '400',
				color: 'white',
			}}
			renderLeadingIcon={() => (
				<View style={{ display: 'flex', justifyContent: 'center' }}>
					<IconButton icon='alert-outline' size={32} color='#fff' />
				</View>
			)}
		/>
	),
};
