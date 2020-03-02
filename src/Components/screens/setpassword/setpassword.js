import React, { Component } from 'react'
import { Text, View } from 'react-native'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'

export default class SetPassword extends Component {
    render() {
        return (
           <View >
                <View>    
                    <Text>NeoSTORE</Text>
                    <Text>Set Password</Text>
                    <TextField placeholder="Enter OTP" name="user" />
                    <TextField placeholder="Enter new password" name="lock"/>
                    <TextField placeholder="Enter  Password Again" name="lock"/>
                    <ButtonField text = "submit" onPress = {()=>this.props.navigation.navigate('loginScreen')}/>
                </View>   
            </View>
        )
    }
}