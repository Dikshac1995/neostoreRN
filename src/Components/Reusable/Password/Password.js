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
            <View style={styles.Password}>
                <Icon name='lock' size={30} color="#fff" style={styles.Icon} />
                <View style={styles.Placeholder_text}>
                 <TextInput  placeholder={this.props.placeholder}  secureTextEntry={this.state.password}
                        onChnageText={(e) => onChnage(e)} style ={{fontSize:20}} />
                    </View>
                <View >
                <Icon name={this.state.icon} size={30} color ='#fff' style ={styles.eyeIcon} onPress={()=>this.changeIcon()}/>
                </View>
                </View>
               
        )
    }
}
