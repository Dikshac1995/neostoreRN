import {
    StyleSheet
} from 'react-native'

export const styles = StyleSheet.create({
    Address_container: {
        flex: 1
    },
    shipping_text: {
        fontSize: 25, margin: 20, color: '#8B8888'
    },
    userName_wrapper: {
        padding: 10, paddingHorizontal: 15, flex: 1
    },
    userName_text: {
        marginHorizontal: 10, fontSize: 25, paddingBottom: 15
    },
    address_wrapper: {
        flex: 1, flexDirection: 'column', paddingVertical: 15, paddingLeft: 5
    },

    footer: {

        backgroundColor: '#fff',
        marginBottom: 10,

    },
    address_text: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    addAddress_button: {
        color: 'white',
        fontSize: 20,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'red',
        textAlign: 'center',
        borderRadius: 8,
        paddingTop: 20,
        paddingBottom: 20,



    },
})