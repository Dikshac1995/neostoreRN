import React, { Component } from 'react'
import { Text, View, ScrollView, Alert } from 'react-native'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { styles } from './style'
import { api } from '../../../utils/api'
import { connect } from 'react-redux';
import { register } from '../../../Redux/Action/register'
import { globalstyles } from '../../../style/style'
import validation from '../../../utils/valid'
import PasswordCon from '../../Reusable/Password/Password'
import { Checkbox, RadioButton } from 'react-native-paper';



class Registration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: ' ',
            email: ' ',
            phoneNo: ' ',
            gender: '',

            firstNameError: ' ',
            lastNameError: ' ',
            passwordError: ' ',
            confirmpasswordError: ' ',
            emailError: ' ',
            phoneError: ' ',

            submitted: false,
            checked: false,
            radioCheck: 'first',
        }
    }

    submit() {


        const fn_err = validation('firstName', this.state.firstName)
        let collection = {}
        collection.first_name = this.state.firstName
        collection.last_name = this.state.lastName
        collection.pass = this.state.password
        collection.confirmPass = this.state.confirmPassword
        collection.email = this.state.email
        collection.phone_no = this.state.phoneNo
        collection.gender = this.state.gender

        console.log("collect", collection, this.state.firstName)
        console.warn("1234 ", fn_err)

        if (this.state.firstName == " " || this.state.lastName == " " || this.state.password == " "
            || this.state.confirmPassword == " " || this.state.email == " " || this.state.phoneNo == " ") {
            Alert.alert(" Fields can not be empty !")
        }
        else if (this.state.firstNameError !== ' ' || this.state.lastNameError !== ' ' || this.state.passwordError !== ' ' ||
            this.state.confirmpasswordError !== ' ' || this.state.emailError !== ' ' || this.state.phoneError !== ' ') {
            Alert.alert('Fill the Detail properly ')
        }
        else {

            api.fetchapi('http://180.149.241.208:3022/register', 'post', JSON.stringify(collection))
                .then((response) => {
                    console.log('res', response)

                    response.json().then((responseJSON) => {
                        console.log("responseJSON", responseJSON);
                        if (responseJSON.success) {
                            Alert.alert(responseJSON.message)
                            this.props.navigation.navigate('loginScreen')
                        }

                        else {
                            if (responseJSON.error_message) {
                                Alert.alert(responseJSON.error_message)
                            }
                            else {
                                Alert.alert(responseJSON.message)

                            }
                        }

                    })
                }
                )

        }



    }



    render() {
        const { register } = this.props;
        const { radioCheck } = this.state;

        return (
            <ScrollView>
                <View style={globalstyles.Container}>
                    <Text style={styles.register_neostore}>NeoSTORE </Text>
                    <TextField placeholder="First Name" name="user"
                        onChangeText={value => this.setState({ firstName: value.trim() })}
                        onBlur={() => {
                            this.setState({
                                firstNameError: validation('firstName', this.state.firstName)
                            })
                        }}
                        validate={<Text>{this.state.firstNameError}</Text>} />

                    <TextField placeholder="Last Name" name="user" onChangeText={(text) => this.setState({ lastName: text, lastNamevalid: true })}
                        onChangeText={value => this.setState({ lastName: value.trim() })}
                        onBlur={() => {
                            this.setState({
                                lastNameError: validation('lastName', this.state.lastName)
                            })
                        }}
                        validate={<Text>{this.state.lastNameError}</Text>} />

                    <PasswordCon placeholder='Password'
                        onChangeText={value => this.setState({ password: value.trim() })}
                        onBlur={() => {
                            this.setState({
                                passwordError: validation('password', this.state.password)
                            })
                        }}
                        validate={<Text>{this.state.passwordError}</Text>} />

                    <PasswordCon placeholder=' confirm Password'
                        onChangeText={value => this.setState({ confirmPassword: value.trim() })}
                        onBlur={() => {
                            this.setState({
                                confirmpasswordError: validation('confirmpassword', this.state.confirmPassword, this.state.password)
                            })
                        }}
                        validate={<Text>{this.state.confirmpasswordError}</Text>} />

                    <TextField placeholder="Email" name="envelope"
                        onChangeText={value => this.setState({ email: value.trim() })}
                        onBlur={() => {
                            this.setState({
                                emailError: validation('email', this.state.email)
                            })
                        }}
                        validate={<Text>{this.state.emailError}</Text>} />
                    {/* <Gender /> */}
                    <View style={styles.GenderField}>
                        <Text style={styles.Gender}> Gender </Text>
                        <RadioButton value="first"
                            status={radioCheck === 'first' ? 'checked' : 'unchecked'}
                            onPress={() => {
                                this.setState({
                                    radioCheck: 'first',
                                    gender: 'male'
                                });
                            }} />
                        <Text style={styles.GenderName}> Male </Text>
                        <RadioButton value="second" status={radioCheck === 'second' ? 'checked' : 'unchecked'}
                            onPress={() => { this.setState({ radioCheck: 'second', gender: 'female' }); }} />
                        <Text style={styles.GenderName}> Female </Text>
                    </View>

                    <TextField placeholder="Phone number" name="mobile-phone" maxLength={10}
                        keyboardType={"number-pad"}
                        onChangeText={value => this.setState({ phoneNo: value.trim() })}
                        onBlur={() => {
                            this.setState({
                                phoneError: validation('phoneNo', this.state.phoneNo)
                            })
                        }}
                        validate={<Text>{this.state.phoneError}</Text>} />

                    {/* <Checkbox1 /> */}
                    <View style={styles.checkboxField}>
                        <Checkbox status={this.state.checked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                this.setState({ checked: !this.state.checked });
                            }} />
                        <Text style={styles.text}> I agree </Text>
                        <Text style={styles.terms} onPress={() => Alert.alert('hi')}> terms and conditions </Text>
                    </View>

                    <View>
                        <ButtonField text="Registration" style={styles.registerButton}
                            onPress={() => this.submit()}
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }
}




// export default connect(mapStateToProps, mapDispatchToProps)(Registration)
export default Registration
