import { StyleSheet } from 'react-native'
import { StyleConstants } from '../../../Assets/Constant/constant'

export const styles = StyleSheet.create({
    productDeatailSection1: {
        backgroundColor: "#fff",
        // marginBottom: 20
        // padding:20,
        // paddingTop:30,
        // // paddingHorizontal: 20,
        // paddingBottom:10

    },
    productDetailSection1_wrapper: {
        // paddingHorizontal: 20,
        display :'flex',
        flexDirection: 'row',
        justifyContent:'space-evenly',
        paddingVertical: 20,
        // width: 220,
        // padding: 20,
        // backgroundColor:'red'
        
        
    },
   
    product_name: {
        fontSize: StyleConstants.FONT_26,
        fontWeight: 'bold'
    },
    categogy_name: {
        fontSize: StyleConstants.FONT_26,
        color: '#4f4f4f'
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
        color: '#111111'
    },
    Product_description: {
        fontSize: StyleConstants.FONT_30,
        color: '#333333',
        width: 70
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'white',
       

    },
    footer_wrapper:{
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20,
    
    },
    footerProduct_cost: {
        padding: 20,
        fontSize:20
    },
    footerOrder_button: {
        backgroundColor: 'red', borderRadius: 5, width: 200, height: 50,margin:10
    },
    footerButton_text: {
        color: 'white', fontSize: 20, padding: 10, paddingLeft: 50
    }
});