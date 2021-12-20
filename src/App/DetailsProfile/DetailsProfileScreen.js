import React from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import Menu from "../control/Menu";
import { CARD } from '../../utils/constants';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import HobbyButton from '../control/HobbyButton';
import RelationButton from '../control/RelationButton';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeRouter, Route, Link } from "react-router-native";

const DetailsProfileScreen = (props) => {
    const goBack = () => props.navigation.goBack();
    const goEditPhoto = () => props.navigation.navigate("EditPhoto")
    const goEditDescription = () => props.navigation.navigate("EditDescription")
    const goEditInfo = () => props.navigation.navigate("EditInfo")
    const goEditHobby = () => props.navigation.navigate("EditHobby")
    const goEditSearching = () => props.navigation.navigate("EditSearching")

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.scrollContainer}>
                    {props.route.params.myProfile ? null : (
                        <TouchableOpacity onPress={goBack} style={styles.buttonBack}>
                            <Ionicons name="arrow-back" size={40} color="rgba(250,250,250,1)" />
                        </TouchableOpacity>
                    )}
                    {props.route.params.myProfile ? (
                        <TouchableOpacity onPress={goEditPhoto} style={styles.buttonEdit}>
                            <MaterialIcons name="edit" size={40} color="rgba(250,250,250,1)" />
                        </TouchableOpacity>
                    ) : null}


                    <Image source={require('../../Images/person1.jpg')} style={styles.image} />

                    <View style={styles.sectionInfo}>
                        {props.route.params.myProfile ? (
                            <TouchableOpacity onPress={goEditDescription} style={styles.buttonEditProfile}>
                                <MaterialIcons name="edit" size={30} color="rgba(0,0,0,1)" />
                            </TouchableOpacity>
                        ) : null}
                        <Text style={styles.name}>Michał, 22</Text>
                        <Text style={styles.localization}><Entypo name="location-pin" size={25} color="black" /> 88 km stąd</Text>
                        <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                            ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                            anim id est laborum
                        </Text>
                    </View>
                    <View style={styles.sectionInfo}>
                        {props.route.params.myProfile ? (
                            <TouchableOpacity onPress={goEditInfo} style={styles.buttonEditProfile}>
                                <MaterialIcons name="edit" size={30} color="rgba(0,0,0,1)" />
                            </TouchableOpacity>
                        ) : null}
                        <Text style={styles.textHeader}>O mnie</Text>
                        <View style={styles.personalInfo}>
                            <View style={styles.infoGroup}>
                                <Text style={styles.infoHeader}>Imię</Text>
                                <Text style={styles.info}>Łukasz</Text>
                            </View>

                            <View style={styles.infoGroup}>
                                <Text style={styles.infoHeader}>Zawód</Text>
                                <Text style={styles.info}>Student</Text>
                            </View>

                            <View style={styles.infoGroup}>
                                <Text style={styles.infoHeader}>Wzrost</Text>
                                <Text style={styles.info}>175 cm</Text>
                            </View>

                            <View style={styles.infoGroup}>
                                <Text style={styles.infoHeader}>Waga</Text>
                                <Text style={styles.info}>nie podano</Text>
                            </View>

                            <View style={styles.infoGroup}>
                                <Text style={styles.infoHeader}>Płeć</Text>
                                <Text style={styles.info}>Mężczyzna</Text>
                            </View>

                            <View style={styles.infoGroup}>
                                <Text style={styles.infoHeader}>Orientacja</Text>
                                <Text style={styles.info}>Heteroseksualny/a</Text>
                            </View>

                            <View style={styles.infoGroup}>
                                <Text style={styles.infoHeader}>Znak zodiaku</Text>
                                <Text style={styles.info}>Waga</Text>
                            </View>

                            <View style={styles.infoGroup}>
                                <Text style={styles.infoHeader}>Wykszatałcenie</Text>
                                <Text style={styles.info}>Magisterskie</Text>
                            </View>

                            <View style={styles.infoGroup}>
                                <Text style={styles.infoHeader}>Religia</Text>
                                <Text style={styles.info}>Katolicyzm</Text>
                            </View>

                            <View style={styles.infoGroup}>
                                <Text style={styles.infoHeader}>Dzieci</Text>
                                <Text style={styles.info}>W przyszłości</Text>
                            </View>

                            <View style={styles.infoGroup}>
                                <Text style={styles.infoHeader}>Alkohol</Text>
                                <Text style={styles.info}>Okazjonalnie</Text>
                            </View>

                            <View style={styles.infoGroup}>
                                <Text style={styles.infoHeader}>Papierosy</Text>
                                <Text style={styles.info}>Nigdy</Text>
                            </View>
                            <Text>Dodac kolor oczu</Text>
                        </View>
                    </View>


                    <View style={styles.sectionInfo}>
                        {props.route.params.myProfile ? (
                            <TouchableOpacity onPress={goEditHobby} style={styles.buttonEditProfile}>
                                <MaterialIcons name="edit" size={30} color="rgba(0,0,0,1)" />
                            </TouchableOpacity>
                        ) : null}
                        <Text style={styles.textHeader}>Zainteresowania</Text>
                        <View style={styles.hobbyContainer}>
                            <HobbyButton text="Sport" />
                            <HobbyButton text="Muzyka" />
                            <HobbyButton text="Gotowanie" />
                            <HobbyButton text="Taniec" />
                            <HobbyButton text="Podróże" />
                            <HobbyButton text="Sport" />
                            <HobbyButton text="Muzyka" />
                            <HobbyButton text="Gotowanie" />
                            <HobbyButton text="Taniec" />
                            <HobbyButton text="Podróże" />
                            <HobbyButton text="Sport" />
                            <HobbyButton text="Muzyka" />
                            <HobbyButton text="Gotowanie" />
                            <HobbyButton text="Taniec" />
                        </View>
                    </View>

                    <View style={styles.sectionInfo}>
                        {props.route.params.myProfile ? (
                            <TouchableOpacity onPress={goEditSearching} style={styles.buttonEditProfile}>
                                <MaterialIcons name="edit" size={30} color="rgba(0,0,0,1)" />
                            </TouchableOpacity>
                        ) : null}
                        <Text style={styles.textHeader}>Szukam ...</Text>
                        <View style={styles.hobbyContainer}>
                            <RelationButton text="Związku" type={0} />
                            {/*TAK, SZUKAM*/}
                            <RelationButton text="FWB" type={1} />
                            {/*NIE, NIE SZUKAM TEGO*/}
                            <RelationButton text="Przyjaźni" type={2} />
                            {/* JEST MI TO OBOJETNE */}
                            <RelationButton text="Nie wiem" type={0} />
                            <RelationButton text="Rozmowy" type={0} />
                            <RelationButton text="ONS" type={1} />
                        </View>
                    </View>
                   
                </View>
            </ScrollView>
            <Menu swipe={props.route.params.myProfile ? false : true} profile={props.route.params.myProfile ? true : false} />
        </View>
    );
};
export default DetailsProfileScreen;

