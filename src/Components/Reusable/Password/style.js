import {
    StyleSheet
} from 'react-native'

import {
    StyleConstants
} from '../../../Assets/Constant/constant'
export const styles = StyleSheet.create({
    Password: {
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: 'white',
        color: 'white',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    Icon: {
        paddingLeft: 10,

    },
    inputText: {
        fontSize: StyleConstants.FONT_20,
        color: '#fff'
    },
    eyeIcon: {
        paddingLeft: 20,
    },
    Placeholder_text: {
        paddingTop: 5,
        paddingRight: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        color: '#424242',
        fontSize: StyleConstants.FONT_30,
        width: '70%',
    },
    validText: {
        color: 'white', textAlign: 'center'
    }
})
