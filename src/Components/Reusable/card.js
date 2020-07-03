import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { globalstyles } from '../../style/style'


function Card(props) {
    console.log('id', props.category_id)
    return (
        <View style={globalstyles.card}>
            <View style={style.cards}>
                <TouchableOpacity onPress={() => props.navigation.navigate('productList', {
                    category_id: props.category_id,
                    category_name: props.category_name
                })}>

                    {props.position1 ? (
                        <>
                            <View style={style.CardContents}>
                                <Text style={style.card_name}>
                                    {props.title}
                                </Text>
                            </View>
                            <View style={style.CardContentRC}>
                                <Icon name={props.name} size={60} color="#fff" />
                            </View></>
                    ) : (<>
                        <View style={style.CardContents}>
                            <Icon name={props.name} size={60} color="#fff" />
                        </View>
                        <View style={style.CardContentRC}>

                            <Text style={style.card_name}>
                                {props.title}
                            </Text>
                        </View></>)}

                </TouchableOpacity>
            </View>
        </View>
    )
}


export const style = StyleSheet.create({

    cards: {
        backgroundColor: 'red',
        height: 150,
        padding: 10,
        margin: 15,
        borderRadius: 5

    },
    CardContents: {
        alignItems: 'flex-start'
    },
    CardContentRC: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginTop: 25
    },
    card_name: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold'

    },
    icons: {
        color: 'white',

    }

})
export default Card 