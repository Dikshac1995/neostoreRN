import React, { Component } from 'react'
import { Text, View } from 'react-native'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { globalstyles } from '../../../style/style' 
import PasswordCon from '../../Reusable/Password/Password'
import { styles } from './styles'
import validation from '../../../utils/valid'
import OtpIcon from 'react-native-vector-icons/Feather';



export default class SetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: ' ',
            password: ' ',
            confirmPassword:' ',
            otp_err: ' ',
            passwordError: ' ',
            confirmpasswordError:' '
        }
    }
    render() {
        return (
          
            <View style={globalstyles.Container}>
                <Text style={globalstyles.neostore_logo}>NeoSTORE</Text>
                <Text style={globalstyles.Containerhead}>Set Password</Text>
                <TextField placeholder="Enter OTP" otp="trending-down"
                    keyboardType={"number-pad"}/>
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
                            confirmpasswordError: validation('confirmPassword', this.state.confirmPassword)
                        })
                    }}
                    validate={<Text>{this.state.confirmpasswordError}</Text>} 
                    />
                <ButtonField text="submit" onPress={() => this.props.navigation.navigate('loginScreen')} style={styles.submit_button}/>
            </View>
            
        )
    }
}