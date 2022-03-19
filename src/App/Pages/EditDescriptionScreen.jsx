import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, TouchableOpacity, ScrollView, StatusBar, TextInput } from 'react-native';
import Menu from "../Controls/Menu";
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import { styles } from '../Styles/ProfileStyle';


const EditDescriptionScreen = (props) => {
    //const goBack = () => props.navigation.goBack();
    const [description, setDescription] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum");
    const [characterCount, setCharacterCount] = useState(description.length);
    const MAX_LENGTH = 250;

    return (
        <View style={styles.container}>

            {/* <TouchableOpacity onPress={goBack} style={styles.buttonBack}>
                <Ionicons name="arrow-back" size={40} color="rgba(50,50,50,1)" />
                <Text style={styles.textBack}>Cofnij</Text>
            </TouchableOpacity> */}

            <View style={styles.sectionContainer}>
                <Text style={styles.headerText}>Edycja opisu </Text>

                {/* <TextInput
                    mode="outlined"
                  //  label="Opis"
                    placeholder="Opisz siebie, napisz coś ciekawego, bądź kreatywny!"
                    onChangeText={() => { alert("aa") }}
                    value={description}
                    multiline
                    numberOfLines={10}
                /> */}
                <TextInput
                    multiline
                    numberOfLines={9}
                    onChangeText={text => {
                        setDescription(text)
                        setCharacterCount(text.length)
                    }}
                    value={description}
                    style={styles.textInput}
                    editable
                    maxLength={MAX_LENGTH}
                />
                <Text style={styles.characterCount}>{characterCount}/{MAX_LENGTH}</Text>

                <Button
                    type="submit"
                    title="submit"
                    onPress={() => { console.log(description) }}
                    mode="contained"
                    style={styles.buttonSave}
                >

                    <Entypo name="save" size={25} color="rgba(250,250,250,1)" />
                    <Text style={{ textAlignVertical: "center", textAlign: "center", fontSize: 25, }}>
                        Zapisz
                    </Text>

                </Button>
            </View>
            <Menu profile={true} />
        </View>
    );
};
export default EditDescriptionScreen;
