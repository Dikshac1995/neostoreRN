import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    Image, Button, Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { styles } from './style'
import { connect } from 'react-redux';
import * as actions from '../../../Redux/Action/action'
import PasswordCon from '../../Reusable/Password/Password'
import validation from '../../../utils/valid'



class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            emailValid: ' ',
            passValid: ' ',
        }
    }
    componentDidMount() {
        const { isLoggedIn, userData, error } = this.props
        console.log('componentDid', userData)

    }
    navigate = () => {
        navigation.navigate('registrationScreen')
    }

    async login() {
        const { userData, error, isLoggedIn } = this.props
        const value = await AsyncStorage.getItem('token')
        console.warn("--------", this.state.emailValid, this.state.passValid)
        if ((!this.state.email) && (!this.state.pass) && (this.state.emailValid) && (this.state.passValid)) {
            Alert.alert(" fill the required detail ")
        }
        else {
            this.props.login(this.state.email, this.state.pass).then(async () => {
                const error = await this.props.error
                if (error) {

                    console.log(this.props.error)
                    Alert.alert(error)
                    this.props.navigation.navigate('Register')
                }
                else {
                    console.log('================', this.props.isLoggedIn)
                    console.log('login data', this.props.userData)
                    console.log('login successfully')
                    console.log(userData.success)
                    Alert.alert(userData.message)
                    if (userData.sucess == false) {
                        console.log("userdata.success")

                    }

                    this.props.navigation.navigate('Homescreen')

                    //    Alert.alert(this.props.userData.user.name + ' user successfully logged in ')
                }

            })
        }



    }
    render() {

        const { isLoggedIn, userData, error } = this.props
        console.log('token', this.props.token)
        console.log('00000', isLoggedIn, userData, error)
        return (
            <View style={styles.LoginScreen1}>
                <View style={styles.login}>

                    <Text style={styles.login_neostore}>NeoSTORE</Text>
                    <TextField placeholder="Email" name="envelope"
                        onChangeText={value => this.setState({ email: value.trim() })}
                        onBlur={() => {
                            this.setState({
                                emailValid: validation('email', this.state.email)
                            })
                        }}
                        validate={<Text>{this.state.emailValid}</Text>} />
                    <PasswordCon placeholder='Password'
                        onChangeText={value => this.setState({ pass: value.trim() })}
                        onBlur={() => {
                            this.setState({
                                passValid: validation('password', this.state.pass)
                            })
                        }}
                        validate={<Text>{this.state.passValid}</Text>} />
                    {/* <TextField placeholder="Password" name="lock" secureTextEntry onChange={(e) => this.updateValue(e, 'password')}
                        validate={!this.state.passValid ? <Text>password invalid</Text> : null}/> */}
                    <ButtonField text="LOGIN"
                        onPress={() => this.login()}
                        style={styles.loginButton}
                    // onPress={() => this.props.navigation.navigate('Register')}
                    />
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                        <Text style={styles.forgot_link}>Forgot Password ?</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.Account}>
                    <Text style={styles.Account_Text}>DON'T HAVE AN ACCOUNT?</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                        <View style={{ backgroundColor: 'black', opacity: 0.6, padding: 8, marginRight: 15 }}>
                            <Icon name="plus" size={40} color="#fff" />
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
    token: state.auth.token,
    error: state.auth.error
})

const mapDispatchToProps = dispatch => ({
    login: (email, pass) => dispatch(actions.login({ email, pass }))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)