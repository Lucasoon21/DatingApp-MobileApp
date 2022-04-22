import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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

const RegisterPanel = (props) => {
	let schema = yup.object().shape({
		email: yup.string().email('Nieprawidlowy email').required('email jest wymagany'),
		password: yup.string().trim().min(6, 'Haslo jest za krotkie').required('haslo jest wymagane'),
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

	const onConfirmSingle = (params) => {
		setOpen(false);
		setDate(params.date);
	};

	const [genderValue, setGenderValue] = useState('');
	const [orientationValue, setorientationValue] = useState('');
	const [orientationDropdown, setOrientationDropdown] = useState([]);
	const [genderDropdown, setGenderDropdown] = useState([]);

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
		//console.log(props)

		//console.log('Dane: ' + values.email + ' ' + values.password);
		const response = await AuthenticationService.register(values.email, values.password, values.confirmPassword, values.name, date, genderValue, orientationValue);
		if (response.status == 200 || response.status == 202) {
			//navigation.navigate('RegisterDetailsScreen',{email: values.email})
			console.log('udało sie zarejestrować');
			//props.navigation.navigate("RegisterDetails")
			//	history.push('/RegisterDetail');
		} else {
			console.log('Nieprawidłowe dane');
		}
		//console.log(response.data);
	};

	return (
		<View>
			<Formik
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
							style={styles.input}
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
							style={styles.input}
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
							style={styles.input}
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
							style={styles.input}
							onChangeText={handleChange('name')}
							onBlur={handleBlur('name')}
							value={values.name}
						/>
						{errors.name && touched.name && <Text style={{ color: 'red', minHeight: 20, width: 300 }}>{errors.name}</Text>}

						<View style={styles.pickerView}>
							<Picker style={styles.pickerStyle} selectedValue={genderValue} onValueChange={(itemValue) => setGenderValue(itemValue)}>
								{renderGenderList()}
							</Picker>
						</View>

						<View style={styles.pickerView}>
							<Picker style={styles.pickerStyle} selectedValue={orientationValue} onValueChange={(itemValue) => setorientationValue(itemValue)}>
								{renderOrientationList()}
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
export default RegisterPanel;

const styles = StyleSheet.create({
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
/*
                     <Button onPress={showMode} title="Show date picker!" style={styles.loginButton} mode="contained" >
                            {date ? "Wybierz date" : "elo"}
                        </Button>
                        {show && (
                            <DateTimePicker
                                locale={'pl'}
                                testID="dateTimePicker"
                                value={values.dateBirth}
                                mode={"date"}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />

*/

/*
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import { DatePickerModal } from 'react-native-paper-dates';
import 'intl';
import 'intl/locale-data/jsonp/en';
//import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import { Picker } from '@react-native-picker/picker';
import AuthenticationService, { login } from '../../service/AuthenticationService';

const RegisterPanel = (props) => {

    let schema = yup.object().shape({
        /*email: yup.string().email('Nieprawidlowy email').required('email jest wymagany'),
        password: yup.string().trim().min(6, 'Haslo jest za krotkie').required('haslo jest wymagane'),
        confirmPassword: yup.string().equals([yup.ref('password'), null], 'Hasla sa rozne'),
        name: yup.string().min(2, 'imię jest za krótkie').max(50, 'Imię jest za długie!').required('imię jest wymagane')
        // dateBirth: yup.date().required('Data urodzenia jest wymagana').nullable(),
       
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const onDismissSingle = () => {
        setOpen(false);
    }

    const onConfirmSingle = (params) => {
        setOpen(false);
        setDate(params.date);
    };

    const [pickerValue, setPickerValue] = useState('Kobieta')

    const register = async (values) => {
        console.log("Dane: "+values.email+" "+values.password)
        const elo = AuthenticationService.register(values.email, values.password)
        console.log(elo)

       // history.push("/Main")

    }

    return (
        <View>
            <Formik
                initialValues={{ email: "", password: "", confirmPassword: "", name: "" }}
                //onSubmit={async values => {// history.push("/Main")}}
                onSubmit={values => register(values)}

                validateOnMount={true}
                validationSchema={schema}
            >
                {({ handleSubmit, handleChange, handleBlur, errors, values, touched }) => (
                    <>
                        <TextInput
                            mode="outlined"
                            label="E-mail"
                            placeholder="Wpisz e-mail..."
                            style={styles.input}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            right={<TextInput.Icon name={!errors.email ? "check" : "close"} />}
                        />
                        {(errors.email && touched.email) &&
                            <Text style={{ color: 'red', minHeight: 20, width: 300, }}>
                                {errors.email}
                            </Text>
                        }

                        <TextInput
                            mode="outlined"
                            label="Hasło"
                            placeholder="Wpisz hasło..."
                            style={styles.input}
                            secureTextEntry={!showPassword}
                            right={<TextInput.Icon name={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)} />}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                        {(errors.password && touched.password) &&
                            <Text style={{ color: 'red', minHeight: 20, width: 300, }}>
                                {errors.password}
                            </Text>
                        }

                        <TextInput
                            mode="outlined"
                            label="Potwierdz hasło"
                            placeholder="Wpisz hasło..."
                            style={styles.input}
                            secureTextEntry={!showConfirmPassword}
                            right={<TextInput.Icon name={showConfirmPassword ? "eye-off" : "eye"} onPress={() => setShowConfirmPassword(!showConfirmPassword)} />}
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                        />

                        {(errors.confirmPassword && touched.confirmPassword) &&
                            <Text style={{ color: 'red', minHeight: 20, width: 300, }}>
                                {errors.confirmPassword}
                            </Text>
                        }

                        <TextInput
                            mode="outlined"
                            label="Podaj swoje imię"
                            placeholder="Wpisz imię..."
                            style={styles.input}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                        />

                        {(errors.name && touched.name) &&
                            <Text style={{ color: 'red', minHeight: 20, width: 300, }}>
                                {errors.name}
                            </Text>
                        }

                        <View style={styles.pickerView}>
                            <Picker
                                style={styles.pickerStyle}
                                selectedValue={pickerValue}
                                onValueChange={(itemValue) => setPickerValue(itemValue)}
                            >

                                <Picker.Item label="Kobieta" value="Kobieta"></Picker.Item>
                                <Picker.Item label="Mężczyzna" value="Mężczyzna"></Picker.Item>
                                <Picker.Item label="Inna" value="Inna"></Picker.Item>

                            </Picker>
                        </View>


                        <Button onPress={() => setOpen(true)} uppercase={false} mode="contained">
                            {date.toLocaleDateString('en-US', { dateStyle: 'medium' })}
                        </Button>
                        <Text>
                            {date.toLocaleDateString('pl', { dateStyle: 'medium' })}
                        </Text>
                        <DatePickerModal
                            //locale={'en'} optional, default: automatic
                            mode="single"
                            visible={open}
                            onDismiss={onDismissSingle}
                            date={date}
                            onConfirm={onConfirmSingle}
                            validRange={{
                                startDate: new Date(1900, 1, 2),  // optional
                                endDate: new Date(), // optional
                            }}
                            // onChange={() => change} // same props as onConfirm but triggered without confirmed by user
                            saveLabel="Zapisz" // optional
                            label="Wybierz date urodzenia" // optional
                            animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
                        />
                      
                        <Button
                            type="submit"
                            title="submit"
                            onPress={handleSubmit}
                            mode="contained"
                        >
                            Wyślij
                        </Button>

                    </>
                )}
            </Formik>
        </View>
    );
};
export default RegisterPanel;


const styles = StyleSheet.create({
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
        marginBottom: 20

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
    }
});

*/
