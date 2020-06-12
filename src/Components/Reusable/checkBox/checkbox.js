import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { styles } from './style';

export default class Checkbox1 extends Component {
    state = {
        checked: false,
    };

    render() {
        const { checked } = this.state;
        return (
            <View style={styles.checkboxField}>
                <Checkbox status={
                    checked ? 'checked' : 'unchecked'
                }
                    onPress={
                        () => {
                            this.setState({
                                checked: !checked
                            });
                        }
                    } />
                <Text style={styles.text}> I agree </Text>
                <Text style={styles.terms} onPress={() => Alert.alert('hi')}> terms and conditions </Text>

            </View>
        );
    }
}
