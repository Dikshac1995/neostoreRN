import React, { Component } from 'react'
import { Text, View ,Button} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import {globalstyles} from '../../../style/style'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import {styles }from './style'

export default class AddAddress extends Component {
    render() {
        return (
            <View style={styles.Address_container}>
                <View style ={styles.Address_wrapper}>
                    <Text style ={styles.Text_label}> ADDRESS</Text>
                    <View style={styles.Address_TextField}>
                        <TextInput multiline={true}
                        numberOfLines={4}></TextInput>
                    </View>
                    <View>
                        <Text style={styles.Text_label}>LANDMARK</Text>
                        <TextField />
                    </View>
                <View style ={{display:'flex'}}>
                    <View style={{ flexDirection: 'row',justifyContent:'space-between'}}>
                        <Text style={styles.Text_label}>CITY</Text>
                        <Text style={styles.Text_label}>STATE</Text>   
                    </View> 
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width:200, }}>
                        <TextField />
                        <TextField />
                    </View>
                    <View style={{ flexDirection: 'row',justifyContent:'space-between' }}>
                        <Text style={styles.Text_label}>ZIP CODE</Text>
                        <Text style={styles.Text_label}>COUNTRY</Text>
                        
                    </View>
                    <View style={{ flexDirection: 'row', width: 200}}s>
                        <TextField />
                        <TextField />
                    </View> 
                </View>
                    <ButtonField text='submit' />
                    </View>
            </View>
        )
    }
}
