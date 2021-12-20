import React from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, Animated, Container } from 'react-native';
import { Feather, Entypo, MaterialIcons   } from '@expo/vector-icons'; 
import { NativeRouter, Route, Link } from "react-router-native";
import Menu from "../control/Menu";
//import {styles} from '../utils/styles';
import { ACTION_OFFSET } from '../../utils/constants';
import { CARD } from '../../utils/constants';

function CardUser({name, source, age, isFirst, swipe, tiltSign, ...rest}) {

    const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
        inputRange: [-ACTION_OFFSET, 0, ACTION_OFFSET],
        outputRange: ['8deg', '0deg', '-8deg'],
      });

      const animatedCardStyle = {
        transform: [...swipe.getTranslateTransform(), { rotate }],
      };

    return (
        // <Animated.View style={styles.container} {...rest}>  
        <Animated.View style={[styles.container, isFirst && animatedCardStyle]} {...rest}>  
            <Image source={source} style={styles.image} />
            <Text style={styles.name}>{name}, {age} </Text>
            <Text style={styles.localitation}> 10km stąd </Text>
        </Animated.View>
    );
}
export default CardUser



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

      shadowColor: "#000",
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


})

