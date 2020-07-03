import { StyleSheet } from 'react-native'
import { StyleConstants } from '../../../Assets/Constant/constant'

export const styles = StyleSheet.create({
    myOrder_container: {
        display: 'flex', marginTop: 5,
        flexDirection: 'row', padding: 0, alignItems: 'center'
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

        display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        // height: '20%'
    },
    totalPrice: {
        fontSize: 20, fontWeight: 'bold', padding: 20
    },

    buttonStyle: {
        backgroundColor: 'red',
        width: 180,
        fontSize: 20,
        color: '#fff',
        borderRadius: 8,
        textAlign: 'center',


    },

})