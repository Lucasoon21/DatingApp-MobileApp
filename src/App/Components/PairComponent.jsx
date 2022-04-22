import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, ScrollView, TouchableOpacity } from 'react-native';
import Menu from '../Controls/Menu';
import DetailsProfileScreen from '../Pages/DetailsProfileScreen';
import { styles, contact } from '../Styles/ChatStyle';
import MenuTop from '../Unused/MenuTop';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const PairComponent = (props) => {
	const goProfile = () => props.navigation.navigate('DetailsProfileScreen', {
		myProfile: false,
		profileUser: profileData,
	});
	const goChat = () => props.navigation.navigate('ChatScreen');
	const [profileData, setProfileData] = useState([]);

	useEffect(() => {
		if (props.profile != null) {
			setProfileData(props.profile);
		}
	}, []);

	return (
		<>
			<View style={contact.container}>
				<TouchableOpacity onPress={goProfile}>
					<View style={contact.left}>
						{profileData.image ? <Image source={{ uri: profileData.image.imageLink }} style={contact.image} /> : <Image source={require('../../Images/default.jpg')} style={contact.image} />}

						<View style={contact.textContainer}>
							<Text style={contact.text} numberOfLines={1}>
								{profileData.name},{profileData.age}
							</Text>
							<Text style={contact.text} numberOfLines={1}>
								22 km stąd
							</Text>
						</View>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={goChat}>
					<Entypo name='chevron-thin-right' size={40} color='black' />
				</TouchableOpacity>
			</View>

			{/* <View style={[contact.container, { justifyContent: "flex-start" }]}>
            <Image source={require('../Images/person1.jpg')} style={contact.image} />
            <View style={{ display: 'flex', alignItems: 'center', marginLeft: 30 }}>

                <Text style={contact.text}>Łukasz, 22</Text>
                <Text style={contact.text}>22 km stąd</Text>
            </View>
        </View>

        <View style={contact.container}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                <Image source={require('../Images/person4.jpeg')} style={[contact.image, { marginRight: 10 }]} />

                <Text style={contact.text}>Krystyrddfgfdg, 22</Text>
            </View>
            <Text style={contact.text}>22 km stąd</Text>
        </View> */}
		</>
	);
};
export default PairComponent;
