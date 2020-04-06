import React, { Component } from 'react';

import { StyleSheet, View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


export default class ActionBarImage extends Component {
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Icon name="dungeon" size={30} />
            </View>
        );
    }
}