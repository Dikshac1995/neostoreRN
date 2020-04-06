import { StyleSheet } from 'react-native'
import { StyleConstants } from '../../../Assets/Constant/constant'

export const styles = StyleSheet.create({
    headText: {
       fontSize:StyleConstants.FONT_20,
        padding:10
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'white',
        paddingHorizontal: 10
    },
    _button: {
        backgroundColor: 'red', borderRadius: 5, height: 50, paddingTop: 10,
        marginBottom: 5
    },
    _buttonText:{
        justifyContent: "center", color: 'white',
        fontSize: StyleConstants.FONT_20, textAlign: 'center'
    }
})