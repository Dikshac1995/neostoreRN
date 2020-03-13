import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { styles } from '../../../style/style'
// import { styles } from '../../Reusable/textField/style';
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
            <View style={styles.card}>
               <View style={style.cards}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('productList', {category_id: this.props.category_id})}>
                    <>
                        <View style={style.CardContents}>
                            <Text style={style.card_name}>
                             {this.props.title}
                            </Text></View>
                        <View
                        style={style.CardContentRC}
                        ><Icon name={this.props.name} size={50}
                    color="#fff" /></View></>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export const style = StyleSheet.create({
    cards: {
        //display: 'flex',
       // justifyContent:'space-between',
        backgroundColor: 'red',
        height: 150,
        //width: 180,
        padding: 10,
       margin:15,
        // marginTop: 20,
        // marginRight: 10,
        // marginLeft: 10,
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
