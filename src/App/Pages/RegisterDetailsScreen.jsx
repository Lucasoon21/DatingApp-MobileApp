import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, StatusBar } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import { DatePickerModal } from 'react-native-paper-dates';
import 'intl';
import 'intl/locale-data/jsonp/en';
//import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import { Picker } from '@react-native-picker/picker';
import AuthenticationService from '../../service/AuthenticationService';
import { CommonActions, useNavigation } from '@react-navigation/native' // <-- import useNavigation hook

const RegisterDetailsScreen = (props) => {
	let schema = yup.object().shape({
		name: yup.string().min(2, 'imię jest za krótkie').max(50, 'Imię jest za długie!').required('imię jest wymagane'),
		// dateBirth: yup.date().required('Data urodzenia jest wymagana').nullable(),
	});

	const [date, setDate] = useState(new Date());
	const [open, setOpen] = useState(false);
	const [name, setName] = useState('');

	const onDismissSingle = () => {
		setOpen(false);
	};

	const onConfirmSingle = (params) => {
		setOpen(false);
		setDate(params.date);
	};

	const [genderValue, setgenderValue] = useState(0);
	const [orientationValue, setorientationValue] = useState(0);
    const navigation = useNavigation()


	const register = async (values) => {
		//console.log('start detale');
		//console.log("Dane: "+values.email+" "+values.password)
		const response = await AuthenticationService.registerDetails(props.route.params.email, values.name, genderValue, date, orientationValue);
        //console.log(genderValue)
        navigation.navigate('ChatScreen') //TODO 
        if (response.status == 200 || response.status == 202) {
            //props.navigation.navigate("RegisterDetails")
		//	history.push('/RegisterDetail');
		} else {
			console.log('Nieprawidłowe dane');
		}
        
        //console.log(genderValue)
		// history.push("/Main")
	};

	return (
		<View style={styles.container}>
			<Formik
				initialValues={{ name: '' }}
				//onSubmit={async values => {// history.push("/Main")}}
				onSubmit={(values) => register(values)}
				validateOnMount={true}
				validationSchema={schema}>
				{({ handleSubmit, handleChange, handleBlur, errors, values, touched }) => (
					<>
						<TextInput
							mode='outlined'
							label='Podaj swoje imię'
							placeholder='Wpisz imię...'
							style={styles.input}
							onChangeText={handleChange('name')}
							onBlur={handleBlur('name')}
							value={values.name}
						/>

						{errors.name && touched.name && <Text style={{ color: 'red', minHeight: 20, width: 300 }}>{errors.name}</Text>}

						<View style={styles.pickerView}>
							<Picker style={styles.pickerStyle} selectedValue={genderValue} onValueChange={(itemValue) => setgenderValue(itemValue)}>
								<Picker.Item label='Kobieta' value='0'></Picker.Item>
								<Picker.Item label='Mężczyzna' value='1'></Picker.Item>
								<Picker.Item label='Inna' value='2'></Picker.Item>
							</Picker>
						</View>

						<View style={styles.pickerView}>
							<Picker style={styles.pickerStyle} selectedValue={orientationValue} onValueChange={(itemValue) => setorientationValue(itemValue)}>
								<Picker.Item label='Heteroseksualizm' value='0'></Picker.Item>
								<Picker.Item label='Homoseksualizm' value='1'></Picker.Item>
								<Picker.Item label='Biseksualizm' value='2'></Picker.Item>
							</Picker>
						</View>


						<Button onPress={() => setOpen(true)} uppercase={false} mode='contained'>
							{date.toLocaleDateString('en-US', { dateStyle: 'medium' })}
						</Button>
						<Text>{date.toLocaleDateString('pl', { dateStyle: 'medium' })}</Text>
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
							Wyślij
						</Button>
					</>
				)}
			</Formik>
		</View>
	);
};
export default RegisterDetailsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,

		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: StatusBar.currentHeight,
		backgroundColor: 'rgba(250,250,250,1)',
		padding: 0,
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
		marginBottom: 20,
	},
	pickerStyle: {
		width: 330,
		height: 50,
		borderColor: 'red',
		borderWidth: 2,
		maxHeight: 50,
	},

	input: {
		maxHeight: 50,
		width: 330,
		marginBottom: 20,
	},
});
