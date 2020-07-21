import { StyleSheet } from 'react-native'



export const styles = StyleSheet.create({
    orderId_container: {
        marginHorizontal: 20, height: '80%'
    },
    orderId_wrapper: {
        display: 'flex', flexDirection: 'row', padding: 0, alignItems: 'center', flex: 1,
        justifyContent: 'space-between'
    },
    product_name: { fontSize: 20, fontWeight: 'bold' },
    product_material: {
        fontSize: 15
    },
    product_cost: { color: 'red', fontSize: 15, fontWeight: 'bold', textAlign: 'right' },
    product_quantity: { fontSize: 15, textAlign: 'left' },

    footer_wrapper: {
        display: 'flex', flexDirection: 'row', borderTopWidth: 1,
        borderTopColor: '#000', justifyContent: 'space-between',
        // marginHorizontal: 10,
        paddingHorizontal: 20

    },
    footer_text: {
        padding: 10, fontSize: 25, fontWeight: 'bold'
    }

})