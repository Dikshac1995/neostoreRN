import React, { Component } from 'react'
import { Text, View ,Button} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import {globalstyles} from '../../../style/style'
import TextField from '../../Reusable/textField/textField'
import  ButtonField from '../../Reusable/ButtonField/buttonField'

export default class AddAddress extends Component {
    render() {
        return (
            <View style ={globalstyles.Container}>
                <Text> ADDRESS</Text>
                <View style={{borderWidth:2,borderColor:'#fff'}}>
                <TextInput multiline={true}
                        numberOfLines={4}></TextInput>
                </View>
                <Text>LANDMARK</Text>
               <TextField/>
                <View style ={{display:'flex'}}>
                    <View style={{ flexDirection: 'row',justifyContent:'space-between'}}>
                        <Text>CITY</Text>
                        <Text>STATE</Text>
                        
                    </View> 
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width:200 }}>
                        <TextField />
                        <TextField />
                    </View>
                    <View style={{ flexDirection: 'row',justifyContent:'space-between' }}>
                        <Text>ZIP CODE</Text>
                        <Text>COUNTRY</Text>
                        
                    </View>
                    <View style={{ flexDirection: 'row', width: 200}}s>
                        <TextField />
                        <TextField />
                    </View> 
                </View>
               <ButtonField text='submit'/>
            </View>
        )
    }
}
