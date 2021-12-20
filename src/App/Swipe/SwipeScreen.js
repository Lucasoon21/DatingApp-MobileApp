import React, { useState, useRef, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, Animated, PanResponder, TouchableOpacity } from 'react-native';
import { Feather, Entypo, MaterialIcons } from '@expo/vector-icons';
import { NativeRouter, Route, Link } from "react-router-native";
import Menu from "../control/Menu";
import CardUser from "./CardUser"
import { person as personArray } from "../control/data"
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { CARD, ACTION_OFFSET } from '../../utils/constants';
import { Fontisto } from '@expo/vector-icons';
import DetailsProfileScreen from '../DetailsProfile/DetailsProfileScreen';


//const SwipeScreen = (props) => {
const SwipeScreen = (props) => {
    const profile = () => props.navigation.navigate("ProfileDetails")



    const [person, setPerson] = useState(personArray);

    const swipe = useRef(new Animated.ValueXY()).current;
    const tiltSign = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (!person.length) {
          setPerson(personArray);
        }
      }, [person.length])

      const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, { dx, dy, y0 }) => {
          swipe.setValue({ x: dx, y: dy });
          tiltSign.setValue(y0 > CARD.HEIGHT / 2 ? 1 : -1);
        },
        onPanResponderRelease: (_, { dx, dy }) => {
          const direction = Math.sign(dx);
          const isActionActive = Math.abs(dx) > ACTION_OFFSET;
    
          if (isActionActive) {
            Animated.timing(swipe, {
              duration: 200,
              toValue: {
                x: direction * CARD.OUT_OF_SCREEN,
                y: dy,
              },
              useNativeDriver: true,
            }).start(removeTopCard);
          } else {
            Animated.spring(swipe, {
              toValue: {
                x: 0,
                y: 0,
              },
              useNativeDriver: true,
              friction: 5,
            }).start();
          }
        },
      });


      const removeTopCard = useCallback(() => {
        setPerson((prevState) => prevState.slice(1));
        swipe.setValue({ x: 0, y: 0 });
      }, [swipe]);
    
      
      const handleChoice = useCallback(
        (direction) => {
          Animated.timing(swipe.x, {
            toValue: direction * CARD.OUT_OF_SCREEN,
            duration: 400,
            useNativeDriver: true,
          }).start(removeTopCard);
        },
        [removeTopCard, swipe.x]
      );
    


    return (
        <>
            <View style={styles.container}>
                {person.map(({ name, source, age }, index) => {
                    const isFirst = index === 0;
                   // const panHandlers = isFirst ? panResponder.panHandlers : {};
                    const dragHandlers = isFirst ? panResponder.panHandlers : {};
                    return (
                        <CardUser key={name} name={name} source={source} age={age} isFirst={isFirst} 
                            swipe={swipe}
                            tiltSign={tiltSign}
                            {...dragHandlers} 
                            />
                    );
                }).reverse()
                    }

                <View style={styles.actionButton}>
                    <TouchableOpacity style={styles.button} onPress={() => handleChoice(-1)}>
                        <AntDesign name="like2" size={40} color="green" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={profile}>
                        <Ionicons name="md-person-outline" size={40} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handleChoice(1)}>
                        <AntDesign name="dislike2" size={40} color="red" />
                    </TouchableOpacity>
                </View>

            </View>
            <Menu swipe={true}/>
        </>
    );
};
export default SwipeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    actionButton: {

        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,1)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        bottom: 70,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'rgba(220,220,220,1)',
        borderLeftWidth: 0,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,

    },
    button: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderLeftWidth: 2,
        borderColor: 'rgba(220,220,220,1)',
        padding: 10,
    },

});

                        {/*<InteractButton />
                        <Octicons name="person" size={40} color="black" />
                        <MaterialIcons name="person-outline" size={40} color="black" />
                        <Ionicons name="person-circle-outline" size={40} color="black" />
                        <MaterialIcons name="person-outline" size={45} color="black" />
                    */}
                                            {/*<InteractButton />
                        <AntDesign name="dislike1" size={40} color="black" />
                        */}
                                                {/*<InteractButton />
                        <AntDesign name="like1" size={40} color="black" />
                        <SimpleLineIcons name="like" size={40} color="black" />
                        */}