import React, { Component } from 'react'
import { Text, View, TextInput, } from 'react-native'
// import { styles } from './style'
// import icon from '../../../../Assets/icons/icons'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { styles } from './style'

export default class PasswordCom extends Component {
    constructor(props) {
        super(props)
       this.state= {
            icon: 'eye-slash',
            password:true
        }
    }
    changeIcon() {
        this.setState(PrevState => ({
            icon: PrevState.icon === 'eye' ? 'eye-slash' : 'eye',
            password:!PrevState.password
        }))
    }
    render() {
        return (
        <View>
            <View style={styles.Password}>
                <Icon name='lock' size={30} color="#fff" style={styles.Icon} />
                <View style={styles.Placeholder_text}>
                    <TextInput placeholder={this.props.placeholder} placeholderTextColor="#fff" secureTextEntry={this.state.password}
                            value={this.props.value}
                            onChangeText={this.props.onChangeText ? (e) => this.props.onChangeText(e) : null} style={styles.inputText}
                            onBlur={this.props.onBlur ? this.props.onBlur : null}
                        />
                    </View>
                <View >
                <Icon name={this.state.icon} size={30} color ='#fff' style ={styles.eyeIcon} onPress={()=>this.changeIcon()}/>
                </View>
            </View>
            <View>
                <Text style={styles.validText}>{this.props.validate ? this.props.validate : null}</Text>
             </View>
        </View>
               
        )
    }
}
