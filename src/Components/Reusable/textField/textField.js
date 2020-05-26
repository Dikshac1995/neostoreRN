import React, { Component } from 'react'
import { Text, View, TextInput, } from 'react-native'
import {styles} from './style'
// import icon from '../../../../Assets/icons/icons'
import Icon from 'react-native-vector-icons/FontAwesome';
import OtpIcon from 'react-native-vector-icons/Feather';


// import Icon from 'react-native-vector-icons/Feather';

export default class TextField extends Component {
    constructor(props) {
        super(props) 
         state:[]
    }
    render() {
        return (
            <View>
                <View style={styles.textField_wrapper}>
                <OtpIcon name ={this.props.otp} size={30} color="#fff"/>
                <Icon name = {this.props.name} size ={30}
                 color = "#fff"
                 style = {styles.Icon}/>
                    <TextInput style={styles.input_text} placeholder={this.props.placeholder} placeholderTextColor="white" secureTextEntry={this.props.secureTextEntry ? this.props.secureTextEntry : null}
                    //onBlur={() => { this.props.onBlur() }}
                        value={this.props.value}
                        //  autoFocus={true} selection={{start:0, end:0}}
                onChangeText={this.props.onChangeText ? (e) => this.props.onChangeText(e) : null}      
                        onBlur={this.props.onBlur ? this.props.onBlur : null}
                        maxLength={this.props.maxLength ? this.props.maxLength : null}
                        keyboardType={this.props.keyboardType}
                    >
                </TextInput>
                </View>
                <View>
                    <Text style={{ color: 'white', textAlign: 'center' }}>{this.props.validate ? this.props.validate : null}</Text>
                </View>
            </View>
        )
    }
}
