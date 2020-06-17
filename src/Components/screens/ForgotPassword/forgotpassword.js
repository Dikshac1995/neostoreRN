import React, { Component } from 'react'
import { Text, View, Alert } from 'react-native'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { globalstyles } from '../../../style/style'
import { styles } from './styles'
import validation from '../../../utils/valid'
import { api } from '../../..//utils/api'

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: ' ',
            email_err: ' '
        }
    }
    async onsubmit() {
        if (this.state.emailId == ' ') {
            Alert.alert(" email id cannot be empty")
        }
        else if (this.state.email_err !== ' ') {
            Alert.alert(" email  is invalid")
        }
        else {
            const res = await api.fetchapi('http://180.149.241.208:3022/forgotPassword', 'post',
                JSON.stringify({ "email": this.state.emailId }))
            const result = await res.json();
            console.log("api", result)
            if (result.success === true) {
                Alert.alert(result.message)
                this.props.navigation.navigate('SetPassword', { otp: result.otp, token: result.token })
            }
            else {
                Alert.alert(result.message)
            }
        }
    }

    render() {
        return (
            <View style={globalstyles.Container}>
                <Text style={globalstyles.neostore_logo}>NeoSTORE</Text>
                <Text style={globalstyles.Containerhead}>Forgot Password ?</Text>
                <TextField placeholder="Enter Userid" name="user"
                    onChangeText={value => this.setState({ emailId: value.trim() })}
                    onBlur={() => {
                        this.setState({
                            email_err: validation('email', this.state.emailId)
                        })
                    }}
                    validate={<Text>{this.state.email_err}</Text>} />

                <ButtonField text="submit"
                    onPress={() =>
                        this.onsubmit()
                        //  this.props.navigation.navigate('SetPassword')
                    }
                    style={styles.submit_button}
                />

            </View>
        )
    }
}
