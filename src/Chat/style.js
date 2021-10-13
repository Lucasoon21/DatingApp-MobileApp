import { StyleSheet, StatusBar } from 'react-native';

const chat = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight,
        backgroundColor: 'rgba(250,250,250,0.8)',
        padding: 0,
    },
    buttonBack: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 5,
        borderBottomColor: 'rgba(240,240,240,1)',
        borderBottomWidth: 2,
        borderStyle: 'solid',
    },
    profileTop: {
        position: 'absolute',
        width: '100%',
        maxWidth: '100%',
    },
    profileTopTouch:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarTop: {
        height: 40,
        width: 40,
        borderRadius: 50,
      
    },
    nameProfile: {
        fontSize: 20,
        marginLeft: 10,
        textAlign: 'center',
 
    },
    fieldContainer: {
        backgroundColor: 'rgba(240,240,240,1)',
        marginBottom: 50,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 10,
    },
    messageTextInput: {
        backgroundColor: 'rgba(230,230,230,1)',
        padding: 10,
        width: '80%',
        height: 45,
        borderRadius: 10,
        fontSize: 16,
    },
    sendIcon: {
        marginHorizontal: 10,
        display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
    }
})


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
    scrollContainer: {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: 30,
    },
    menuTop: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 50,
        //backgroundColor: 'rgba(240,240,240,1)',

        borderBottomColor: 'rgba(220,220,220,1)',
        borderBottomWidth: 2,
        borderStyle: 'solid',
        backgroundColor: 'rgba(255,255,255,1)',
    },
    menuTopElement: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        //backgroundColor:  'rgba(255,255,55,1)',
        height: '100%',
    },
    xd: {
        width: '50%',
    },
    activeTopMenu: {
        //backgroundColor:  'rgba(250,250,250,1)',
        borderBottomColor: 'red',
        borderBottomWidth: 3,
        borderStyle: 'solid',

    },
    containerContact: {
        // backgroundColor: 'rgba(250,50,250,1)',
        width: '100%',
        marginBottom: 50,
    },

})

const singleConversation = StyleSheet.create({
    image: {
        height: 70,
        width: 70,
        borderRadius: 70,
    },
    container: {
        backgroundColor: 'rgba(250,250,250,1)',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 5,

        marginVertical: 5,
        alignItems: 'center',
        width: '100%',
    },
    headerText: {
        fontSize: 17,
        maxWidth: '60%',
        fontWeight: 'bold',
    },
    subText: {
        display: 'flex',
    },
    textContainer: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
        maxWidth: '65%',
    },
    message: {
        maxWidth: '100%',
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    dateMessage: {
        fontSize: 16,
        fontWeight: 'bold',
    },
})

const contact = StyleSheet.create({
    textContainer: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 30,
        maxWidth: '65%',
    },
    left: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        // backgroundColor: 'rgba(255,255,55,1)',
        backgroundColor: 'rgba(250,250,250,1)',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 5,

        marginVertical: 5,
        alignItems: 'center',
        width: '100%',
    },
    image: {
        height: 70,
        width: 70,
        borderRadius: 70,
    },
    text: {
        fontSize: 17,
    }
})

const message = StyleSheet.create({
    messageContainer: {
        display: 'flex',
        margin: 5,
        //padding: 20,
        flexDirection: 'row',
    },
    messageRecieverContainer: {
        flexDirection: 'row-reverse',
    },
    myMessage: {
        display: 'flex',
        flexDirection: 'column-reverse',
        backgroundColor: 'rgba(227, 222, 222, 0.8)',
    },
    recieverMessage: {
        backgroundColor: 'rgba(242, 106, 122, 0.8)',
        display: 'flex',

    },
    allMessageContainer: {
        width: '100%',
        padding: 10,
        
        marginBottom: 10,
        
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 50,
        marginTop: 10,
    },
    message: {
        
        //width: '75%',
        padding: 20,
        borderRadius: 10,
    },
    messageText: {
        fontSize: 17,

    },
    singleMessage: {
        display: 'flex',
        //backgroundColor: 'red',
        width: '75%',
        margin: 10,
    },
    dateMyMessage: {
        textAlign: 'right',
    },
    date: {
        marginHorizontal: 10,
    }
})

export { styles, contact, singleConversation, chat, message }