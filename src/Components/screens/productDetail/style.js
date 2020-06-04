import { StyleSheet } from 'react-native'
import { StyleConstants } from '../../../Assets/Constant/constant'

export const styles = StyleSheet.create({

    productDeatailSection1: {
        backgroundColor: "#fff",
        marginBottom: 20
        // padding:20,
        // paddingTop:30,
        // // paddingHorizontal: 20,
        // paddingBottom:10

    },
    productDetailSection1_wrapper: {
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    productDetailSection2: {
        paddingHorizontal: 30, marginBottom: 20
    },
    PDsection2_Price: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 10
    },
    productDetailSection2_wapper: {
        padding: 10,
        backgroundColor: '#fff',
        // borderWidth: 2,
        borderRadius: 15,
        borderColor: '#fff',
        // borderBottomWidth: 1,
        // shadowColor: 'white',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.9,
        // shadowRadius: 2,
        elevation: 2,
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
    cardIcon: {

    },

    footer: {
        display: 'flex', flexDirection: 'row', backgroundColor: '#fff', paddingBottom: 30,
        marginBottom: 50, justifyContent: 'space-evenly',

    },
    rate_button: {
        backgroundColor: '#7f7f7f',
        width: 180,
        fontSize: 20,
        color: '#fff',
        borderRadius: 8,
        textAlign: 'center'
    },

    buttonStyle: {
        backgroundColor: 'red',
        width: 180,
        fontSize: 20,
        color: '#fff',
        borderRadius: 8,
        textAlign: 'center'
    },

    container: {
        width: 50,
        height: 50,

        //     alignItems: 'center',
        //  backgroundColor: 'red',
        padding: 10
    },
    modal: {
        // height:60,
        borderRadius: 10,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 30,
        marginTop: 180,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,

        borderWidth: 3,

        borderColor: '#fff',
        borderTopWidth: 2,
        borderBottomWidth: 1,
        shadowColor: 'white',
        shadowOffset: { width: 7, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 6,
    },
    text: {
        color: '#fff',
        marginTop: 10,
        marginLeft: 70,
        fontSize: 30
    }
});