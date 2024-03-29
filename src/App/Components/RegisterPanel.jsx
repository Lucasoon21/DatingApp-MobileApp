import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import { DatePickerModal } from 'react-native-paper-dates';
import 'intl';
import 'intl/locale-data/jsonp/en';
//import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import { Picker } from '@react-native-picker/picker';
import AuthenticationService from '../../service/AuthenticationService';
import { CommonActions, useNavigation } from '@react-navigation/native'; // <-- import useNavigation hook
import DictionaryService from '../../service/DictionaryService';
import Toast from 'react-native-toast-message';
import { configToast } from './configToast';
import { useToast } from 'react-native-toast-notifications';
import LoaderElements from './LoaderElements';

const RegisterPanel = (props) => {
	let schema = yup.object().shape({
		email: yup.string().email('Nieprawidlowy email').required('email jest wymagany'),
		password: yup.string().trim().min(6, 'Haslo jest za krotkie').max(20, 'hasło jest za długie').required('haslo jest wymagane'),
		confirmPassword: yup.string().equals([yup.ref('password'), null], 'Hasla sa rozne'),
		name: yup.string().min(2, 'imię jest za krótkie').max(50, 'Imię jest za długie!').required('imię jest wymagane'),

		// name: yup.string().min(2, 'imię jest za krótkie').max(50, 'Imię jest za długie!').required('imię jest wymagane')
		// dateBirth: yup.date().required('Data urodzenia jest wymagana').nullable(),
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [date, setDate] = useState(new Date());
	const [open, setOpen] = useState(false);
	const navigation = useNavigation();
	const onDismissSingle = () => {
		setOpen(false);
	};
	const toast = useToast();
	const showToast = (type, headerText, subText) => {
		toast.show(subText, {
			type: type,
			placement: 'top',
			duration: 40000,
			animationDuration: 100,
			animationType: 'zoom-in',
			data: {
				title: headerText,
			},
		});
	};

	const onConfirmSingle = (params) => {
		setOpen(false);
		setDate(params.date);
	};

	const [genderValue, setGenderValue] = useState('');
	const [orientationValue, setorientationValue] = useState('');
	const [orientationDropdown, setOrientationDropdown] = useState([]);
	const [genderDropdown, setGenderDropdown] = useState([]);
	const formikRef = useRef();

	//const goChat = () => props.navigation.navigate("Chat")

	useEffect(() => {
		getDropdownList();
	}, []);

	const getDropdownList = async () => {
		let Orientation = await DictionaryService.getOrientationDictionary();
		setOrientationDropdown(Orientation);
		let Gender = await DictionaryService.getGenderDictionary();
		setGenderDropdown(Gender);
	};

	const renderGenderList = () => {
		return genderDropdown.map((Gender) => {
			return <Picker.Item label={Gender.name} value={Gender.id} key={Gender.id} />;
		});
	};

	const renderOrientationList = () => {
		return orientationDropdown.map((Orientation) => {
			return <Picker.Item label={Orientation.name} value={Orientation.id} key={Orientation.id} />;
		});
	};

	const register = async (values) => {
		const response = await AuthenticationService.register(values.email, values.password, values.confirmPassword, values.name, date, genderValue, orientationValue);
		if (response.data.isError != 'YES') {
			showToast('success', 'Zarejestrowano', 'Twoje konto zostało zarejestrowane ');
			formikRef.current?.resetForm();
		} else {
			if (response.data.emailExists == 'YES') {
				showToast('error', 'Błąd rejestracji', 'Podany adres email już istnieje ');
			} else if (response.data.validate == 'YES') {
				showToast('error', 'Błąd rejestracji', 'Podane dane nie przechodzą walidacji');
			} else {
				showToast('error', 'Błąd rejestracji', 'Wystąpił błąd podczas rejestracji! ');
			}
		}
	};

	return (
		<>
			<View style={{ zIndex: 10, top: 0, position: 'absolute' }}>
				<Toast config={configToast} />
			</View>

			<Formik
				innerRef={formikRef}
				initialValues={{ email: '', password: '', confirmPassword: '', name: '' }}
				//onSubmit={async values => {// history.push("/Main")}}
				onSubmit={(values) => register(values)}
				validateOnMount={true}
				validationSchema={schema}>
				{({ handleSubmit, handleChange, handleBlur, errors, values, touched }) => (
					<>
						<TextInput
							mode='outlined'
							label='E-mail'
							placeholder='Wpisz e-mail...'
							style={[styles.input, { zIndex: 1 }]}
							onChangeText={handleChange('email')}
							onBlur={handleBlur('email')}
							value={values.email}
							right={<TextInput.Icon name={!errors.email ? 'check' : 'close'} />}
						/>
						{errors.email && touched.email && <Text style={{ color: 'red', minHeight: 20, width: 300 }}>{errors.email}</Text>}

						<TextInput
							mode='outlined'
							label='Hasło'
							placeholder='Wpisz hasło...'
							style={[styles.input, { zIndex: 1 }]}
							secureTextEntry={!showPassword}
							right={<TextInput.Icon name={showPassword ? 'eye-off' : 'eye'} onPress={() => setShowPassword(!showPassword)} />}
							onChangeText={handleChange('password')}
							onBlur={handleBlur('password')}
							value={values.password}
						/>
						{errors.password && touched.password && <Text style={{ color: 'red', minHeight: 20, width: 300 }}>{errors.password}</Text>}

						<TextInput
							mode='outlined'
							label='Potwierdz hasło'
							placeholder='Wpisz hasło...'
							style={[styles.input, { zIndex: 1 }]}
							secureTextEntry={!showConfirmPassword}
							right={<TextInput.Icon name={showConfirmPassword ? 'eye-off' : 'eye'} onPress={() => setShowConfirmPassword(!showConfirmPassword)} />}
							onChangeText={handleChange('confirmPassword')}
							onBlur={handleBlur('confirmPassword')}
							value={values.confirmPassword}
						/>

						{errors.confirmPassword && touched.confirmPassword && <Text style={{ color: 'red', minHeight: 20, width: 300 }}>{errors.confirmPassword}</Text>}

						<TextInput
							mode='outlined'
							label='Podaj swoje imię'
							placeholder='Wpisz imię...'
							style={[styles.input, { zIndex: 1 }]}
							onChangeText={handleChange('name')}
							onBlur={handleBlur('name')}
							value={values.name}
						/>
						{errors.name && touched.name && <Text style={{ color: 'red', minHeight: 20, width: 300 }}>{errors.name}</Text>}

						<View style={styles.pickerView}>
							{ genderDropdown && genderDropdown.length > 0 ? (
								<Picker style={styles.pickerStyle} selectedValue={genderValue} onValueChange={(itemValue) => setGenderValue(itemValue)}>
									{renderGenderList()}
								</Picker>
							) : (
								<LoaderElements />
							)}
						</View>

						<View style={styles.pickerView}>
							{orientationDropdown && orientationDropdown.length > 0  ? (
								<Picker style={styles.pickerStyle} selectedValue={orientationValue} onValueChange={(itemValue) => setorientationValue(itemValue)}>
									{renderOrientationList()}
								</Picker>
							) : (
								<LoaderElements />
							)}
						</View>
						<Button onPress={() => setOpen(true)} uppercase={false} mode='contained' style={styles.input}>
							Wybierz datę urodzin: {date.toLocaleDateString('pl', { dateStyle: 'medium' })}
						</Button>
						{/* <Text>{date.toLocaleDateString('pl', { dateStyle: 'medium' })}</Text> */}
						<DatePickerModal
							//locale={'en'} optional, default: automatic
							mode='single'
							visible={open}
							onDismiss={onDismissSingle}
							date={date}
							onConfirm={onConfirmSingle}
							validRange={{
								startDate: new Date(1900, 1, 2), // optional
								endDate: new Date(), // optional
							}}
							// onChange={() => change} // same props as onConfirm but triggered without confirmed by user
							saveLabel='Zapisz' // optional
							label='Wybierz date urodzenia' // optional
							animationType='slide' // optional, default is 'slide' on ios/android and 'none' on web
						/>

						<Button type='submit' title='submit' onPress={handleSubmit} mode='contained'>
							Zarejestruj się
						</Button>
					</>
				)}
			</Formik>
		</>
	);
};
export default RegisterPanel;

const styles = StyleSheet.create({
	pickerView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: 'red',
		maxHeight: 50,
		borderColor: 'silver',
		borderWidth: 2,
		borderStyle: 'solid',
		borderRadius: 5,
		backgroundColor: 'rgba(245, 245, 245, 0.9)',
		minHeight: 60,
		marginBottom: 10,
	},
	pickerStyle: {
		width: 330,
		height: 50,
		borderColor: 'red',
		borderWidth: 2,
		maxHeight: 50,
	},

	input: {
		//maxHeight: 50,
		zIndex: 100,
		width: 330,
		marginBottom: 10,
	},
});
