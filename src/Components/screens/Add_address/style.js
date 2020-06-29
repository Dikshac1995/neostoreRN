import {
    StyleSheet
} from 'react-native'

export const styles = StyleSheet.create({
    Address_container: {
        flex: 1,
        // backgroundColor: 'pink'

    },

    Address_TextField: {
        elevation: 5,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: "#eee"

    },
    Address_wrapper: {
        // marginTop: 20,
        paddingHorizontal: 20,
        // paddingTop: 20,
        // paddingBottom:20
    },
    Text_label: {

        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20

    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        borderTopWidth: 2,
        borderTopColor: '#eee',
        elevation: 4,
        backgroundColor: '#fff',
        paddingTop: 10


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