import React, { Component } from 'react'
import { Text, View ,Button, Alert} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import {globalstyles} from '../../../style/style'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { styles } from './style'
import AsyncStorage from '@react-native-community/async-storage';
import authHeader from '../../../Redux/helper/authHeader'


export default class AddAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            LANDMARK: ' ',
            city:'',
            state: ' ',
            pinCode: ' ',
            country:' '
            
        }
    }
    AddAddress() {
        let collection = {}
        collection.address = this.state.address
        collection.pincode = this.state.pinCode
        collection.city = this.state.city
        collection.state = this.state.state
        collection.country = this.state.country
        
        console.warn(collection);
        if (collection) {
             console.log(authHeader)
            var url = 'http://180.149.241.208:3022/address'
            // api.fetchapi(url, 'post', collection)
            //     .then(res => Alert.alert(res))
            //     .catch(err => Alert.alert(err))
            fetch(url, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    ...authHeader,
                   // Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQ4LCJpYXQiOjE1ODU4NDg2ODN9._haZuVTP_lRWl4bNyouhe - oAuDulp7mzBYWwHsxmUQE
                //Authorization: token ? 'Bearer ' + AsyncStorage.getItem('token') : null
                },
                body: JSON.stringify(collection),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.suceess) {
                        console.log('Success:', data);
                        Alert.alert(" data send successfully ")
                    }
                    else {
                        Alert.alert(" data send unsuccessfully ")
                    

                    }
                })
                .catch((error) => {
                    console.log('Error:', error);
                });
        }
        else {
            Alert.alert('fill data ')
        }
    }
    render() {
        return (
            <View style={styles.Address_container}>
                <View style={styles.Address_wrapper}>
                    <View style={styles.fields}>
                    <Text style={styles.Text_label}> ADDRESS</Text>
                    <View style={styles.Address_TextField}>
                        <TextInput multiline={true}
                                numberOfLines={4}
                                onChangeText={value => this.setState({address: value.trim() })}></TextInput> 
                    </View>
                    </View>

                    <Text style={styles.Text_label}> LANDMARK</Text>
                    <View style={styles.Address_TextField}>
                        <TextInput onChangeText={value => this.setState({ LANDMARK: value.trim() })} />
                    </View>
             
             <View  style ={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{ width: 170 }}>
                            <Text style={styles.Text_label}> CITY</Text>
                    <View style={styles.Address_TextField}>
                                <TextInput onChangeText={value => this.setState({ city: value.trim() })}/>
                    </View>
               </View>
             <View style={{ width: 170 }}>
                            <Text style={styles.Text_label}> STATE</Text>
                    <View style={styles.Address_TextField}>
                                <TextInput onChangeText={value => this.setState({ state: value.trim() })}/>
                    </View>
                 </View>
             </View> 

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: 170 }}>
                            <Text style={styles.Text_label}> ZIP CODE</Text>
                            <View style={styles.Address_TextField}>
                                <TextInput onChangeText={value => this.setState({ pinCode: value.trim() })} />
                            </View>
                        </View>
                        <View style={{ width: 170 }}>
                            <Text style={styles.Text_label}> COUNTRY</Text>
                            <View style={styles.Address_TextField}>
                                <TextInput onChangeText={value => this.setState({ country: value.trim() })}/>
                            </View>
                        </View>  
                    </View>
                   
                    




                    {/* <Text style ={styles.Text_label}> ADDRESS</Text>
                    <View style={styles.Address_TextField}>
                        <TextInput multiline={true}
                        numberOfLines={4}></TextInput>
                    </View>
                    <View>
                        <Text style={styles.Text_label}>LANDMARK</Text>
                        <TextField />
                    </View>
                <View style ={{display:'flex'}}>
                    <View style={{ flexDirection: 'row',justifyContent:'space-between',width:300,backgroundColor:'white'}}>
                        <Text style={styles.Text_label}>CITY</Text>
                        <Text style={styles.Text_label}>STATE</Text>   
                    </View> 
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap:"wrap",width:200}}>
                        <TextField width ='100' />
                        <TextField />
                    </View>
                    <View style={{ flexDirection: 'row',justifyContent:'space-evenly' }}>
                        <Text style={styles.Text_label}>ZIP CODE</Text>
                        <Text style={styles.Text_label}>COUNTRY</Text>
                        
                    </View>
                    <View style={{ flexDirection: 'row', width: 200}}>
                            <TextInput />
                        </View> 
                </View> */}
                   
                </View>
                <View style={styles.footer}>
                    <View>
                        <ButtonField text='SAVE ADDRESS' style={styles.addAddress_button}
                            onPress={() => this.AddAddress()} />
                    </View>
                </View>
            </View>
        )
    }
}
