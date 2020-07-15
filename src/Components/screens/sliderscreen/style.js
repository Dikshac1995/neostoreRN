import { StyleSheet } from 'react-native'


export const styles = StyleSheet.create({
    header: {
        paddingTop: 20,
        paddingHorizontal: 20
    },

    Header: { marginTop: 20, flex: 1, marginHorizontal: 20, paddingTop: 10, },
    logoContainer: {
        alignItems: 'center',
        paddingBottom: 30
    },
    cartLabel: {
        fontSize: 20,
        paddingLeft: 25,
        color: '#fff',
        fontWeight: 'bold',
    },
    logoText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fe3f3f'
    },
    user_profile: {
        borderRadius: 100, width: 130, height: 130, resizeMode: 'cover', paddingTop: 10
    },
    cart_countWrapper: { backgroundColor: 'red', borderRadius: 100, width: 40, height: 40, },
    username: {
        fontSize: 20, color: '#fff'
    },
    email: {
        fontSize: 20, color: '#e91b1a'
    },
    cart_countText: {
        color: '#fff', paddingLeft: 15, paddingTop: 10

    },
    parent_drawer: {
        display: 'flex', flexDirection: 'row', marginTop: 20

    },
    parent_drawerLabel: {

        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 25,
        marginRight: 100
    },
    child_drawer:
    {
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 30,
        paddingTop: 10
    },
    child_drawerLabel: {
        color: '#fff', fontSize: 20, marginLeft: 30, fontWeight: 'bold'
    },


})
