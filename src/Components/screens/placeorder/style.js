import { StyleSheet } from 'react-native'
import { StyleConstants } from '../../../Assets/Constant/constant'

export const styles = StyleSheet.create({
    Address: {
        paddingHorizontal: 5,
        paddingTop: 5
    },
    address_custname: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 5

    },

    address_text: {
        fontWeight: 'bold',
        fontSize: 20,

    },

    addressButton: {
        backgroundColor: 'red',
        fontSize: 20,
        color: '#fff',
        borderRadius: 8,
        paddingBottom: 10,
        marginTop: 5,
        textAlign: 'center',

    },
    product: {
        padding: 20
    },
    product_row: {
        flex: 1, flexDirection: 'row', justifyContent: 'space-between',
        paddingBottom: 10
    },
    productName_wrapper: {
        width: '50%'
    },
    productName_text: {
        fontSize: 25, fontWeight: 'bold'
    },
    productProducer: {
        width: '30%'
    },
    productProducer_text: {
        fontSize: 20, fontWeight: 'bold'
    },
    product_cost: {
        fontSize: StyleConstants.FONT_22,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    priceDetail: {
        height: '30%'
    },
    priceDetail_container: {
        height: 100, marginBottom: 10
    },
    priceDetail_text: {
        textDecorationLine: 'underline', fontSize: 20, paddingLeft: 25,

    },
    priceDetailWrapper: {
        display: 'flex', flexDirection: 'row',
        justifyContent: 'space-evenly', padding: 10,
    },
    priceDetailWrapper_text: {
        fontSize: 20, width: 250
    },
    priceDetail_totalCost: {
        fontSize: 20,
        fontWeight: '900'
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        borderTopWidth: 2,
        borderTopColor: '#eee',
        elevation: 4,
    },
    footer_wrapper: {
        display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', paddingHorizontal: 20,
        backgroundColor: "#fff",
        elevation: 4,
    },
    footerProduct_cost: {
        paddingTop: 30,
        fontSize: 25,
        fontWeight: 'bold',
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