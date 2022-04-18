import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import Menu from '../Controls/Menu';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../Styles/ProfileStyle';
import HobbyButton from '../Controls/HobbyButton';
import RelationButton from '../Controls/RelationButton';
import ProfileService from '../../service/ProfileService';
import { Button } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';

const EditRelationshipScreen = (props) => {
	const goBack = () => props.navigation.goBack();

	const [relationship, setRelationship] = useState([]);
	useEffect(() => {
		async function fetchProfileRelationship() {
			let response = await ProfileService.getProfileRelationship();
			setRelationship(response.data);
		}
		fetchProfileRelationship();
	}, []);

	const changeValueRelationship = (index, status) => {
		//console.log("index="+index)
		//console.log("status="+status)
		let items = [...relationship];
		let item = { ...items[index] };
		item.decision = status;
		items[index] = item;
		setRelationship(items);
		//console.log("===========================================================")
		//console.log(hobby)
	};
    const changeRelationshipHobby = async () => {
        //console.log(relationship)
        let response = await ProfileService.changeProfileRelationship(relationship)
		
    }
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={goBack} style={styles.buttonBack}>
				<Ionicons name='arrow-back' size={40} color='rgba(250,250,250,1)' />
			</TouchableOpacity>
			<View style={[styles.sectionContainer]}>
				<Text style={styles.textHeader}>Szukam</Text>
				<View style={styles.hobbyContainerEdit}>
					{relationship.map((relationship, ind) => {
						//console.log(hobby)
						return <RelationButton text={relationship.name} edit={true} type={relationship.decision} index={ind} key={relationship.relationshipId} changeValue={changeValueRelationship} />;
					})}
					{/* <RelationButton text='Związku' type={0} edit={true} />
					
					<RelationButton text='FWB' type={1} edit={true} />
				
					<RelationButton text='Przyjaźni' type={2} edit={true} />
				
					<RelationButton text='Nie wiem' type={0} edit={true} />
					<RelationButton text='Rozmowy' type={0} edit={true} />
					<RelationButton text='ONS' type={1} edit={true} /> */}
				</View>
                <Button type='submit' title='submit' onPress={() => changeRelationshipHobby()} mode='contained'>
						<Entypo name='save' size={25} color='rgba(250,250,250,1)' />
						<Text style={{ textAlignVertical: 'center', textAlign: 'center', fontSize: 25 }}>Zapisz</Text>
					</Button>
			</View>
			<Menu profile={true}  {...props}/>
		</View>
	);
};
export default EditRelationshipScreen;
