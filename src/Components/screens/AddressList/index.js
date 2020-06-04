import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Header from '../../Reusable/header /header'
import { styles } from './style'
import { Searchbar, TextInput } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { Icon } from 'react-native-vector-icons/FontAwesome5';



export default class index extends Component {
    render() {
        return (
            <>
                <Header name1="arrow-left" text=" Address List " name2="search" {...this.props}
                    onPress={() => this.props.navigation.goBack()} />
                <Text style={styles.headText}> Shipping Address </Text>
                <Animatable.View animation="slideInRight" duration={500}>
                    <View style={{ width: 300, borderRadius: 30 }}>

                        <TextInput placeholder='search' />
                    </View>
                    {/* <Searchbar
                    placeholder="Search"
                // onChangeText={query => { this.setState({ firstQuery: query }); }}
                // value={firstQuery}
                    /> */}
                </Animatable.View >
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
