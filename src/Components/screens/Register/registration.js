import React, { Component } from 'react'
import { Text, View ,ScrollView} from 'react-native'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { styles } from './style'
import Gender from '../../Reusable/Radiobutton/gender'
import Checkbox1 from '../../Reusable/checkBox/checkbox'

export default class Registration extends Component {
    render() {
        return (
            <ScrollView>
            <View style={styles.ResgisterScreen}>
                  < Text style = {
                      styles.register_neostore
                  } > NeoSTORE </Text>
                <TextField placeholder="First Name" name="user" />
                <TextField placeholder="Last Name" name="user" />
                <TextField placeholder="Password" name="lock" secureTextEntry/>
                <TextField placeholder = "Conform Password" name="lock" secureTextEntry/>
                <TextField placeholder = "Email" name = "envelope" />
                <Gender/>
                < TextField placeholder="Phone number" name="mobile-phone" />
                < Checkbox1 />
                <ButtonField text = "Registration" onPress = {() => this.props.navigation.navigate('loginScreen')}/>
                </View>
                </ScrollView>
        )
    }
}
