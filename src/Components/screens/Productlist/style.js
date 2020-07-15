import { StyleSheet } from 'react-native'
import { StyleConstants } from '../../../Assets/Constant/constant'
export const styles = StyleSheet.create({
    Product_List: {
        // display: 'flex',
        // flexDirection: 'row',
        // padding: 0,
        // alignItems: 'center'
        display: 'flex', flexDirection: 'row', padding: 0, alignItems: 'center'
    },
    productName_warpper: {
        padding: 20, flex: 2

    },
    Product_name: {
        fontSize: 15, fontWeight: 'bold'
    },
    Product_material: {
        fontSize: 15,
    },
    start_rating: {
        justifyContent: 'flex-end', alignItems: 'flex-end'

    },
    start_wapper: {
        justifyContent: 'flex-end', alignItems: 'flex-end'
    },
    loading: {

        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },
    Product_cost: {
        color: 'red', fontSize: 15, fontWeight: 'bold'
    }
})