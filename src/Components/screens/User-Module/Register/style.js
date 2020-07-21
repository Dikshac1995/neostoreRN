import { StyleSheet } from 'react-native'
import {
    StyleConstants
}
    from '../../../../Assets/Constant/constant'
export const styles = StyleSheet.create({
    ResgisterScreen: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'red',
        paddingHorizontal: 15
    },
    // login: {
    //     padding: 20,
    //     flexGrow: 1,
    //     justifyContent: 'center',
    // },
    register_neostore: {
        color: 'white',
        fontSize: StyleConstants.FONT_45,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    registerButton: {
        color: 'red',
        fontSize: 30,

        backgroundColor: 'white',
        textAlign: 'center',
        borderRadius: 8,
        opacity: 0.7,

    },
    GenderField: {
        display: 'flex',
        flexDirection: 'row',
        // justifyContent:'space-between'
    },
    Gender: {
        color: 'white',
        fontSize: StyleConstants.FONT_20,
        fontWeight: 'bold',
        alignItems: 'flex-end'
    },
    GenderName: {
        color: 'white',
        fontSize: StyleConstants.FONT_20,

    },

    checkboxField: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    text: {
        color: '#fff',
        fontSize: StyleConstants.FONT_20,
    },
    terms: {
        color: 'white',
        fontSize: StyleConstants.FONT_20,
        alignItems: 'flex-end',
        textDecorationLine: "underline",
    }
    // forgot_link: {
    //     color: 'white',
    //     fontSize: 20,
    //     // fontWeight: 'bold',
    //     textAlign: 'center'

    // },

    // Account: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between'
    // },
    // Account_Text: {
    //     padding: 10,
    //     color: 'white',
    //     fontSize: 20,
    //     fontWeight: 'bold',

    // }
});