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
import Icon from 'react-native-vector-icons/FontAwesome';
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { styles } from './style'





class LoginScreen extends Component {
    navigate = () => {
       navigation.navigate('registrationScreen')
    }
    render() {
        return (
            <View style={styles.LoginScreen1}>
                <View style={styles.login}>    
                    <Text style={styles.login_neostore}>NeoSTORE</Text>
                    <TextField placeholder="username" name="user" />
                    <TextField placeholder = "Password" name = "lock" / >
                    <ButtonField text = "LOGIN" onPress = {()=>this.props.navigation.navigate('Register')}/>
                    <TouchableOpacity onPress = {()=>this.props.navigation.navigate('ForgotPassword')}>
                        <Text style = {styles.forgot_link}>Forgot Password ?</Text>
                     </TouchableOpacity>    
                </View>  
                <View style={styles.Account}>
                    <Text style={styles.Account_Text}>DONT HAVE AN ACCOUNT</Text>
                    <TouchableOpacity onPress = {() => this.props.navigation.navigate('Register')}>
                        <View style = {{backgroundColor: 'black',opacity: 0.6,padding: 10}}>
                            <Icon name="plus" size={20} color="#fff" />
                        </View>
                    </TouchableOpacity>
                </View> 
                
            </View>
        );
    }
}
{/* const styles = StyleSheet.create({
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
    forgot_link: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
        
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
}); */}
export default LoginScreen;