const styles = StyleSheet.create({
    infoGroup: {
        paddingBottom: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    infoHeader: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    info: {
        fontSize: 18,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight,
        backgroundColor: 'rgba(220,220,220,1)',
        padding: 0,
    },
    scrollView: {
        width: '100%',
        marginBottom: 50,
    },
    scrollContainer: {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: 30,
    },
    buttonBack: {
        position: 'absolute',
        left: 10,
        top: 10,
        zIndex: 30,
    },
    buttonEditProfile: {
        position: 'absolute',
        right: 30,
        top: 35,
        zIndex: 30,
    },
    buttonEdit: {
        position: 'absolute',
        right: 20,
        top: 10,
        zIndex: 30,
        // backgroundColor: 'rgba(104, 104, 104, 0.67)',
        // height: 60,
        // width: 60,
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        // borderRadius: 50,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 12,
        // },
        // shadowOpacity: 0.58,
        // shadowRadius: 16.00,

        // elevation: 24,

    },

    image: {
        maxWidth: '100%',
        maxHeight: CARD.HEIGHT,
        width: '100%',
        height: CARD.HEIGHT,
        borderRadius: 1,
        // borderRadius: CARD.BORDER_RADIUS,
        backgroundColor: 'red',
        padding: 0,
        margin: 0,

    },
    sectionInfo: {
        backgroundColor: 'rgba(250,250,250,1)',
        width: '90%',
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 20,
        borderRadius: 20,
    },
    name: {
        fontSize: 35,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    localization: {
        fontSize: 25,
        marginBottom: 10,
    },
    description: {
        fontSize: 17,
    },
    textHeader: {
        fontSize: 30,
        fontWeight: "bold",
    },
    hobbyContainer: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'flex-end'
    },



});

{/* <View style={styles.header}>
                <TouchableOpacity onPress={goBack}>
                    <Ionicons name="arrow-back" size={40} color="rgba(50,50,50,1)" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Michał, 22</Text>
                <Text style={styles.headerText}>88 km stąd</Text>

            </View> */}