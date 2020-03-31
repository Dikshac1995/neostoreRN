import {
    StyleSheet
} from 'react-native'

export const styles = StyleSheet.create({
    Password: {
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: 'white',
        color: 'white',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 5,
        marginBottom:5
    },
    Icon: {
        paddingLeft: 10,

    },
    eyeIcon:{
      paddingLeft:20,
    },
    Placeholder_text: {
        paddingTop: 5,
        paddingRight: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        color: '#424242',
        fontSize: 30,
        width: '70%',
    },
})
