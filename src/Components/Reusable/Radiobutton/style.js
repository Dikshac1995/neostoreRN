import { StyleSheet} from 'react-native'
import { StyleConstants } from '../../../Assets/Constant/constant'

export const styles = StyleSheet.create({
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
            
        }
    


});