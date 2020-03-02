import * as React from 'react';
import {View,Text} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { styles }  from './style'

export default class Gender extends React.Component {
    state = {
        checked: 'first',
    };

    render() {
        const {checked} = this.state;

        return (
        <View  style ={styles.GenderField}>
            <Text style = {styles.Gender}> Gender </Text>
             <RadioButton value = "first"
              status = {checked === 'first' ? 'checked' : 'unchecked'}
               onPress = {() => {
                    this.setState({
                    checked: 'first'
                    });
                }}/>
                <Text style = {
                    styles.GenderName
                }> Male </Text>
                <RadioButton value = "second" status = {checked === 'second' ? 'checked' : 'unchecked'}
                    onPress={() => { this.setState({ checked: 'second' }); }} />
                <Text style={styles.GenderName}> Female </Text>
        </View>
        );
    }
}