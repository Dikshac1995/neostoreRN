import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'red',
        paddingHorizontal: 15
    },
  
    neostore_logo: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center'
     },
     Containerhead: {
         color: 'white',
         fontSize: 20,
         paddingTop: 10,
        
     },
     card:{
        //height: ((windowHeight-2) - 0),
         height:windowHeight/4,
         width: ((windowWidth / 2) - 20),
        //  backgroundColor: 'yellow',
        //display:'flex'
     }
})