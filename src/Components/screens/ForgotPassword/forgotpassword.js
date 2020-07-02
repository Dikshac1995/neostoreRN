import React, { Component } from 'react'
import { Text, View, Alert } from 'react-native'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { globalstyles } from '../../../style/style'
import { styles } from './styles'
import validation from '../../../utils/valid'
import { api } from '../../..//utils/api'
import Loader from '../../Reusable/loader/loader'

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: ' ',
            email_err: ' ',
            loading: false,
        }
    }
    async onsubmit() {
        const emailErr = validation('email', this.state.emailId)
        this.setState({ email_err: emailErr })
        console.log(emailErr, '1')

        if (emailErr == " ") {
            console.log('hi')
            this.setState({ loading: true })
            const res = await api.fetchapi(api.baseUrl + 'forgotPassword', 'post',
                JSON.stringify({ "email": this.state.emailId }))
            const result = await res.json();
            console.log("api", result)
            if (result.success === true) {
                this.setState({ emailId: ' ' })
                setTimeout(() => {
                    this.setState({ emailId: ' ', loading: false })
                    Alert.alert(result.message)
                    this.props.navigation.navigate('SetPassword', { otp: result.otp, token: result.token })

                }, 3000)

            }
            else {
                setTimeout(() => {
                    this.setState({ loading: false })
                    Alert.alert(result.message)
                }, 3000)
            }
        }

    }
    render() {
        return (
            <View style={{ backgroundColor: 'red', flex: 1, paddingHorizontal: 25, paddingTop: 20 }} >
                <Loader
                    loading={this.state.loading} />
                <Text style={globalstyles.neostore_logo}>NeoSTORE</Text>
                <Text style={globalstyles.Containerhead}>Forgot Password ?</Text>
                <TextField placeholder="Enter Userid" name="user"
                    onChangeText={value => this.setState({
                        emailId: value.trim(),
                        email_err: validation('email', value.trim())
                    })}

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
