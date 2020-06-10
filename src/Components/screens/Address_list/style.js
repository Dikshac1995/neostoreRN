import {
    StyleSheet
} from 'react-native'

export const styles = StyleSheet.create({
    Address_container: {
        flex: 1
    },

    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        borderTopWidth: 2,
        borderTopColor: '#eee',
        elevation: 4,
        backgroundColor: '#fff',
        paddingTop: 10,



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