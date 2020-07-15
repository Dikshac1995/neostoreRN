import { StyleSheet } from 'react-native'
import { StyleConstants } from '../../../Assets/Constant/constant'

export const styles = StyleSheet.create({
    myOrder_container: {
        display: 'flex', marginTop: 5,
        flexDirection: 'row', padding: 0, alignItems: 'center',
        flex: 1, justifyContent: 'space-between'
    },
    product_name: {
        fontSize: 20, fontWeight: 'bold'

    },
    product_material: {
        fontSize: 15
    },
    product_cost:
    {
        fontSize: 17, paddingTop: 10,
        fontWeight: 'bold', textAlign: 'right'
    },

    footer: {



        paddingHorizontal: 15,
        backgroundColor: '#fff',
        elevation: 4,
        // height: '20%',
        flex: 1.2
    },
    footerButton_text: {
        color: 'white',
        fontSize: 20,
        backgroundColor: 'red',
        textAlign: 'center',
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 15,
        marginTop: 5,

    },
    totalPrice: {
        fontSize: 20, fontWeight: 'bold', padding: 20,
        // elevation: 4,
    },

    buttonStyle: {
        backgroundColor: 'red',
        // flex: 1,
        fontSize: 20,
        color: '#fff',
        borderRadius: 8,
        textAlign: 'center',
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 40,
        paddingRight: 40



    },

})