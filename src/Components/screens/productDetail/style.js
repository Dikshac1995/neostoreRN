import { StyleSheet } from 'react-native'
import { StyleConstants } from '../../../Assets/Constant/constant'

export const styles = StyleSheet.create({
    productSection: {
        flex: 1, backgroundColor: '#eee'
    },
    productDeatailSection1: {
        backgroundColor: "#fff",
        // height: '20%'

    },
    productDetailSection1_wrapper: {
        paddingHorizontal: 20,
        paddingVertical: 10,

    },
    productDetailSection2: {
        paddingHorizontal: 30,
        // height: '40%'
    },
    productImage: {
        width: 100, height: 100,
        resizeMode: 'stretch'
    },

    PDsection2_Price: {
        display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', padding: 10,
    },
    productDetailSection2_wapper: {
        marginTop: 5,
        marginBottom: 20,
        padding: 10,
        marginTop: 20,
        backgroundColor: '#fff',
        // borderWidth: 2,
        borderRadius: 15,
        borderColor: '#fff',
        flex: 1,

    },
    product_name: {
        fontSize: StyleConstants.FONT_30,
        fontWeight: 'bold'
    },
    categogy_name: {
        fontSize: StyleConstants.FONT_26,
        color: '#4f4f4f'
    },
    material_wraper: {
        display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', paddingTop: 10
    },
    material_name: {
        fontSize: StyleConstants.FONT_23,
        color: '#4f4f4f'
    },
    product_cost: {
        color: 'red',
        fontSize: StyleConstants.FONT_23,
        fontWeight: 'bold'
    },
    Product_description_title: {
        fontSize: StyleConstants.FONT_30,
        color: '#111111'
    },
    Product_description: {
        fontSize: StyleConstants.FONT_18,
        color: '#333333',
        padding: 10

    },


    footer: {
        display: 'flex', paddingBottom: 30, flex: 0.3, paddingBottom: 10,
        // flexDirection: 'row', justifyContent: 'space-evenly',
        paddingHorizontal: 15, backgroundColor: '#fff', elevation: 5
    },
    rate_button: {
        backgroundColor: '#7f7f7f',
        // width: '200%',
        // paddingHorizontal: 0,
        // paddingVertical: 10,
        // flex: 1,
        paddingHorizontal: 40,
        fontSize: 20,
        color: '#fff',
        borderRadius: 8,
        textAlign: 'center'
    },
    loading: {

        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },
    buttonStyle: {
        backgroundColor: 'red',
        paddingHorizontal: 20,
        // width: 160,
        fontSize: 20,
        color: '#fff',
        borderRadius: 8,
        textAlign: 'center'
    },

    container: {
        width: 50,
        height: 50,
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
    },
    mycart_WrapperContainer: {
        alignItems: 'flex-end', position: 'absolute'
    },
    mycart_Wrapper: {
        display: 'flex', backgroundColor: '#3A3DE3', borderRadius: 80,
        width: 70, height: 70,
        top: 120, left: 110,
    },
    mycart_icon: {
        paddingTop: 20, alignItems: 'center'
    },
    subImage_Container: {
        display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 10
    },
    subImage_Wrapper: {
        borderWidth: 2, borderColor: 'grey'
    }

});