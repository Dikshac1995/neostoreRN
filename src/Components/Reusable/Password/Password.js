import React, { useState } from "react";
import { Text, View, TextInput, } from 'react-native'
import { _color } from '../../../Assets/Constant/constant'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { styles } from './style'

export default function PasswordCom(props) {
    const [password, setpassword] = useState(true);
    // const [icon, seticon] = useState('eye-slash');

    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         icon: 'eye-slash',
    //         password: true
    //     }
    // }
    function changeIcon() {
        // seticon('eye')
        setpassword(!password)
        // this.setState(PrevState => ({
        //     icon: PrevState.icon === 'eye' ? 'eye-slash' : 'eye',
        //     password: !PrevState.password
        // }))
    }

    return (
        <View>
            <View style={styles.Password}>
                <Icon name='lock' size={30} color="#fff" style={styles.Icon} />
                <View style={styles.Placeholder_text}>
                    <TextInput underlineColorAndroid="transparent" placeholder={props.placeholder}
                        placeholderTextColor={_color.placeholderColor} secureTextEntry={password}
                        value={props.value}
                        onChangeText={props.onChangeText ? (e) => props.onChangeText(e) : null}
                        style={styles.inputText}
                        onBlur={props.onBlur ? props.onBlur : null}
                    />
                </View>
                <View >
                    <Icon name={password ? 'eye-slash' : 'eye'} size={30} color='#fff' style={styles.eyeIcon}
                        onPress={() => changeIcon()} />
                </View>
            </View>
            <View>
                <Text style={styles.validText}>{props.validate ? props.validate : null}</Text>
            </View>
        </View>

    )
}

