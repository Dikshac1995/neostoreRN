import React, { Component } from 'react'
import { Text, View, TextInput } from 'react-native'
import {styles} from './style'
// import icon from '../../../../Assets/icons/icons'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class TextField extends Component {
    constructor(props) {
        super(props)
         state:[]
    }
    render() {
        return (
            <View style = {styles.textField_wrapper}>
                <Icon name = {this.props.name} size ={30}
                 color = "#fff"
                 style = {styles.Icon}/>
                <TextInput style={styles.input_text} placeholder={this.props.placeholder} secureTextEntry={this.props.secureTextEntry ? this.props.secureTextEntry : null}
                    onChangeText = {
                        this.props.onChange ? (e)=>this.props.onChange(e):null
                    }
                >
                </TextInput>
            </View>
        )
    }
}
