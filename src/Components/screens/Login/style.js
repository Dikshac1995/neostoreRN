import { StyleSheet } from 'react-native'
import {StyleConstants} from '../../../Assets/Constant/constant'

export const styles = StyleSheet.create({
    LoginScreen1: {
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
        textAlign: 'center'
    },
    forgot_link: {
        color: 'white',
        fontSize: 20,
        // fontWeight: 'bold',
        textAlign: 'center'

    },
    
    Account: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    Account_Text: {
        padding: 10,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',

    }
});