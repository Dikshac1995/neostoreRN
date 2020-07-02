import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { globalstyles } from '../../../style/style'
import validation from '../../../utils/valid'
import { api } from '../../..//utils/api'
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../Reusable/loader/loader'
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
            oldpassError: ' ',
            loading: false
        }
    }
    async  onSubmit() {
        const passError = validation('password', this.state.oldPass)
        const newpassError = validation('password', this.state.newPass)
        const conpassError = validation('confirmpassword', this.state.confirmPass, this.state.newPass)
        console.log(conpassError, 'dfg')
        this.setState({
            oldpassError: passError,
            newpassError: newpassError,
            confirmpassError: conpassError
        })
        if (passError == " " && newpassError == " " && conpassError == " ") {
            this.setState({ loading: true })
            let token = await AsyncStorage.getItem('token');
            const res = await api.fetchapi(api.baseUrl + 'changePassword', 'post',
                JSON.stringify({ "oldPass": this.state.oldPass, "newPass": this.state.newPass, "confirmPass": this.state.confirmPass }), token)
            const result = await res.json();
            console.log("api", result)
            if (result.sucess === true) {
                this.setState({ loading: false })
                Alert.alert(result.message)
            }
            else {
                this.setState({ loading: false })
                Alert.alert(result.message)
            }
        }
    }

    render() {

        return (
            <>
                <View style={globalstyles.Container}>
                    <Loader
                        loading={this.state.loading} />

                    <PasswordCon placeholder=' enter current Password'
                        onChangeText={value => this.setState({
                            oldPass: value.trim(),
                            oldpassError: validation('password', value)
                        })}
                        validate={<Text>{this.state.oldpassError}</Text>}
                    />
                    <PasswordCon placeholder='enter new Password '
                        onChangeText={value => this.setState({
                            newPass: value.trim(),
                            newpassError: validation('password', value)
                        })}
                        validate={<Text>{this.state.newpassError}</Text>}
                    />
                    <PasswordCon placeholder=' again enter Password '
                        onChangeText={value => this.setState({
                            confirmPass: value.trim(),
                            confirmpassError: validation('confirmpassword', value.trim(), this.state.newPass)
                        })}
                        validate={<Text>{this.state.confirmpassError}</Text>} />
                    <ButtonField text='submit'
                        onPress={() => this.onSubmit()}
                        style={styles.submit_button}
                    />


                </View>

            </>

        )
    }
}
