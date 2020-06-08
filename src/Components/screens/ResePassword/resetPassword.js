import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { globalstyles } from '../../../style/style'
import validation from '../../../utils/valid'
import { api } from '../../..//utils/api'
import AsyncStorage from '@react-native-community/async-storage';

import authHeader from '../../../Redux/helper/authHeader'
import PasswordCon from '../../Reusable/Password/Password'
import { styles } from './style'
export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPass: '',
            newPass: '',
            confirmPass: '',
            confirmpassError: ' ',
            newpassError: ' ',
            oldpassError: ' '
        }
    }
    async  onSubmit() {
        let token = await AsyncStorage.getItem('token');
        const res = await api.fetchapi('http://180.149.241.208:3022/changePassword', 'post',
            JSON.stringify({ "oldPass": this.state.oldPass, "newPass": this.state.newPass, "confirmPass": this.state.confirmPass }), token)
        const result = await res.json();
        console.log("api", result.sucess)
        if (result.sucess === true) {

            Alert.alert(result.message)

        }
        else {
            console.log(result.json, " g")
            Alert.alert("old password is incorrect ")
        }
    }


    render() {

        return (
            <>

                <View style={globalstyles.Container}>

                    <PasswordCon placeholder=' enter current Password'
                        onChangeText={value => this.setState({ oldPass: value.trim() })}
                        onBlur={() => {
                            this.setState({
                                oldpassError: validation('password', this.state.oldPass)
                            })
                        }}
                        validate={<Text>{this.state.oldpassError}</Text>}
                    />
                    <PasswordCon placeholder='enter new Password '
                        onChangeText={value => this.setState({ newPass: value.trim() })}
                        onBlur={() => {
                            this.setState({
                                newpassError: validation('password', this.state.newPass)
                            })
                        }}
                        validate={<Text>{this.state.newpassError}</Text>}
                    />
                    <PasswordCon placeholder=' again enter Password '
                        onChangeText={value => this.setState({ confirmPass: value.trim() })}
                        onBlur={() => {
                            this.setState({
                                confirmmpassError: validation('confirmpassword', this.state.confirmPass, this.state.newPass)
                            })
                        }}
                        validate={<Text>{this.state.confirmpassError}</Text>} />
                    <ButtonField text='submit'
                        onPress={() => this.onSubmit()}
                        style={styles.submit_button}
                    //    onPress={() => this.props.navigation.navigate('AddAddress')}
                    />


                </View>

            </>

        )
    }
}
