import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import Menu from '../Controls/Menu';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../Styles/ProfileStyle';
import HobbyButton from '../Controls/HobbyButton';
import ProfileService from '../../service/ProfileService';
import { Button } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';

const EditHobbyScreen = (props) => {
	 const goBack = () => props.navigation.goBack();

    const [hobby, setHobby] = useState([]);
	
	useEffect(() => {
		async function fetchProfileHobby() {
			let response = await ProfileService.getProfileHobby();
            setHobby(response.data);
		}
		fetchProfileHobby();
	}, []);

    const changeProfileHobby = async () => {
        let response = await ProfileService.changeProfileHobby(hobby)
		
    }

	const changeValueHobby = (index, status) => {
		//console.log("index="+index)
		//console.log("status="+status)
		let items = [...hobby]
		let item = {...items[index]}
		item.decision = status===true? 1:0
		items[index]=item;
		setHobby(items)
		//console.log("===========================================================")
		//console.log(hobby)
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={goBack} style={styles.buttonBack}>
                <Ionicons name="arrow-back" size={40} color="rgba(250,250,250,1)" />
            </TouchableOpacity> 
			<View style={[styles.sectionContainer]}>
				<Text style={styles.textHeader}>Hobby</Text>
				<View style={styles.hobbyContainerEdit}>
                    {
                        hobby.map((hobby,ind) => {
							//console.log(hobby)
                            return <HobbyButton text={hobby.name} edit={true} status={hobby.decision==0? false : true} index={ind} key={hobby.hobbyId} changeValue={changeValueHobby} />;
                        })
                    }
					{/* <HobbyButton text='Sport' edit={true} status={true} />
					<HobbyButton text='Muzyka' edit={true} status={true} />
					<HobbyButton text='Gotowanie' edit={true} status={true} />
					<HobbyButton text='Taniec' edit={true} status={true} />
					<HobbyButton text='Podróże' edit={true} status={true} />
					<HobbyButton text='Sport' edit={true} status={false} />
					<HobbyButton text='Muzyka' edit={true} status={false} />
					<HobbyButton text='Gotowanie' edit={true} status={true} />
					<HobbyButton text='Taniec' edit={true} status={true} />
					<HobbyButton text='Podróże' edit={true} status={true} />
					<HobbyButton text='Sport' edit={true} status={true} />
					<HobbyButton text='Muzyka' edit={true} status={true} />
					<HobbyButton text='Gotowanie' edit={true} status={true} />
					<HobbyButton text='Taniec' edit={true} status={true} /> */}
				</View>
                <Button type='submit' title='submit' onPress={() => changeProfileHobby()} mode='contained'>
						<Entypo name='save' size={25} color='rgba(250,250,250,1)' />
						<Text style={{ textAlignVertical: 'center', textAlign: 'center', fontSize: 25 }}>Zapisz</Text>
					</Button>
			</View>
			<Menu settings={true} />
		</View>
	);
};
export default EditHobbyScreen;
