import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { styles } from './style';

export default function Checkbox1() {
    const [checked, setchecked] = useState(true);

    // state = {
    //     checked: false,
    // };

    // render() {
    const { checked } = this.state;
    return (
        <View style={styles.checkboxField}>
            <Checkbox status={
                checked ? 'checked' : 'unchecked'
            }
                onPress={
                    () => {
                        setchecked(!checked)

                    }
                } />
            <Text style={styles.text}> I agree </Text>
            <Text style={styles.terms} onPress={() => Alert.alert('http://180.149.241.208:3022/2019-06-28T06-10-29.263ZTerms_and_Conditions.pdf')}> terms and conditions </Text>

        </View>
    );
}

