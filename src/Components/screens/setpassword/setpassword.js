import React, { Component } from 'react'
import { Text, View, Alert } from 'react-native'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { globalstyles } from '../../../style/style'
import PasswordCon from '../../Reusable/Password/Password'
import { styles } from './styles'
import validation from '../../../utils/valid'
import { api } from '../../..//utils/api'
import Loader from '../../Reusable/loader/loader'




export default class SetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Otp: ' ',
            password: ' ',
            confirmPassword: ' ',
            otp_err: ' ',
            passwordError: ' ',
            confirmpasswordError: ' ',
            loading: false
        }
    }
    componentDidMount() {
        const { otp, token } = this.props.route.params;
        console.log("mydata", otp, token)
        this.setState({ otp: otp })
    }


    async submit(token) {
        console.log(this.state.password, 'v', this.state.confirmPassword)
        const otpErr = validation('otp', this.state.Otp)
        const passError = validation('password', this.state.password)
        const conpassErr = validation('confirmpassword', this.state.confirmPassword, this.state.password)

        console.log('err', passError, conpassErr)
        this.setState({
            otp_err: otpErr,
            passwordError: passError,
            confirmpasswordError: conpassErr
        })

        if (otpErr == " " && passError == " " && conpassErr == " ") {
            // console.log('data', otpCode)
            this, this.setState({ loading: true })
            const res = await api.fetchapi('http://180.149.241.208:3022/recoverPassword', 'post',
                JSON.stringify({ "otpCode": this.state.Otp, "newPass": this.state.password, "confirmPass": this.state.confirmPassword })
                , token)
                .then((response) => {
                    response.json().then((responseJSON) => {
                        console.log("responseJSON", responseJSON);
                        if (responseJSON.success === true) {
                            this.setState({ loading: false })
                            Alert.alert(responseJSON.message)
                            setTimeout(() => {
                                this.props.navigation.navigate('loginScreen')
                            }, 3000)

                            //         Alert.alert(
                            //             'your new password set successfully ',
                            //             'you have to login again ',
                            //             [
                            //                 {
                            //                     text: 'ok', onPress: () => {
                            //                         this.props.navigation.navigate('loginScreen')
                            //                     }
                            //                 },
                            //             ],
                            //             { cancelable: false }
                            //         )
                            //     }, 3000)
                        }
                        else {
                            setTimeout(() => {
                                this.setState({ loading: false })
                                Alert.alert(responseJSON.message)
                            }, 3000)
                        }
                    })
                })
        }
    }
    render() {
        const { otp, token } = this.props.route.params;
        console.log('in render ', this.state.otp)
        return (

            <View style={globalstyles.Container}>
                <Loader
                    loading={this.state.loading} />
                <Text style={globalstyles.neostore_logo}>NeoSTORE</Text>
                <Text style={globalstyles.Containerhead}>Set Password</Text>
                <TextField placeholder="otp" otp="trending-down"

                    onChangeText={value => this.setState({
                        Otp: value,
                        otp_err: validation('otp', value)

                    })}
                    onBlur={() => {
                        this.setState(() => ({
                            otp_err: validation('otp', this.state.Otp)
                        }))
                    }}

                    validate={<Text>{this.state.otp_err}</Text>}

                />

                <PasswordCon placeholder='Enter new Password '
                    onChangeText={value => this.setState({
                        password: value.trim(),
                        passwordError: validation('password', value)
                    })}
                    onBlur={() => {
                        this.setState(() => ({
                            passwordError: validation('password', this.state.pasword)
                        }))
                    }}

                    validate={<Text>{this.state.passwordError}</Text>} />
                <PasswordCon placeholder='Enter Password  Again '
                    onChangeText={value => this.setState({
                        confirmPassword: value.trim(),
                        confirmpasswordError: validation('confirmpassword', value, this.state.password)

                    })}
                    onBlur={() => {
                        this.setState(() => ({
                            confirmpasswordError: validation('confirmpassword', this.state.confirmPassword, this.state.password)
                        }))
                    }}


                    validate={<Text>{this.state.confirmpasswordError}</Text>}
                />
                <ButtonField text="submit" onPress={() => this.submit(token)} style={styles.submit_button} />
            </View>

        )
    }
}