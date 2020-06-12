import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { styles } from './style'

function Header(props) {


    const text = props.text
    return (
        <View style={styles.header}>
            <View style={styles.headerSection}>
                <TouchableOpacity onPress={props.onPress ? () => props.onPress() : null}  >
                    <AntIcon name={props.name1} size={30} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode='head'>{
                    // ((text).length > 20) ?
                    //     (((text).substring(0, 20 - 3)) + '...') :
                    text}
                </Text>
                <TouchableOpacity >
                    <Icon name={props.name2} size={30} color='#fff'
                        onPress={props.onClick ? () => props.onClick() : null}
                    ></Icon>
                </TouchableOpacity>
            </View >
        </View>


    )
}

export default Header 
