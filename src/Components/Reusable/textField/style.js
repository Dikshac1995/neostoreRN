import {
    StyleSheet
} from 'react-native'

export const styles = StyleSheet.create({
    textField_wrapper: {
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: 'white',
        color: 'white',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 5,
        // marginRight: 10,
        padding: 5,
        paddingRight: 10,
        // flexShrink:''
        // flexGrow: ''
        // flexWrap: 'wrap'
        // marginBottom: 5,    
    },
    Icon: {
        paddingLeft: 10,

    },
    input_text: {
        paddingTop: 10,
        flex: 1,
        alignItems: 'stretch',

        // backgroundColor: 'yellow',
        // marginRight: 50,
        // paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        color: '#fff',

        fontSize: 18,
        // width: '90%',
    },
})
