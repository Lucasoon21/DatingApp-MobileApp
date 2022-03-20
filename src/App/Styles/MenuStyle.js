import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,

        
    },
    link: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopColor: 'rgba(220,220,220,1)',
        borderTopWidth: 2,
        borderStyle: 'solid',
        backgroundColor:  'rgba(255,255,255,1)',
        height: 50,
        
    },
    icon: {
        padding: 10
    }
});

export { styles }