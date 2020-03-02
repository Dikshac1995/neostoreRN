import React, { Component } from 'react'
import { Text, View } from 'react-native'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'

export default class ForgotPassword extends Component {
    render() {
        return (
           <View >
                <View>    
                    <Text>NeoSTORE</Text>
                    <Text>Forgot Password ?</Text>
                    <TextField placeholder="Enter Userid" name="user" />
                    < ButtonField text = "submit"
                    onPress = {
                        () => this.props.navigation.navigate('SetPassword')
                    }
                    />
                </View>   
            </View>
        )
    }
}
