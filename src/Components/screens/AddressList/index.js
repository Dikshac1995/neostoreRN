import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Header from '../../Reusable/header /header'
import {styles} from './style'


export default class index extends Component {
    render() {
        return (
            <>
                <Header name1="arrow-left" text=" Address List " name2="search" {...this.props}
                ></Header>
                <Text style={styles.headText}> Shipping Address </Text>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles._button} onPress={this.oderNow}>
                        <Text style={styles._buttonText}>
                        SAVE ADDRESS</Text>
                     </TouchableOpacity>
             </View>
          </>
        )
    }
}
