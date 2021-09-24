import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const DayOfMonth = (props) => {

    const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]

    return (
        <>
            <Picker style={styles.input}
                selectedValue={props.birthDay}
                onValueChange={(itemValue, itemIndex) => {
                    props.setBirthDay(itemValue)
                }}
            >
                {
                    days.map((day, index) => {
                        if (index < props.birthMonthDay) {
                            return (
                                <Picker.Item value={day.toString()} label={day.toString()} key={day.toString()} />
                            )
                        }
                        else {
                            return null;
                        }
                    })}
            </Picker>
        </>
    );
};
export default DayOfMonth;


const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
    },
    input: {
        maxHeight: 50,
        width: 200,
        marginBottom: 20,
    },
    forgot_password: {
        textAlign: 'right',
        width: 200,
    },
    registerLink: {
        flexDirection: 'row',
        width: 400,
        textAlign: 'right',
        alignItems: 'center',
        justifyContent: 'center',
    },
    registerButton: {
        color: 'blue',
    },
    loginButton: {
        width: 200,
    },
});
