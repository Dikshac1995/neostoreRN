import {
    StyleSheet
}
from 'react-native'
import {
    StyleConstants
} from '../../../Assets/Constant/constant'

export const styles = StyleSheet.create({
    checkboxField: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'center'
    },
    text: {
        color: '#fff',
        fontSize: StyleConstants.FONT_20,
      },
    terms: {
        color: 'white',
        fontSize: StyleConstants.FONT_20,
        alignItems: 'flex-end',
        textDecorationLine:"underline",
    },
});