import React, { Component } from 'react'
import { Text, View } from 'react-native'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import {styles} from  '../../../style/style' 
export default class ForgotPassword extends Component {
    render() {
        return (
            <View style={styles.Container}>
              
                    <Text style={styles.neostore_logo}>NeoSTORE</Text>
                    <Text style={styles.Containerhead}>Forgot Password ?</Text>
                    <TextField placeholder="Enter Userid" name="user" />
                    < ButtonField text = "submit"
                    onPress = {
                        () => this.props.navigation.navigate('SetPassword')
                    }
                    />
                
            </View>
        )
    }
}
