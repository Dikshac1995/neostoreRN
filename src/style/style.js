import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const globalstyles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'red',
        paddingHorizontal: 30
    },

    neostore_logo: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 10
    },
    Containerhead: {
        color: 'white',
        fontSize: 25,
        paddingTop: 10,
        paddingBottom: 10
    },
    card: {
        //height: ((windowHeight-2) - 0),
        height: windowHeight / 4,
        width: ((windowWidth / 2) - 20),
        // backgroundColor: 'yellow',
        //display:'flex'
    }
})