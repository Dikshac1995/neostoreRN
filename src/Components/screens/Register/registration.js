import React, { Component } from 'react'
import { Text, View ,ScrollView} from 'react-native'
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
            phoneNo:' '
        } 
    }
    updateValue(e) {
        console.warn("check updated value",e)
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
       console.warn(e) 
    }
    submit() {
        let collection = {}
        collection.name=this.state.name
        collection.lastname = this.state.lastName
        console.warn(collection);
    }
    render() {
        return (
            <ScrollView>
            <View style={styles.ResgisterScreen}>
                  <Text style = {styles.register_neostore}> NeoSTORE </Text>
                  <TextField placeholder="First Name" name="user" onChange={(e) => this.updateValue(e)}/>
                  <TextField placeholder="Last Name" name="user"
                    //onChange={() => this.updateValue()} 
                    />
                <TextField placeholder="Password" name="lock" secureTextEntry/>
                <TextField placeholder = "Conform Password" name="lock" secureTextEntry/>
                <TextField placeholder = "Email" name = "envelope" />
                <Gender/>
                <TextField placeholder="Phone number" name="mobile-phone" />
                <Checkbox1/>
                    <ButtonField text="Registration"
                    //onPress={() => this.props.navigation.navigate('loginScreen')} 
                     //onPress={()=> this.submit()}
                    />
                </View>
                </ScrollView>
        )
    }
}
