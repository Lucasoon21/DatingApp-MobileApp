import { StyleSheet, StatusBar } from 'react-native';
import { CARD } from '../../utils/constants';

const styles = StyleSheet.create({
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
    imageContainer: {
        
        width: '30%',
        maxWidth: '30%',
        height: '100%',
        maxHeight: 180,
       // maxHeight: '100%',
        marginHorizontal: '1.5%',
        marginVertical: '3%'
    },
    image: {
		maxWidth: '100%',
        minHeight: '80%',
		maxHeight: '80%',
		//width: '100%',
        aspectRatio: 1/1,
		//height:'100%',
		borderRadius: 1,
		// borderRadius: CARD.BORDER_RADIUS,
        justifyContent: 'center',
        alignItems: 'center',
		padding: 0,
		margin: 0,
        resizeMode: 'cover',
	},
    imagesGroup: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    buttomImgRemove: {
        height: '20%',
        backgroundColor: 'rgba(13,153,193,1)',
        color: 'white',
        
    },
    addImageContainer: {
        width: '30%',
        maxWidth: '30%',
        maxHeight: 180,
        height: '100%',
//        height: 180,
       // maxHeight: '100%',
        marginHorizontal: '1.5%',
        marginVertical: '3%',
        backgroundColor: 'rgba(255, 255, 55,1)'
    },
    addImageButton: {
        height: '100%',
        flexWrap: 'wrap',
        color: 'white',
        width: '100%',
        backgroundColor: 'rgba(13,153,193,1)',
    },

});

export { styles }