import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, TouchableOpacity, ScrollView, StatusBar, TextInput } from 'react-native';
import Menu from "../Controls/Menu";
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../Styles/ProfileStyle';
import { Picker } from '@react-native-picker/picker';
import { render } from 'react-dom';
import { Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


const weightArray = new Array(120).fill().map((value, index) => ({ id: index + 30 }));

const heightArray = new Array(100).fill().map((value, index) => ({ id: index + 100 }));

const EditInfoScreen = (props) => {

   // const goBack = () => props.navigation.goBack();

    const [work, setWork] = useState("");
    const [characterWorkCount, setCharacterWorkCount] = useState(work.length);
    const MAX_LENGTH_WORK = 50;

    const [cigarette, setCigarette] = useState("");
    const [alcohol, setAlcohol] = useState("");
    const [children, setChildren] = useState("");
    const [religion, setReligion] = useState("");
    const [education, setEducation] = useState("");
    const [orientation, setOrientation] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");






    return (
        <View style={styles.container}>

            {/* <TouchableOpacity onPress={goBack} style={styles.buttonBack}>
                <Ionicons name="arrow-back" size={40} color="rgba(50,50,50,1)" />
                <Text style={styles.textBack}>Cofnij</Text>
            </TouchableOpacity> */}

            <ScrollView style={styles.scrollView}>
                <View style={styles.scrollContainer}>

                    <View style={[styles.sectionContainer, styles.sectionContainerFlex]}>
                        <MaterialIcons name="work" size={24} color="black" />
                        <View style={styles.workTextContainer}>
                            <Text style={styles.infoHeader}>Zawód</Text>
                            <Text style={styles.characterWorkCount}>{characterWorkCount}/{MAX_LENGTH_WORK}</Text>
                        </View>

                        <TextInput
                            onChangeText={text => {
                                setWork(text)
                                setCharacterWorkCount(text.length)
                            }}
                            value={work}
                            style={[styles.textInput, styles.textInputWork]}
                            editable
                            maxLength={MAX_LENGTH_WORK}
                        />

                    </View>

                    <View style={[styles.sectionContainer, styles.sectionContainerFlex]}>
                        <MaterialCommunityIcons name="human-male-height-variant" size={24} color="black" />
                        <Text style={styles.infoHeader}>Wzrost</Text>

                        <Picker
                            style={styles.pickerStyle}
                            selectedValue={height}
                            onValueChange={(itemValue) => setHeight(itemValue)}
                        >
                            <Picker.Item label="Nie chcę podawać" value="Nie chcę podawać"  ></Picker.Item>
                            {heightArray.map(((item) => (
                                <Picker.Item label={item.id.toString() + " cm"} value={item.id.toString() + " cm"} key={item.id}></Picker.Item>
                            )))}
                            <Picker.Item label=">= 200 cm" value=">= 200 cm"></Picker.Item>
                        </Picker>
                    </View>

                    <View style={[styles.sectionContainer, styles.sectionContainerFlex]}>
                        <FontAwesome5 name="weight" size={24} color="black" />
                        <Text style={styles.infoHeader}>Waga</Text>

                        <Picker
                            style={styles.pickerStyle}
                            selectedValue={weight}
                            onValueChange={(itemValue) => setWeight(itemValue)}
                        >
                            <Picker.Item label="Nie chcę podawać" value="Nie chcę podawać" ></Picker.Item>
                            <Picker.Item label="< 30 kg" value="< 30 kg" ></Picker.Item>
                            {weightArray.map(((item) => (
                                <Picker.Item label={item.id.toString() + " kg"} value={item.id.toString() + " kg"} key={item.id + 200}></Picker.Item>
                            )))}
                            <Picker.Item label=">= 150 kg" value=">= 150 kg"></Picker.Item>
                        </Picker>

                    </View>

                    <View style={[styles.sectionContainer, styles.sectionContainerFlex]}>
                        <FontAwesome name="intersex" size={24} color="black" />
                        <Text style={styles.infoHeader}>Orientacja</Text>

                        <Picker
                            style={styles.pickerStyle}
                            selectedValue={orientation}
                            onValueChange={(itemValue) => setOrientation(itemValue)}
                        >
                            <Picker.Item label="Heteroseksualizm" value="Heteroseksualizm" ></Picker.Item>
                            <Picker.Item label="Homoseksualizm" value="Homoseksualizm"></Picker.Item>
                            <Picker.Item label="Biseksualizm" value="Biseksualizm"></Picker.Item>
                            <Picker.Item label="Aseksualizm" value="Aseksualizm"></Picker.Item>
                        </Picker>
                    </View>

                    <View style={[styles.sectionContainer, styles.sectionContainerFlex]}>
                        <Ionicons name="school" size={24} color="black" />
                        <Text style={styles.infoHeader}>Wykształcenie</Text>

                        <Picker
                            style={styles.pickerStyle}
                            selectedValue={education}
                            onValueChange={(itemValue) => setEducation(itemValue)}
                        >
                            <Picker.Item label="Podstawowe" value="Podstawowe" ></Picker.Item>
                            <Picker.Item label="Gimnazjalne" value="Gimnazjalne"></Picker.Item>
                            <Picker.Item label="Zasadnicze zawodowe" value="Zasadnicze zawodowe"></Picker.Item>
                            <Picker.Item label="Zasadnicze branżowe" value="Zasadnicze branżowe"></Picker.Item>
                            <Picker.Item label="Średnie" value="Średnie"></Picker.Item>
                            <Picker.Item label="Wyższe 1 stopnia" value="Wyższe 1 stopnia"></Picker.Item>
                            <Picker.Item label="Wyższe 2 stopnia" value="Wyższe 2 stopnia"></Picker.Item>
                            <Picker.Item label="Wyższe 3 stopnia" value="Wyższe 3 stopnia"></Picker.Item>
                        </Picker>
                    </View>


                    <View style={[styles.sectionContainer, styles.sectionContainerFlex]}>
                        <FontAwesome5 name="church" size={24} color="black" />
                        <Text style={styles.infoHeader}>Religia</Text>

                        <Picker
                            style={styles.pickerStyle}
                            selectedValue={religion}
                            onValueChange={(itemValue) => setReligion(itemValue)}
                        >
                            <Picker.Item label="Katolicyzm" value="Katolicyzm" ></Picker.Item>
                            <Picker.Item label="Protestantyzm" value="Protestantyzm"></Picker.Item>
                            <Picker.Item label="Prawosławizm" value="Prawosławizm"></Picker.Item>
                            <Picker.Item label="Islam" value="Islam"></Picker.Item>
                            <Picker.Item label="Ateizm" value="Ateizm"></Picker.Item>
                        </Picker>
                    </View>

                    <View style={[styles.sectionContainer, styles.sectionContainerFlex]}>
                        <MaterialIcons name="child-friendly" size={24} color="black" />
                        <Text style={styles.infoHeader}>Dzieci</Text>

                        <Picker
                            style={styles.pickerStyle}
                            selectedValue={children}
                            onValueChange={(itemValue) => setChildren(itemValue)}
                        >
                            <Picker.Item label="Nigdy nie chcę mieć dzieci" value="Nigdy nie chcę mieć dzieci" ></Picker.Item>
                            <Picker.Item label="Nie chcę mieć dzieci teraz ale w dalszej przyszłości" value="Nie chcę mieć dzieci teraz ale w dalszej przyszłości"></Picker.Item>
                            <Picker.Item label="Mam już dzieci i nie chcę więcej" value="Mam już dzieci i nie chcę więcej"></Picker.Item>
                            <Picker.Item label="Mam już dzieci oraz chcę więcej" value="Mam już dzieci oraz chcę więcej"></Picker.Item>
                            <Picker.Item label="Chcę mieć dzieci jak najszbciej" value="Chcę mieć dzieci jak najszbciej"></Picker.Item>
                        </Picker>
                    </View>

                    <View style={[styles.sectionContainer, styles.sectionContainerFlex]}>
                        <Entypo name="drink" size={24} color="black" />
                        <Text style={styles.infoHeader}>Alkohol</Text>

                        <Picker
                            style={styles.pickerStyle}
                            selectedValue={alcohol}
                            onValueChange={(itemValue) => setAlcohol(itemValue)}
                        >
                            <Picker.Item label="Nie piję" value="Nie piję" ></Picker.Item>
                            <Picker.Item label="Piję okazjonalnie" value="Piję okazjonalnie"></Picker.Item>
                            <Picker.Item label="Piję rzadko" value="Piję rzadko"></Picker.Item>
                            <Picker.Item label="Piję dosyć często" value="Piję dosyć często"></Picker.Item>
                            <Picker.Item label="Piję nałogowo" value="Piję nałogowo"></Picker.Item>
                        </Picker>
                    </View>



                    <View style={[styles.sectionContainer, styles.sectionContainerFlex]}>
                        <MaterialCommunityIcons name="cigar" size={24} color="black" />
                        <Text style={styles.infoHeader}>Papierosy</Text>
                        <Picker
                            style={styles.pickerStyle}
                            selectedValue={cigarette}
                            onValueChange={(itemValue) => setCigarette(itemValue)}
                        >
                            <Picker.Item label="Nie palę" value="Nie palę" ></Picker.Item>
                            <Picker.Item label="Palę okazjonalnie" value="Palę okazjonalnie"></Picker.Item>
                            <Picker.Item label="Palę rzadko" value="Palę rzadko"></Picker.Item>
                            <Picker.Item label="Palę dosyć często" value="Palę dosyć często"></Picker.Item>
                            <Picker.Item label="Palę nałogowo" value="Palę nałogowo"></Picker.Item>
                        </Picker>

                    </View>
                </View>
            </ScrollView>
        </View>
    )

};
export default EditInfoScreen;

