import { StyleSheet } from 'react-native'
import { StyleConstants } from '../../../Assets/Constant/constant'

export const styles = StyleSheet.create({
    productDeatailModule: {
        padding:10,
        paddingTop:30,
        paddingHorizontal: 20 
    },
    product_name: {
        fontSize: StyleConstants.FONT_32,
        fontWeight: 'bold'
    },
    categogy_name: {
        fontSize: StyleConstants.FONT_30,
        color:'#4f4f4f'
    },
    material_name: {
        fontSize: StyleConstants.FONT_23,
        color: '#4f4f4f'
    },
    product_cost: {
        color: 'red',
         fontSize: StyleConstants.FONT_23,
    },
    Product_description_title: {
        fontSize: StyleConstants.FONT_30,
        color:'#111111'
    },
    Product_description: {
        fontSize: StyleConstants.FONT_30,
        color: '#333333',
        width:70
    }
});