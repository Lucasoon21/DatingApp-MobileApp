import { StyleSheet, Text, View, Image, Linking, Platform, StatusBar } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems: 'center',
        paddingTop: StatusBar.currentHeight,
        backgroundColor: 'rgba(220,220,220,1)',
        padding: 0,
    },
    sectionContainer: {
        backgroundColor: 'rgba(250,250,250,1)',
        width: '90%',
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 20,
        borderRadius: 20,
    },
    button: {
        // backgroundColor: 'rgba(20,20,200,1)',
        // display: 'flex',
        margin: 5,
    },
    buttonDeactivate: {
        fontWeight: 'bold',
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subText: {
        fontSize: 17,
        //fontWeight: 'bold',
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
    pickerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        maxHeight: 60,
        borderColor: 'silver',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 5,
        backgroundColor: 'rgba(245, 245, 245, 0.9)',
        minHeight: 60,
        marginBottom: 20

    },
    pickerStyle: {
        width: '100%',
        height: 50,
        borderColor: 'red',
        borderWidth: 2,
        maxHeight: 50,
      
        
    },
    hobbyContainer: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'flex-end'
    },

})
export { styles }