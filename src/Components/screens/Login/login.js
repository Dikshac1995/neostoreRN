import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { styles } from './style'
import { connect } from 'react-redux';
import * as actions from '../../../Redux/Action/action'
import PasswordCon from '../../Reusable/Password/Password'
import validation from '../../../utils/valid'
import { api } from '../../../utils/api'



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

    // async login() {
    //     const { userData, error, isLoggedIn } = this.props
    //     const value = await AsyncStorage.getItem('token')
    //     console.warn("--------", this.state.emailValid, this.state.passValid)
    //     if ((!this.state.email) || (!this.state.pass) || (this.state.emailValid) || (this.state.passValid)) {
    //         Alert.alert(" fill the required detail ")
    //     }
    //     else {
    //         this.props.login(this.state.email, this.state.pass).then(async () => {
    //             const error = await this.props.error
    //             if (error) {

    //                 console.log(this.props.error)
    //                 Alert.alert(error)
    //                 this.props.navigation.navigate('Register')
    //             }
    //             else {
    //                 console.log('================', this.props.isLoggedIn)
    //                 console.log('login data', this.props.userData)
    //                 console.log('login successfully')
    //                 console.log(userData.success)
    //                 Alert.alert(userData.message)
    //                 if (userData.sucess == false) {
    //                     console.log("userdata.success")

    //                 }
    //                 this.props.navigation.navigate('Homescreen')

    //                 //    Alert.alert(this.props.userData.user.name + ' user successfully logged in ')
    //             }

    //         })
    //     }



    // }

    login() {
        if ((this.state.email === '') || (this.state.pass === ' ')) {
            Alert.alert(" fill the required detail ")
        }
        else if ((this.state.emailValid === ' ' && this.state.passValid == ' ')) {

            this.setState({ loading: true })
            api.fetchapi('http://180.149.241.208:3022/login', 'post', JSON.stringify({
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
                            }, 10000)
                        }
                        else {
                            setTimeout(() => {

                                Alert.alert(responseJSON.message)
                                this.setState({ loading: false })
                            }, 10000)
                        }
                    })
                })

        }
        else {
            Alert.alert("fill the data properly ")
        }
    }
    render() {

        return (
            <View style={styles.LoginScreen}>
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
                    <ButtonField text="LOGIN" loading={this.state.loading}
                        onPress={() => this.login()}
                        style={styles.loginButton}
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