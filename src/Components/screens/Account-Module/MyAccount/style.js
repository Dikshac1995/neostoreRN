import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    myAccount_wrapper: {
        backgroundColor: 'red', flex: 8, paddingHorizontal: 30
    },
    proImage_container: {
        alignItems: 'center',
        paddingBottom: 10, paddingTop: 10
    },
    edit_button: {
        color: 'red',
        fontSize: 30,

        backgroundColor: 'white',
        textAlign: 'center',
        borderRadius: 8,

    },
    reset_button: {
        backgroundColor: '#fff'
    },
    reset_button_text: {
        textAlign: 'center', fontSize: 25,
        fontWeight: '800', paddingTop: 10,
        paddingBottom: 10
    }
})