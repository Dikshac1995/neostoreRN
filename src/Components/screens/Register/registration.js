import React, { Component } from 'react'
import { Text, View ,ScrollView, Alert} from 'react-native'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { styles } from './style'
import Gender from '../../Reusable/Radiobutton/gender'
import Checkbox1 from '../../Reusable/checkBox/checkbox'
import updateValues from '../../../utils/validation'
import { api } from '../../../utils/api'
import { connect } from 'react-redux';
import { register } from '../../../Redux/Action/action'
import {globalstyles} from '../../../style/style'

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
                gender: 'male',
                firstNamevalid: true,
                lastNamevalid: true,
                passwordvalid: true,
                confirmpasswordvalid: true,
                emailvalid: true,
                phoneValid: true,
        
            submitted:false
        } 
    }
    
     submit() {
        this.setState({ submitted: true });
        let collection = {}
        collection.first_name = this.state.firstName
        collection.last_name = this.state.lastName
        collection.pass = this.state.password
        collection.confirmPass = this.state.comfirmPassword
        collection.email = this.state.email
        collection.phone_no= this.state.phoneNo
        collection.gender = this.state.phoneNo
        console.warn(collection);
        if (collection) {
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
        const { registering } = this.props;
         //const { user, submitted } = this.state;
        console.log("props ffg",this.props)
        return (
            <ScrollView>
                <View style={globalstyles.Container}>
                  <Text style = {styles.register_neostore}>NeoSTORE </Text>
                    <TextField placeholder="First Name" name="user"
                        onChangeText={(text) => this.setState({ firstName: text })}
                        //onChange={(e) => this.updateValues(e, 'username')}
                        validate={!this.state.firstNamevalid ? <Text>username invalid</Text>:null} />
                    <TextField placeholder="Last Name" name="user" onChangeText={(text) => this.setState({ lastName: text, lastNamevalid: true })}
                        //onChange={(e) => updateValues(e, 'lastname', 'lastNamevalid')}
                       validate={!this.state.lastNamevalid ?<Text>lastname invalid</Text> : null}/>
                    <TextField placeholder="Password" name="lock" secureTextEntry
                        //onChange={(e) => this.updateValue(e, 'password')}
                        validate={!this.state.passwordvalid ? <Text>password invalid</Text> : null}/>
                    <TextField placeholder="Conform Password" name="lock" secureTextEntry
                        //onChange={(e) => this.updateValues(e, 'confirmpassword')}
                        validate={!this.state.confirmpasswordvalid ? <Text>confirm password invalid</Text> : null}/>
                    <TextField placeholder="Email" name="envelope"
                    //    onChange={(e) => this.updateValue(e, 'email')}
                        validate={!this.state.emailvalid ? <Text>email invalid</Text> : null}/>
                    <Gender/>
                    <TextField placeholder="Phone number" name="mobile-phone"
                        //onChange={(e) => this.updateValues(e, 'phoneno')}
                       validate={!this.state.phoneValid ? <Text>phone no  invalid</Text> : null}/>
                    <Checkbox1 />
                    <View>
                    <ButtonField text="Registration" 
                    //onPress={() => this.props.navigation.navigate('loginScreen')} 
                    onPress={()=> this.submit()}
                        />
                    </View>
               </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = State =>({
    registering: State.registration.registering

})

const mapDispatchToProps = (dispatch) => {
    return {
register : (data) => dispatch(register(data))
    }
}

// const mapDispatchToProps = dispatch => ({
//     login: (email, pass) => dispatch(actions.login({ email, pass }))
// })

export default connect(mapStateToProps, mapDispatchToProps)(Registration)
