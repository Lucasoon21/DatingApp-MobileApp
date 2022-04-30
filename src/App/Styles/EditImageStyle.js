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
        minHeight: 180,
        maxHeight: 180,
       // maxHeight: '100%',
        marginHorizontal: '1.5%',
        marginVertical: '3%',
        position: 'relative',
       // paddingVertical: '2%',
    },
    image: {
		maxWidth: '100%',
        minHeight: '90%',
		maxHeight: '90%',
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
        position: 'absolute',
	},
    imagesGroup: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    buttomImgRemove: {
        height: 40,
        margin: 0,
        position: 'relative',
        //backgroundColor: 'rgba(13,153,193,0)',
        backgroundColor: 'rgba(250, 77, 152,0.81)',
        width: 40,
        padding: 0,
        right: 20,
        borderRadius: 150,
        color: 'white',
        
    },
    buttonsActionsContainer: {
        maxHeight: 100,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgba(250, 67, 152,0.81)',
        
        margin: 0,
        padding: 0,
        //flex: 1,
    },
    buttonAction: {
        width: '50%',
       // height: 50,
    },
    radioStyles: {
        position: 'absolute',
        bottom: 0,
        padding: 0,
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

    imageContainerNot: {
      //  width: '90%',
      //  maxWidth: '90%',
      //  height: '90%',
        minHeight: 180,
        maxHeight: 180,
        minWidth: 180,
        maxWidth: 180,
       // maxHeight: '100%',
        marginHorizontal: '1.5%',
        marginVertical: '3%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        //position: 'relative',
       // paddingVertical: '2%',
    }, 
    imageNot: {
        minHeight: 180,
        maxHeight: 180,
        minWidth: 180,
        maxWidth: 180,
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
        position: 'absolute',
    },
    notImagesInProfileContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    notImagesHeaderText: {
        fontSize: 23,
        fontWeight: 'bold',
        textAlign: 'center',

    },
    notImagesSubText: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 10,
    }
});

export { styles }