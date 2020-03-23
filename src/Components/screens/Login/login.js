import React, { Component } from 'react';
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
            emailValid: 'true ',
            passValid:'true',
        }
    }
    navigate = () => {
       navigation.navigate('registrationScreen')
    }
    updateValue(text, type) {
        const emailPattern = /^([a-zA-Z])+([0-9a-zA-Z_\.\-])+\@+(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,5}$)$/;
        const passreg = /^[0-9]+$/;
        if (type == 'email') {
            this.setState({ email: text })
            if (emailPattern.test(text)) {
                this.setState({ emailValid: true })
                //console.warn("text is valid ")
            }
            else {
                this.setState({ emailValid: false })
            }
        }
        if (type == 'password') {
            this.setState({ pass: text })
            if (passreg.test(text)) {
                this.setState({ passValid: true })
                //console.warn("text is valid ")
            }
            else {
                this.setState({ passValid: false })
                //console.warn("password is invalid ")
            }
        }
    }
    login() {
        this.props.login(this.state.email, this.state.pass).then(() => {
            if (this.props.error) {
                console.log(this.props.error)
                Alert.alert(this.props.error)
            }
            else {
                console.log('login successfully')
                Alert.alert('login successfully')
                this.props.navigation.navigate('Homescreen')
            //    Alert.alert(this.props.userData.user.name + ' user successfully logged in ')
            }
        })
    }
    render() {
        return (
            <View style={styles.LoginScreen1}>
                <View style={styles.login}>    
                    <Text style={styles.login_neostore}>NeoSTORE</Text>
                    <TextField placeholder="email id" name="user" onChange={(e) => this.updateValue(e, 'email')}
                        validate={!this.state.emailValid ? <Text>email invalid</Text> : null} />
                    <PasswordCon placeholder='Password' />
                    {/* <TextField placeholder="Password" name="lock" secureTextEntry onChange={(e) => this.updateValue(e, 'password')}
                        validate={!this.state.passValid ? <Text>password invalid</Text> : null}/> */}
                    <ButtonField text="LOGIN"
                        onPress={() => this.login()}
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
    error: state.auth.error
})

const mapDispatchToProps = dispatch => ({
    login: (email, pass) => dispatch(actions.login({ email, pass}))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)