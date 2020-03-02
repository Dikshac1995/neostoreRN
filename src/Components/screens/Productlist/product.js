import React ,{ Component } from 'react'
import { Text, View } from 'react-native'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import {styles} from  '../../../style/style' 

export default class ProductList extends Component {
    render() {
        return (
          
            <View style={styles.Container}>
                <Text style={styles.neostore_logo}>NeoSTORE</Text>
                <Text style={styles.Containerhead}>Set Password</Text>
                <TextField placeholder="Enter OTP" name="user" />
                <TextField placeholder="Enter new password" name="lock" />
                <TextField placeholder="Enter  Password Again" name="lock" />
                <ButtonField text="submit" onPress={() => this.props.navigation.navigate('loginScreen')} />
            </View>
            
        )
    }
}