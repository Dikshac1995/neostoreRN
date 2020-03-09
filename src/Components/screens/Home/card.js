import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
// import bedIcon from 'react-native-vector-icons/Ionicons';
export default class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {
            style: this.props.style || {},
        }
    }
    render() {

        return (
            <View style={styles.cards}>
                <TouchableOpacity onPress={ ()=>this.props.navigation.navigate('productList')}>
                    <>
                  <View style={styles. CardContents}><Text style = {styles.card_name}>{this.props.title}</Text></View>
                  <View style={styles.CardContentRC}><Icon name={this.props.name} size={50}
                    color="#fff" /></View></>
                </TouchableOpacity>
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    cards: {
        display: 'flex',
        backgroundColor: 'red',
        height: 150,
        width: 180,
        padding: 10,
        marginTop: 20,
        marginRight: 10,
        marginLeft: 10,
        borderRadius:5
        
    },
    CardContents: {
       
       alignItems:'flex-start'
    },
    CardContentRC: {
       alignItems:'flex-end'
    },
    card_name: {
        color: 'white',
        fontSize: 30,
        
    },
    icons: {
        color: 'white',
        
  }
    
})
