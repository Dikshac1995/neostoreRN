import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class header extends Component {
    render() {
        return (
           <View style={styles.headerSection}>
                {/* <TouchableOpacity onPress = {() => this.props.navigation.navigate('Register')}>
                    <View style = {{backgroundColor:'black',opacity: 0.6,padding: 10}}>
                        <Icon name="menu" size={30} color="#fff" />
                    </View>
                </TouchableOpacity> */}
                <Text>{this.props.title}</Text>
                    
             </View>
        )
    }
}
