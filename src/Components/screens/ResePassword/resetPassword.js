import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { globalstyles } from '../../../style/style'
// import Header from '../../Reusable/header /header'
// import { ScrollView } from 'react-native-gesture-handler'
// import Icon from 'react-native-vector-icons/FontAwesome5';
import authHeader from '../../../Redux/helper/authHeader'
import PasswordCon from '../../Reusable/Password/Password'
export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPass: '',
            newPass: '',
            confirmPass:' ',
            emailValid: true,
            passValid: true,
        }
    }

    submit() {
        let collection = {}
        collection.newPass = this.state.newPass
        collection.oldPass = this.state.oldPass
        collection.confirmPass = this.state.confirmPass
        if (collection) {
            var url = 'http://180.149.241.208:3022/changePassword'
            fetch(url)
                .then(res => Alert.alert(res))
                .catch(err => Alert.alert(err))
            fetch(url, {
                method: 'POST', // or 'PUT'
                headers: {
                    ...authHeader(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(collection),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                    Alert.alert("you are registered successfully")
                })
                .catch((error) => {
                    console.log('Error:', error);
                });
        
        }

    
        else {
            Alert.alert("error")
    
}}
    render() {
        return (
            <>
        
                <View style={globalstyles.Container}>
                
                    <PasswordCon placeholder=' enter current Password'
                        onChangeText={value => this.setState({ oldPass: value.trim() })}/>
                    <PasswordCon placeholder='enter new Password '
                        onChangeText={value => this.setState({ newPass: value.trim() })}/>
                    <PasswordCon placeholder=' again enter Password '
                        onChangeText={value => this.setState({ confirmPass: value.trim() })}/>
                    <ButtonField text='submit'
                            onPress={() => this.submit()}
                 //    onPress={() => this.props.navigation.navigate('AddAddress')}
                        />

                    
                    </View>
            
</>
            
        )
    }
}
