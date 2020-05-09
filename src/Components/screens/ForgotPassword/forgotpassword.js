import React, { Component } from 'react'
import { Text, View } from 'react-native'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import {globalstyles} from  '../../../style/style' 
import { styles } from './styles'
import validation from '../../../utils/valid'
export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state= {
            userId: ' ',
           userId_err:' '   
        }
    }
    render() {
        return (
            <View style={globalstyles.Container}>
              
                <Text style={globalstyles.neostore_logo}>NeoSTORE</Text>
                <Text style={globalstyles.Containerhead}>Forgot Password ?</Text>
                <TextField placeholder="Enter Userid" name="user"
                    onChangeText={value => this.setState({ userId: value.trim() })}
                    onBlur={() => {
                        this.setState({
                            userId_err: validation('email', this.state.userId)
                        })
                    }}
                    validate={<Text>{this.state.userId_err}</Text>} />
                
                <ButtonField text = "submit"
                    onPress = {() => this.props.navigation.navigate('SetPassword')}
                    style={styles.submit_button}
                />
                
            </View>
        )
    }
}
