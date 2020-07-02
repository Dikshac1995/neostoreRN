import {
    StyleSheet
} from 'react-native'

export const styles = StyleSheet.create({
    Address_container: {
        // flex: 1,
        backgroundColor: 'pink',

    },

    Address_TextField: {
        elevation: 5,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: "#eee"

    },
    Address_wrapper: {
        paddingHorizontal: 10, paddingTop: 20,
        height: '90%',
        // paddingBottom: 25,
        // backgroundColor: 'red'
        // marginHorizontal: 10


        // marginTop: 20,
        // paddingHorizontal: 20,
        // backgroundColor: 'pink',
        // height: '95%'
        // paddingTop: 20,
        // paddingBottom:20
    },
    Text_label: {

        fontSize: 20,

        paddingBottom: 5

    },
    err_text: {
        fontSize: 15, color: 'red'

    },
    address_fields: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
    fields: {
        paddingTop: 10,
        marginHorizontal: 10
    },
    fields_two: {
        paddingTop: 10,
        width: '45%',
        marginHorizontal: 10,
        paddingBottom: 10

    },
    footer: {
        // backgroundColor: 'pink',
        // flex: 2,
        // height: '20%',

        elevation: 4,

    },
    addAddress_button: {
        color: '#fff',
        fontSize: 20,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'red',
        textAlign: 'center',
        borderRadius: 8,
        marginTop: 0,
        height: 60







    },
})