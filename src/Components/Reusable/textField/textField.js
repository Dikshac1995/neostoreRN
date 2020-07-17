import React, { Component } from 'react'
import { Text, View, TextInput, } from 'react-native'
import { styles } from './style'
import Icon from 'react-native-vector-icons/FontAwesome';
import OtpIcon from 'react-native-vector-icons/Feather';
import { _color } from '../../../Assets/Constant/constant';



function TextField(props) {

    return (
        <View>
            <View style={styles.textField_wrapper}>
                <OtpIcon name={props.otp} size={30} color="#fff" />
                <Icon name={props.name} size={30}
                    color="#fff"
                    style={styles.Icon} />
                <TextInput style={styles.input_text} placeholder={props.placeholder}
                    placeholderTextColor={_color.placeholderColor}
                    secureTextEntry={props.secureTextEntry ? props.secureTextEntry : null}
                    //onBlur={() => { this.props.onBlur() }}
                    value={props.value}
                    // adjustsFontSizeToFit
                    //  autoFocus={true} selection={{start:0, end:0}}
                    onChangeText={props.onChangeText ? (e) => props.onChangeText(e) : null}
                    onBlur={props.onBlur ? props.onBlur : null}
                    maxLength={props.maxLength ? props.maxLength : null}
                    keyboardType={props.keyboardType}
                    defaultValue={props.defaultValue}
                    editable={props.editable}
                // style={{ backgroundColor: 'yellow' }}
                >
                </TextInput>
            </View>
            <View>
                <Text style={{ color: 'white', paddingLeft: 60 }}>{props.validate ? props.validate : null}</Text>
            </View>
        </View>
    )

}
export default TextField;
