import { StyleSheet } from 'react-native'
import { StyleConstants } from '../../../Assets/Constant/constant'

export const styles = StyleSheet.create({

    addressButton: {
        backgroundColor: 'red',
        fontSize: 20,
        color: '#fff',
        borderRadius: 8,
        padding: 10,

        textAlign: 'center'

    },
    productDeatailSection1: {
        backgroundColor: "#fff",
        // marginBottom: 20
        // padding:20,
        // paddingTop:30,
        // // paddingHorizontal: 20,
        // paddingBottom:10

    },
    productDetailSection1_wrapper: {

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 20,
        height: 100

    },
    Address: {
        paddingTop: 15, paddingHorizontal: 10
    },
    address_text: {
        fontWeight: 'bold',
        fontSize: 20,

    },

    product_name: {
        fontSize: StyleConstants.FONT_26,
        fontWeight: 'bold'
    },
    categogy_name: {
        fontSize: StyleConstants.FONT_26,

    },
    material_name: {
        fontSize: StyleConstants.FONT_23,
        // color: '#4f4f4f'
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
    priceDetail: {
        textDecorationLine: 'underline', fontSize: 30, paddingLeft: 25, paddingTop: 10
    },
    priceDetailWrapper: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingVertical: 20
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        borderTopWidth: 2,
        borderTopColor: '#eee',
        elevation: 4,
        backgroundColor: '#fff'



    },
    footer_wrapper: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20,

    },
    footerProduct_cost: {
        paddingTop: 30,
        fontSize: 25,
        fontWeight: 'bold'

    },

    footerButton_text: {
        color: 'white',
        fontSize: 20,
        backgroundColor: 'red',
        textAlign: 'center',
        borderRadius: 8,
        width: 180,
        paddingTop: 20,
        paddingBottom: 20


    }
});