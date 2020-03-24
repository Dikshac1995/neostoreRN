import React, { Component } from 'react'
import { Text, View ,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './style'

export default class Header extends Component {
    render() {
        return (
        //    <View style={{backgroundColor:'red'}}> 
        //     <View style={{ opacity: 0.6, padding: 10 }}>
        //          <Icon name={this.props.name}/>
        //     </View>
        //     <Text>{this.props.text}</Text>
        //         <Icon name ={this.props.serach}size={30} color='#fff'></Icon>
        //     </View>
            
            <View style={styles.headerSection}>
            <TouchableOpacity>
                
                    <Icon name={this.props.name1} size={30} color="#fff" />
                
            </TouchableOpacity>
                <Text style={styles.headerTitle}>{this.props.text}</Text>
                <TouchableOpacity>
                    <Icon name={this.props.name2} size={30} color='#fff'></Icon>
                </TouchableOpacity>
              </View >
        )
    }
}
