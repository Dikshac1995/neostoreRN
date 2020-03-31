import { StyleSheet } from 'react-native'
import { StyleConstants } from '../../../Assets/Constant/constant'
export const styles = StyleSheet.create({
    Product_List: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        alignItems: 'center' 
    },
    Product_name: {
        fontSize: 15, fontWeight: 'bold' 
    } ,  
     Product_material: {
        fontSize: 15, 
    },
    start_rating: {
        justifyContent: 'flex-end', alignItems: 'flex-end'

    } 
})