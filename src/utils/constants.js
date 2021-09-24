import { StyleSheet, Text, View, Image } from 'react-native';

const { Dimensions } = require('react-native');
export const {width, height} = Dimensions.get('screen');

export const CARD = {
    WIDTH: width * 0.8,
    HEIGHT: height * 0.60,
    BORDER_RADIUS: 20,
    OUT_OF_SCREEN: width + 0.5 * width,
};

export const VERTICAL_MARGIN = height * 0.022;

export const ACTION_OFFSET = 100;