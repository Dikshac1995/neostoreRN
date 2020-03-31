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
    productDetailSection2: {
        paddingHorizontal: 30, marginBottom: 20
    },
    PDsection2_Price: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 10
    },
    productDetailSection2_wapper: {

        // backgroundColor: '#fff', 
        borderWidth: 2,
        borderRadius: 3,
        borderColor: '#fff',
        borderBottomWidth: 1,
        shadowColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 2,
        elevation: 1,
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
    }
});