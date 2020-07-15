import {
    StyleSheet
} from 'react-native'


export const styles = StyleSheet.create({
    flatList_wrapper: {

    },
    serachList_container: {
        display: 'flex', flexDirection: 'row', padding: 10,
        alignItems: 'center', justifyContent: 'space-between'
    },
    image: {
        width: '90%', height: 100, resizeMode: 'stretch'
    },
    product_container: {
        flex: 1.8, paddingLeft: 20
    },
    productName: {
        fontSize: 15, fontWeight: 'bold'
    },
    product_producer: { fontSize: 15 },
    product_cost: {
        color: 'red', fontSize: 15, fontWeight: 'bold'
    },
    headerContainer: {
        height: 70, backgroundColor: 'red', justifyContent: 'center', paddingHorizontal: 5
    },
    headerWrapper: {
        height: 50, backgroundColor: '#fff', flexDirection: 'row', padding: 5, alignItems: 'center'
    },
    searchText: {
        fontSize: 22, marginLeft: 15,
    },
    searchText_wrapper: {
        flex: 1, height: 50
    }
})