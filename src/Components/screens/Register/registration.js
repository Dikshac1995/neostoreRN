import React, { Component } from 'react'
import { Text, View ,ScrollView, Alert} from 'react-native'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { styles } from './style'
import Gender from '../../Reusable/Radiobutton/gender'
import Checkbox1 from '../../Reusable/checkBox/checkbox'

export default class Registration extends Component {

    constructor(props) {
        super(props)
        this.state={
            firstName: '',
            lastName: '',
            password: '',
            comfirmPassword: ' ',
            email:' ',
            phoneNo: ' ',
            gender:'male',
            
            firstNamevalid: true,
            lastNamevalid: true,
            passwordvalid: true,
            confirmpasswordvalid: true,
            emailvalid: true,
            phoneValid:true,
        } 
    }
    updateValue(text,type) {
        const regex = /^[A-Za-z]+$/
        const passreg = /^[0-9]+$/
        const emailPattern = /^([a-zA-Z])+([0-9a-zA-Z_\.\-])+\@+(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,5}$)$/;
        console.warn("text is valid",text,type);
        if(type == 'username') {
            this.setState({ firstName: text })
            console.warn ("firstname state",this.state.firstName)
            if(regex.test(text)) {
                this.setState({ firstNamevalid:true})
                console.warn("text is valid ")
            }
            else {
                this.setState({ firstNamevalid: false})
                //console.warn("text is valid ")
                //console.warn("text is invalid ")
            }
        }
        if (type == 'lastname') {
            this.setState({ lastName: text })
            if (regex.test(text)) {
                this.setState({ lastNamevalid: true })
                //console.warn("lastname is valid ")
            }
            else {
                this.setState({ lastNamevalid: false })
                //console.warn("text is invalid ")
            }
        }
        else if (type == 'password') {
            this.setState({ password: text })
            if (passreg.test(text)) {
                this.setState({ passwordvalid: true})
                //console.warn("text is valid ")
            }
            else {
                this.setState({ passwordvalid: false })
                //console.warn("password is invalid ")
            }
        }
        else if (type == 'confirmpassword') {
            this.setState({ comfirmPassword: text })
            if (passreg.test(text)) {
                this.setState({ confirmpasswordvalid: true })
                //console.warn("text is valid ")
            }
            else {
                this.setState({ confirmpasswordvalid: false })
                //console.warn("password is invalid ")
            }
        }
        else if (type == 'email') {
            this.setState({ email: text })
            if (emailPattern.test(text)) {
                this.setState({ emailvalid: true })
                //console.warn("text is valid ")
            }
            else {
                this.setState({ emailvalid: false })
                //console.warn("password is invalid ")
            }
        }
        else if (type == 'phoneno') {
            this.setState({ phoneNo: text })
            if (passreg.test(text)) {
                this.setState({ phoneValid: true })
                //console.warn("text is valid ")
            }
            else {
                this.setState({ phoneValid: false })
                //console.warn("password is invalid ")
            }
        }
        //onChangeText = { value => this.setState({ email: value.trim() }) }
        // if (field == this.state.firstName) {
        //     this.setState({
        //         name: text
        //     })
        // }
        // else if (field == this.state.lastName) {
        //     this.setState({
        //         lastName:text
        //     })
        // }
       //console.warn(e) 
    }
    submit() {
        let collection = {}
        collection.first_name = this.state.firstName
        collection.last_name = this.state.lastName
        collection.pass = this.state.password
        collection.confirmPass = this.state.comfirmPassword
        collection.email = this.state.email
        collection.phone_no= this.state.phoneNo
        collection.gender = this.state.phoneNo
       console.warn(collection);

        
        var url = 'http://180.149.241.208:3022/register'
        fetch(url, {
            method: 'POST', // or 'PUT'
            headers: {
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
    render() {
        return (
            <ScrollView>
              <View style={styles.ResgisterScreen}>
                  <Text style = {styles.register_neostore}> NeoSTORE </Text>
                    <TextField placeholder="First Name" name="user" onChange={(e) => this.updateValue(e, 'username')}
                    validate ={!this.state.firstNamevalid ? <Text>username invalid</Text> : null}/>
                    <TextField placeholder="Last Name" name="user" onChange={(e) => this.updateValue(e, 'lastname')}
                    validate={!this.state.lastNamevalid ? <Text>lastname invalid</Text> : null}/>
                    <TextField placeholder="Password" name="lock" secureTextEntry onChange={(e) => this.updateValue(e, 'password')}
                        validate={!this.state.passwordvalid ? <Text>password invalid</Text> : null}/>
                    <TextField placeholder="Conform Password" name="lock" secureTextEntry onChange={(e) => this.updateValue(e, 'confirmpassword')}
                        validate={!this.state.confirmpasswordvalid ? <Text>confirm password invalid</Text> : null}/>
                    <TextField placeholder="Email" name="envelope" onChange={(e) => this.updateValue(e, 'email')}
                        validate={!this.state.emailvalid ? <Text>email invalid</Text> : null}/>
                    <Gender/>
                    <TextField placeholder="Phone number" name="mobile-phone" onChange={(e) => this.updateValue(e, 'phoneno')}
                       validate={!this.state.phoneValid ? <Text>phone no  invalid</Text> : null}/>
                    <Checkbox1/>
                    <ButtonField text="Registration"
                    //onPress={() => this.props.navigation.navigate('loginScreen')} 
                    onPress={()=> this.submit()}
                    />
               </View>
            </ScrollView>
        )
    }
}
//onChangeText={value => this.setState({ firstName:value()})}