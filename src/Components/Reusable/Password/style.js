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
        paddingLeft: 15,

    },
    inputText: {
        fontSize: StyleConstants.FONT_18,
        color: '#fff',
        paddingLeft: 10,

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
        fontSize: StyleConstants.FONT_22,
        width: '70%',
    },
    validText: {
        color: 'white', paddingLeft: 60
    }
})
