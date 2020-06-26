import { StyleSheet } from 'react-native'
import { StyleConstants } from '../../../Assets/Constant/constant'

export const styles = StyleSheet.create({
    LoginScreen: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'red',
        paddingHorizontal: 15
    },
    login: {
        padding: 20,
        flexGrow: 1,
        justifyContent: 'center',
    },
    login_neostore: {
        color: 'white',
        fontSize: StyleConstants.FONT_45,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 20
    },
    loginButton: {
        color: 'red',
        fontSize: 30,

        backgroundColor: 'white',
        textAlign: 'center',
        borderRadius: 8,
        opacity: 0.8,


    },
    forgot_link: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'

    },

    Account: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    Account_Text: {
        padding: 10,
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 30
    }
});