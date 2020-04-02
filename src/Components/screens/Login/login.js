import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    Image,Button, Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { styles } from './style'
import { connect } from 'react-redux';
import * as actions from '../../../Redux/Action/action'
import PasswordCon from '../../Reusable/Password/Password'


class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            emailValid: true ,
            passValid:true,
        }
    }
    navigate = () => {
       navigation.navigate('registrationScreen')
    }
    updateValue(type, text) {
        console.warn(type,text)
        const emailPattern = /^([a-zA-Z])+([0-9a-zA-Z_\.\-])+\@+(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,5}$)$/;
        const passreg = /^[0-9]+$/;
        if (type == 'email') {
            // this.setState({ email: text })
            if (emailPattern.test(text)) {
                return true
                // this.setState({ emailValid: true })
                //console.warn("text is valid ")
            }
            else {
                return  false
            //     this.setState({ emailValid: false })
            }
        }
        if (type == 'password') {
            // this.setState({ pass: text })
            if (passreg.test(text)) {
                return  true 
                // this.setState({ passValid: true })
                //console.warn("text is valid ")
            }
            else {
                return false
                // this.setState({ passValid: false })
                //console.warn("password is invalid ")
            }
        }
    }
      async login() {
        const value =  await AsyncStorage.getItem('token')
        console.log("-->", value)
        console.log(this.props.isLoggedIn,"88888888888888888888888")
      
        console.warn("--------", this.state.emailValid, this.state.passValid)
            if (!this.state.emailvalid && !this.state.passValid) {
                Alert.alert(" fill the detail ")
            }
            else {
                this.props.login(this.state.email, this.state.pass).then(() => {
                    if (this.props.error) {
                        console.log('================',this.props.isLoggedIn)
                        console.log(this.props.error)
                        Alert.alert(this.props.error)
                    }
                    else {
                        console.log('================', this.props.isLoggedIn)
                        console.log('login successfully')
                        Alert.alert('login successfully')
                        this.props.navigation.navigate('Homescreen')
                        //    Alert.alert(this.props.userData.user.name + ' user successfully logged in ')
                    }
            
                })
            }
        
    
        
    }
    render() {

        const { isLoggedIn, userData, error } = this.props
        console.log('token',this.props.token)
        console.log('00000',isLoggedIn,userData,error)
        return (
            <View style={styles.LoginScreen1}>
                <View style={styles.login}>    
                    <Text style={styles.login_neostore}>NeoSTORE</Text>
                    <TextField placeholder="email id" name="user" onChangeText={value => this.setState({ email: value.trim() })}
                        onBlur={() => {
                            this.setState({
                                emailValid: this.updateValue('email', this.state.email)
                                
                            })
                        }}
                        validate={!this.state.emailValid ? <Text>email invalid</Text> : null} />
                    <PasswordCon placeholder='Password' onChangeText={value => this.setState({ pass: value.trim() })}
                        onBlur={() => {
                            this.setState({
                                passValid:this.updateValue('password', this.state.pass)
                            })
                        }}
                        validate={!this.state.passValid ? <Text> password invalid </Text> : null} />
                    {/* <TextField placeholder="Password" name="lock" secureTextEntry onChange={(e) => this.updateValue(e, 'password')}
                        validate={!this.state.passValid ? <Text>password invalid</Text> : null}/> */}
                    <ButtonField text="LOGIN"
                        onPress={() => this.login()}
                        style={styles.loginButton}
                       // onPress={() => this.props.navigation.navigate('Register')}
                    />
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
const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
    isLoading: state.auth.isLoading,
    userData: state.auth.userData,
    token:state.auth.token,
    error: state.auth.error
})

const mapDispatchToProps = dispatch => ({
    login: (email, pass) => dispatch(actions.login({ email, pass}))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)