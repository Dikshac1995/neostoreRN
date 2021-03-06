import { StyleSheet } from 'react-native'


export const styles = StyleSheet.create({
    header: {
       
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#FF6347',
         borderBottomWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5,
        // marginLeft: 5,
        // marginRight: 5,
        // marginTop: 10,
     },
    headerSection: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'red',
        // padding: 10,
        paddingVertical: 15,
         paddingHorizontal: 15,
        
    },
    headerTitle: {
        fontSize: 25,
        color: 'white',
        fontWeight:'bold'

    },

})