import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Header extends Component {
    render() {
        return (
           <View style={{backgroundColor:'red'}}> 
            <View style={{ opacity: 0.6, padding: 10 }}>
                 <Icon name={this.props.name}/>
            </View>
            <Text>{this.props.text}</Text>
                <Icon name ={this.props.serach}size={30} color='#fff'></Icon>
            </View>
        )
    }
}
