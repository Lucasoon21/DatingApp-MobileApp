import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, Animated, Container } from 'react-native';
import { Feather, Entypo, MaterialIcons } from '@expo/vector-icons';
import Menu from '../Controls/Menu';
//import {styles} from '../utils/styles';
import { ACTION_OFFSET } from '../../utils/constants';
import { CARD } from '../../utils/constants';
import { Constants, Spacings, Carousel } from 'react-native-ui-lib';

function CardUser({ name,  profile, images, age, isFirst, swipe, tiltSign, ...rest }) {
	const [gallery, setGallery] = useState([]);

    useEffect(() => {
        setGallery(images);
    },[])

	return (


		<View style={[styles.container]} >
			 {profile.image? (
                <Image source={{ uri: profile.image.imageLink }} style={styles.image} key={profile.image.idImgur}  />
			) : (
				<Image source={require('../../Images/default.jpg')} style={styles.image} />
			)} 
			<Text style={styles.name}>
				{name ?? ""}, {age ?? ""}{' '}
			</Text>
			<Text style={styles.localitation}> 10km stąd </Text>
		</View>
	);
}
export default CardUser;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 30,
		backgroundColor: 'rgba(255,255,255,1)',
		//borderColor: 'rgba(220,220,220,1)',
		// borderWidth: 2,
		//borderStyle: 'solid',
		padding: 10,

		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,

		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,

		elevation: 10,
	},
	image: {
		maxWidth: CARD.WIDTH,
		maxHeight: CARD.HEIGHT,
		width: CARD.WIDTH,
		height: CARD.HEIGHT,
		borderRadius: 1,
		// borderRadius: CARD.BORDER_RADIUS,

		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	name: {
		fontSize: 36,
		fontWeight: 'bold',
		color: 'black',
		textAlign: 'center',
	},
	localitation: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'black',
		textAlign: 'center',
	},
});
