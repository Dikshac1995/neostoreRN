import React, { Component } from 'react'
import { Text, View, Alert } from 'react-native'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { globalstyles } from '../../../style/style'
import PasswordCon from '../../Reusable/Password/Password'
import { styles } from './styles'
import validation from '../../../utils/valid'
import OtpIcon from 'react-native-vector-icons/Feather';
import { api } from '../../..//utils/api'




export default class SetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: ' ',
            password: ' ',
            confirmPassword: ' ',
            otp_err: ' ',
            passwordError: ' ',
            confirmpasswordError: ' '
        }
    }
    componentDidMount() {
        const { otp, token } = this.props.route.params;
        console.log("mydata", otp, token)
        this.setState({ otp: otp })
    }


    async submit(token) {
        if (this.state.otp == ' ' ||
            this.state.password == ' ' ||
            this.state.confirmPassword == ' ') {
            Alert.alert('fields can not be empty')
        }
        else if (this.state.passwordError !== ' ' ||
            this.state.confirmpasswordError !== ' ') {
            Alert.alert('Fill the proper infomation ')
        }
        else {

            const res = await api.fetchapi('http://180.149.241.208:3022/recoverPassword', 'post',
                JSON.stringify({ "otpCode": this.state.otp, "newPass": this.state.password, "confirmPass": this.state.confirmPassword })
                , token)
            const result = await res.json();
            console.log("api", result)
            if (result.success === true) {

                Alert.alert(
                    'your new password set successfully ',
                    'you have to login again ',
                    [

                        {
                            text: 'ok', onPress: () => {
                                this.props.navigation.navigate('loginScreen')
                            }
                        },
                    ],
                    { cancelable: false }
                )
            }
            else {
                console.log(result.json, " g")
                Alert.alert(result.error_message)
            }
        }
    }
    render() {
        const { otp, token } = this.props.route.params;
        console.log('in render ', this.state.otp)
        return (

            <View style={globalstyles.Container}>
                <Text style={globalstyles.neostore_logo}>NeoSTORE</Text>
                <Text style={globalstyles.Containerhead}>Set Password</Text>
                <TextField placeholder="otp" otp="trending-down"
                    keyboardType={"number-pad"} value={this.state.otp} editable={true}
                    onChangeText={value => this.setState({ otp: value.trim() })}

                // defaultValue={otp}

                />

                <PasswordCon placeholder='Enter new Password '
                    onChangeText={value => this.setState({ password: value.trim() })}
                    onBlur={() => {
                        this.setState({
                            passwordError: validation('password', this.state.password)
                        })
                    }}
                    validate={<Text>{this.state.passwordError}</Text>} />
                <PasswordCon placeholder='Enter Password  Again '
                    onChangeText={value => this.setState({ confirmPassword: value.trim() })}
                    onBlur={() => {
                        this.setState({
                            confirmpasswordError: validation('confirmpassword', this.state.confirmPassword, this.state.password)
                            // && (this.state.password !== this.state.confirmPassword)
                        })
                    }}
                    validate={<Text>{this.state.confirmpasswordError}</Text>}
                />
                <ButtonField text="submit" onPress={() => this.submit(token)} style={styles.submit_button} />
            </View>

        )
    }
}