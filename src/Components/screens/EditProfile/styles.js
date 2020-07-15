import { StyleSheet } from 'react-native'
import { StyleConstants } from '../../../Assets/Constant/constant'

export const styles = StyleSheet.create({
    submit_button: {
        color: 'red',
        fontSize: 30,
        backgroundColor: 'white',
        textAlign: 'center',
        borderRadius: 8,
    },
    container1: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        padding: 5, height: 60

    },
    GenderField: {
        display: 'flex',
        flexDirection: 'row',
        // paddingTop: 10
        // justifyContent:'space-between'
    },
    Gender: {
        color: 'white',
        fontSize: StyleConstants.FONT_20,
        fontWeight: 'bold',
        alignItems: 'flex-end',

    },
    GenderName: {
        color: 'white',
        fontSize: StyleConstants.FONT_20,

    },
})