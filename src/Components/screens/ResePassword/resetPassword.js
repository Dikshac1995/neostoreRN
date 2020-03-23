import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { globalstyles } from '../../../style/style'
// import Header from '../../Reusable/header /header'
// import { ScrollView } from 'react-native-gesture-handler'
// import Icon from 'react-native-vector-icons/FontAwesome5';
import PasswordCon from '../../Reusable/Password/Password'
export default class ResetPassword extends Component {
    render() {
        return (
            <>
        
                <View style={globalstyles.Container}>
                
                    <PasswordCon placeholder=' enter current Password' />
                    <PasswordCon placeholder='enter new Password ' />
                    <PasswordCon placeholder =' again enter Password '/>
                    <ButtonField text='submit'
                            //onPress={() => this.login()}
                     onPress={() => this.props.navigation.navigate('AddAddress')}
                        />

                    
                    </View>
            
</>
            
        )
    }
}
