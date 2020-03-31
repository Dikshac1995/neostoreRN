import React, { Component } from 'react'
import { Text, View } from 'react-native'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { globalstyles } from '../../../style/style' 
import PasswordCon from '../../Reusable/Password/Password'

export default class SetPassword extends Component {
    render() {
        return (
          
            <View style={globalstyles.Container}>
                <Text style={globalstyles.neostore_logo}>NeoSTORE</Text>
                <Text style={globalstyles.Containerhead}>Set Password</Text>
                <TextField placeholder="Enter OTP" name="trending-down" />
                <PasswordCon placeholder='Enter new Password ' />
                <PasswordCon placeholder='Enter Password  Again ' />
                <ButtonField text="submit" onPress={() => this.props.navigation.navigate('loginScreen')} />
            </View>
            
        )
    }
}