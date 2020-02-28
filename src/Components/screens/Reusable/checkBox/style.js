import {
    StyleSheet
}
from 'react-native'
import {
    StyleConstants
} from '../../Constant/constant'

export const styles = StyleSheet.create({
    checkboxField: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'center'
    },

    terms: {
        color: 'white',
        fontSize: StyleConstants.FONT_20,
        alignItems: 'flex-end'
    },
});