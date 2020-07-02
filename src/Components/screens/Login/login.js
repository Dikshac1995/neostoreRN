import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { styles } from './style'
import { connect } from 'react-redux';
import * as actions from '../../../Redux/Action/action'
import PasswordCon from '../../Reusable/Password/Password'
import validation from '../../../utils/valid'
import { api } from '../../../utils/api'
import Loader from '../../Reusable/loader/loader'



class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            emailValid: '',
            passValid: '',
            loading: false,
        }
    }

    navigate = () => {
        navigation.navigate('registrationScreen')
    }

    login() {
        const emailError = validation('email', this.state.email)
        const passwordError = validation('password', this.state.pass)
        console.log('emailErr', emailError, passwordError)
        this.setState({
            emailValid: emailError,
            passValid: passwordError
        })
        // if ((this.state.email === '') || (this.state.pass === ' ') || (this.state.emailValid !== " ") || (this.state.passValid != " ")) {
        //     Alert.alert(" fill the required detail ")
        // }

        if (emailError == " " && passwordError == " ") {
            this.setState({ loading: true })
            api.fetchapi(api.baseUrl + 'login', 'post', JSON.stringify({
                "email": this.state.email,
                "pass": this.state.pass
            }))
                .then((response) => {
                    response.json().then(async (responseJSON) => {
                        if (responseJSON.success == true) {
                            await AsyncStorage.setItem('token', responseJSON.token)
                            const customerDetail = responseJSON
                            await AsyncStorage.setItem("customerDetail", JSON.stringify(customerDetail))
                            const token = await AsyncStorage.getItem('token')
                            console.log(token)
                            setTimeout(() => {
                                Alert.alert(responseJSON.message)
                                this.setState({ loading: false })
                                this.props.navigation.navigate('Homescreen');
                            }, 2000)
                        }
                        else {
                            setTimeout(() => {
                                Alert.alert(responseJSON.message)
                                this.setState({ loading: false })
                            }, 3000)
                        }
                    })
                })
        }
    }
    render() {

        return (
            <View style={styles.LoginScreen}>

                <Loader
                    loading={this.state.loading} />
                <View style={styles.login}>
                    <Text style={styles.login_neostore}>NeoSTORE</Text>
                    <TextField placeholder="Email" name="envelope"
                        onChangeText={value => this.setState({
                            email: value.trim(),
                            emailValid: validation('email', value)
                        })}
                        validate={<Text>{this.state.emailValid}</Text>} />
                    <PasswordCon placeholder='Password'
                        onChangeText={value => this.setState({
                            pass: value.trim(),
                            passValid: validation('password', value)

                        })}

                        validate={<Text>{this.state.passValid}</Text>} />
                    <ButtonField text="LOGIN" loading={this.state.loading}
                        onPress={() => this.login()}
                        style={styles.loginButton}
                    />
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                        <Text style={styles.forgot_link}>Forgot Password ?</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.Account}>
                    <Text style={styles.Account_Text}>DON'T HAVE AN ACCOUNT ?</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                        <View style={{ backgroundColor: 'black', opacity: 0.6, padding: 10, marginRight: 15 }}>
                            <Icon name="plus" size={30} color="#fff" />
                        </View>
                    </TouchableOpacity>
                </View>


            </View>
        );
    }
}
// const mapStateToProps = state => ({
//     isLoggedIn: state.auth.isLoggedIn,
//     isLoading: state.auth.isLoading,
//     userData: state.auth.userData,
//     token: state.auth.token,
//     error: state.auth.error
// })

// const mapDispatchToProps = dispatch => ({
//     login: (email, pass) => dispatch(actions.login({ email, pass }))
// })

// export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)

export default LoginScreen