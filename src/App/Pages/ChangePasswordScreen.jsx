import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import Menu from '../Controls/Menu';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { styles } from '../Styles/ProfileStyle';
import ProfileService from '../../service/ProfileService';
import { TextInput, Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import Toast from 'react-native-toast-message';
import { configToast } from '../Components/configToast';
import BackNavigation from '../Components/BackNavigation';

const ChangePasswordScreen = (props) => {
	const goBack = () => props.navigation.goBack();

	let schema = yup.object().shape({
		newPassword: yup.string().trim().min(6, 'Haslo jest za krotkie').required('haslo jest wymagane'),
		confirmPassword: yup.string().equals([yup.ref('newPassword'), null], 'Hasla sa rozne'),
		// name: yup.string().min(2, 'imię jest za krótkie').max(50, 'Imię jest za długie!').required('imię jest wymagane')
		// dateBirth: yup.date().required('Data urodzenia jest wymagana').nullable(),
	});
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const changePassword = async (values) => {
		let response = await ProfileService.changePassword({
			oldPassword: values.oldPassword,
			newPassword: values.newPassword,
			confirmPassword: values.confirmPassword,
		});
		if (response.status == 200) {
			showToast('success', 'Zmieniono hasło!', 'Twoja zmiana hasłu została zakończona pomyślnie');
		} else {
			showToast('error', 'Nie zmieniono hasła', 'Nieudało się zmienić hasła. Sprbuj ponownie później');
		}

		console.log('first', response);
	};

	const showToast = (type, headerText, subText) => {
		Toast.show({
			type: type,
			text1: headerText,
			text2: subText,
			visibilityTime: 10000,
		});
	};

	return (
		<View style={styles.container} title={'Zmiana hasła'}>
			<BackNavigation goBack={goBack} />
			<View style={{ zIndex: 10, top: 0, position: 'absolute' }}>
				<Toast config={configToast} />
			</View>
			<View style={styles.sectionContainer}>
				<Text style={styles.headerText}>Edycja hasła </Text>

				<Formik
					initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
					//onSubmit={async values => {// history.push("/Main")}}
					onSubmit={(values) => changePassword(values)}
					validateOnMount={true}
					validationSchema={schema}>
					{({ handleSubmit, handleChange, handleBlur, errors, values, touched }) => (
						<>
							<TextInput
								mode='outlined'
								label='Stare hasło'
								placeholder='Wpisz hasło...'
								style={styles.input}
								secureTextEntry={!showOldPassword}
								right={<TextInput.Icon name={showOldPassword ? 'eye-off' : 'eye'} onPress={() => setShowOldPassword(!showOldPassword)} />}
								onChangeText={handleChange('oldPassword')}
								onBlur={handleBlur('oldPassword')}
								value={values.oldPassword}
							/>

							<TextInput
								mode='outlined'
								label='Nowe hasło'
								placeholder='Wpisz hasło...'
								style={styles.input}
								secureTextEntry={!showNewPassword}
								right={<TextInput.Icon name={showNewPassword ? 'eye-off' : 'eye'} onPress={() => setShowNewPassword(!showNewPassword)} />}
								onChangeText={handleChange('newPassword')}
								onBlur={handleBlur('newPassword')}
								value={values.newPassword}
							/>
							{errors.newPassword && touched.newPassword && <Text style={{ color: 'red', minHeight: 20, width: 300 }}>{errors.newPassword}</Text>}

							<TextInput
								mode='outlined'
								label='Potwierdz hasło'
								placeholder='Wpisz hasło...'
								style={styles.input}
								secureTextEntry={!showConfirmPassword}
								right={<TextInput.Icon name={showConfirmPassword ? 'eye-off' : 'eye'} onPress={() => setShowConfirmPassword(!showConfirmPassword)} />}
								onChangeText={handleChange('confirmPassword')}
								onBlur={handleBlur('confirmPassword')}
								value={values.confirmPassword}
							/>

							{errors.confirmPassword && touched.confirmPassword && <Text style={{ color: 'red', minHeight: 20, width: 300 }}>{errors.confirmPassword}</Text>}

							<Button type='submit' title='submit' onPress={handleSubmit} mode='contained'>
								Zmień hasło
							</Button>
						</>
					)}
				</Formik>
			</View>
			<Menu settings={true} {...props} />
		</View>
	);
};
export default ChangePasswordScreen;
