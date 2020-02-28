import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    Image,Button
} from 'react-native';
import TextField from '../Reusable/textFirld/textField'
import ButtonField from '../Reusable/ButtonField/buttonField'




class LoginScreen extends Component {
    render() {
        return (
            <View style={styles.LoginScreen1}>
                <View style={styles.login}>    
                    <Text style={styles.login_neostore}>NeoSTORE</Text>
                    {/* <TextInput style={styles.TextInput}
                        placeholder="userName" placeholoderTextColor="white"/>
                    <TextInput style={styles.TextInput}
                       placeholder="Password" /> */}
                    {/* <TextField placeholder='password'/> */}
                    <TextField placeholder="username" name="user" />
                     <TextField placeholder = "Password"
                     name = "lock" / >
        
                    {/* <TouchableOpacity>
                        <View style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                        </View>
                    </TouchableOpacity> */}
                    <ButtonField text="LOGIN"/>
            
                </View>  
                <View style={styles.Account}>
                    <Text style={styles.Account_Text}>DON'T HAVE AN ACCOUNT</Text>
                        <TouchableOpacity>
                        <Image
                            style={{ width: 24, height: 28 }}
                            source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==' }}
                        />
                      </TouchableOpacity>
                </View> 
                
            </View>
        );
    }
}
const styles = StyleSheet.create({
    LoginScreen1: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'red',
        paddingHorizontal: 15
     },
    login: {
        padding: 20,
        flexGrow: 1,
        justifyContent: 'center',  
    },
    login_neostore: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold', 
        textAlign:'center'
    },
    // TextInput: {
    //     fontSize: 20,
    //     borderWidth: 1,
    //     borderColor: 'white', 
    //     marginTop: 10,
    //     marginBottom:10
    // },
    // button: {
    //     marginTop: 10,
    //     alignItems: 'center',
    //     backgroundColor:'white'
    // },
    // buttonText: {
    //     padding: 10,
    //     color: 'red',
    //     fontSize: 20,
    //     fontWeight: 'bold', 
    // },
    Account: {
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    Account_Text: {
        padding: 10,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',   
        
    }
});
export default LoginScreen;
