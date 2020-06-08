import React, { Component } from 'react'
import { Text, View, ScrollView, Alert } from 'react-native'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { styles } from './style'
import Gender from '../../Reusable/Radiobutton/gender'
import Checkbox1 from '../../Reusable/checkBox/checkbox'
import updateValues from '../../../utils/validation'
import { api } from '../../../utils/api'
import { connect } from 'react-redux';
import { register } from '../../../Redux/Action/register'
import { globalstyles } from '../../../style/style'
import validation from '../../../utils/valid'
import PasswordCon from '../../Reusable/Password/Password'
import validated from '../../../utils/validationWrapper'
import {
    Checkbox, RadioButton
} from 'react-native-paper';

class Registration extends Component {

    constructor(props) {
        super(props)
        this.state = {

            firstName: '',
            lastName: '',
            password: '',
            comfirmPassword: ' ',
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
        this.setState({ submitted: true });
        if ((!this.state.firstName) && (!this.state.lastName) && (!this.state.password)
            && (!this.state.confirmPassword)
            // && (!this.state.email)
            // && (!this.state.phoneNo)
            && (!this.state.checked)
        ) {

            Alert.alert('Fill the reuired information ')
        }
        let collection = {}
        collection.first_name = this.state.firstName
        collection.last_name = this.state.lastName
        collection.pass = this.state.password
        collection.confirmPass = this.state.confirmPassword
        collection.email = this.state.email
        collection.phone_no = this.state.phoneNo
        collection.gender = this.state.gender
        console.warn(collection);
        console.log(collection, 'hiiiiiii')
        console.log(Object.keys(collection).length, 'hiiiiiii')

        if (Object.keys(collection).length === 0) {
            Alert.alert('fill the data ')
        }
        else {

            console.warn('hi')
            this.props.register(collection)
        }



        var url = 'http://180.149.241.208:3022/register'
        // api.fetchapi(url, 'post', collection)
        // .then(res => Alert.alert(res))
        //.catch(err=>Alert.alert(err))
        // fetch(url, {
        //     method: 'POST', // or 'PUT'
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(collection),
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('Success:', data);
        //         Alert.alert("you are registered successfully")
        //     })
        //     .catch((error) => {
        //         console.log('Error:', error);
        //     });
    }


    render() {

        const { register } = this.props;
        const { radioCheck } = this.state;
        //const { user, submitted } = this.state;
        console.log("props ffg", register)
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
                    {/* //validate={!this.state.lastNamevalid ? <Text>lastname invalid</Text> : null} */}
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
                        <Text style={
                            styles.GenderName
                        }> Male </Text>
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
                        <Checkbox status={
                            this.state.checked ? 'checked' : 'unchecked'
                        }
                            onPress={
                                () => {
                                    this.setState({
                                        checked: !this.state.checked
                                    });
                                }
                            } />
                        <Text style={styles.text}> I agree </Text>
                        <Text style={styles.terms} onPress={() => Alert.alert('hi')}> terms and conditions </Text>
                    </View>
                    <View>
                        <ButtonField text="Registration" style={styles.registerButton}
                            //onPress={() => this.props.navigation.navigate('loginScreen')} 
                            onPress={() => this.submit()}
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = State => ({
    registering: State.registration,
    // state: State
})


const mapDispatchToProps = (dispatch) => {
    return {
        register: (type) => dispatch(register(type))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Registration)
