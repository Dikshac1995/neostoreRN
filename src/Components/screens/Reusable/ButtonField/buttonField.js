import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native'
import { styles } from './style'

export default class ButtonField extends Component {
    render() {
        return (
            <View>
               <TouchableOpacity style={styles.button1}>
                   <View>
                        <Text style = {styles.buttonText}> {this.props.text} </Text>
                   </View> 
                   </TouchableOpacity>
            </View>
        )
    }
}
