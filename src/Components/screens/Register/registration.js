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
            comformPassword: ' ',
            phoneNo: ' ',
            
            firstNamevalid:true,
        } 
    }
    updateValue(text,type) {
        const regex = /^[A-Za-z]+$/
        console.warn("text is valid",text,type);
        if(type =='username') {
            if(regex.test(text)) {
                this.setState({ firstNamevalid:true})
                console.warn("text is valid ")
            }
            else {
                this.setState({ firstNamevalid: false})
                console.warn("text is valid ")
                console.warn("text is invalid ")
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
        collection.firstname=this.state.firstname
        collection.lastname = this.state.lastName
        console.warn(collection);
    }
    render() {
        return (
            <ScrollView>
            <View style={styles.ResgisterScreen}>
                  <Text style = {styles.register_neostore}> NeoSTORE </Text>
                    <TextField placeholder="First Name" name="user" onChange={(e) => this.updateValue(e, 'username')}
                         validate ={!this.state.firstNamevalid ? <Text>username invalid</Text> : null}/>
                  <TextField placeholder="Last Name" name="user" 
                    />
                <TextField placeholder="Password" name="lock" secureTextEntry/>
                <TextField placeholder = "Conform Password" name="lock" secureTextEntry/>
                <TextField placeholder = "Email" name = "envelope" />
                <Gender/>
                <TextField placeholder="Phone number" name="mobile-phone" />
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