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
        const email = this.state.emaiId
        const res = await api.fetchapi('http://180.149.241.208:3022/forgotPassword', 'post',
            JSON.stringify({ "email": this.state.emailId }))
        const result = await res.json();
        console.log("api", result)
        if (result.success === true) {

            this.props.navigation.navigate('SetPassword', { otp: result.otp, token: result.token })
        }
        else {
            console.log(result.json, " g")
            Alert.alert("email_id is invalid")
        }
    }

    // submit() {
    //     const email = this.state.emaiId
    //     console.warn('Hi', this.state.emailId)
    //     // if ((!this.state.emaiId) && (this.state.email_err)) {
    //     //     Alert.alert(" emailId  is required")
    //     // }
    //     // else {


    //     fetch("http://180.149.241.208:3022/forgotPassword", {

    //         // Adding method type 
    //         method: "POST",

    //         // Adding body or contents to send 
    //         body: JSON.stringify({
    //             "email": this.state.emailId
    //         }
    //         ),

    //         // Adding headers to the request 
    //         headers: {
    //             "Content-type": "application/json; charset=UTF-8"
    //         }
    //     })

    //         // Converting to JSON 
    //         .then(response => response.json())

    //         // Displaying results to console 
    //         .then(json => {
    //             let data = json
    //             console.log(data)
    //             console.log(data.success)

    //             // {
    //             //     data.success ?
    //             //         this.props.navigation.navigate('SetPassword') :
    //             //         Alert.alert(data.error_message)

    //             // }
    //             if (data.success === true) {
    //                 this.props.navigation.navigate('SetPassword')
    //             }
    //             else {
    //                 console.log(data.json, " g")
    //                 Alert.alert("email_id is invalid")
    //             }

    //             // }
    //         }
    //         );





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
