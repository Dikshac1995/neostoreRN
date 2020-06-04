import React, { Component } from 'react'
import { Text, View, Button, Alert, ScrollView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { globalstyles } from '../../../style/style'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { styles } from './style'
import AsyncStorage from '@react-native-community/async-storage';
import authHeader from '../../../Redux/helper/authHeader'
import validation from '../../../utils/valid'
import { tokenHard } from '../../../Assets/Constant/constant'
import { api } from '../../../utils/api'
import Header from '../../Reusable/header /header'



export default class AddAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            LANDMARK: ' ',
            City: '',
            state: ' ',
            zipCode: ' ',
            country: ' ',


            address_err: false,
            landmark_err: false,
            city_err: false,
            state_err: false,
            zip_err: false,
            country_err: false,
            ButtonDisable: false,

        }
    }
    AddAddress() {
        let collection1 = {}
        collection1.u_address = this.state.address
        collection1.pincode = this.state.pinCode
        collection1.city = this.state.City
        collection1.state = this.state.state
        collection1.country = this.state.country


        console.warn(collection1);
        let error = {}
        error.address_err = this.state.address_err
        var url = 'http://180.149.241.208:3022/address'

        fetch(url, {
            method: 'POST', // or 'PUT'
            headers: {
                "accept": "application/json",
                'Content-Type': 'application/x-www-form-urlencoded/json',
                Authorization: tokenHard ? 'Bearer ' + tokenHard : null

                // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQ4LCJpYXQiOjE1ODU5ODI1Njd9.Mpv9w9yfgh2pc784V9IJQYGvXT-mK3ge7JHVdzhEWJs"

            },
            body: JSON.stringify(collection1),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                Alert.alert(" address added successfully")
            })
            .catch((error) => {
                console.log('Error:', error);
            });
        console.warn(error)

        // if (collection && error== false) {
        // Alert.alert('filled')
        // console.log(authHeader)
        // var url = 'http://180.149.241.208:3022/address'
        // console.log(url)
        //     // api.fetchapi(url, 'post', collection)
        //     //     .then(res => Alert.alert(res))
        //     //     .catch(err => Alert.alert(err))
        //         fetch(url, {
        //             method: 'POST', // or 'PUT'
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 // ...authHeader,"
        //                 Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQ4LCJpYXQiOjE1ODU5ODI1Njd9.Mpv9w9yfgh2pc784V9IJQYGvXT-mK3ge7JHVdzhEWJs"
        //                // Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQ4LCJpYXQiOjE1ODU4NDg2ODN9._haZuVTP_lRWl4bNyouhe - oAuDulp7mzBYWwHsxmUQE
        //             //Authorization: token ? 'Bearer ' + AsyncStorage.getItem('token') : null
        //             },
        //             body: JSON.stringify(collection),
        //         })
        //             .then((response) => response.json())
        //             .then((data) => {
        //                 if (data.suceess) {
        //                     console.log('Success:', data);
        //                     Alert.alert(" data send successfully ")
        //                 }
        //                 else {
        //                     Alert.alert(" data send unsuccessfully ")


        //                 }
        //             })
        //             .catch((error) => {
        //                 console.log('Error:', error);
        //             });


        // } else {
        //     Alert.alert(' fill the all data ')
        // }
    }
    render() {
        return (
            <ScrollView>
                <Header name1='arrowleft' text='Add Address ' name2='search'
                    onPress={() => this.props.navigation.goBack()}
                    onClick={() => this.props.navigation.navigate('share')}
                />
                <View style={styles.Address_container}>
                    <View style={styles.Address_wrapper}>
                        <View style={styles.fields}>
                            <Text style={styles.Text_label}> ADDRESS</Text>
                            <View style={styles.Address_TextField}>
                                <TextInput multiline={true}
                                    numberOfLines={4}
                                    onChangeText={value => this.setState({ address: value.trim() })}
                                    onBlur={() => {
                                        this.setState((state) => ({
                                            address_err: validation('Address', this.state.address),
                                            ButtonDisable: state.ButtonDisable + this.state.address_err
                                        }))
                                    }


                                    } />
                                {this.state.address_err ? <Text>hi</Text> : null}
                                {console.log(true + false, " ............")}
                            </View>
                        </View>

                        <Text style={styles.Text_label}> LANDMARK</Text>
                        <View style={styles.Address_TextField}>
                            <TextInput onChangeText={value => this.setState({ LANDMARK: value.trim() })}
                                onBlur={() => {
                                    this.setState({
                                        landmark_err: validation('Landmark', this.state.LANDMARK),
                                        ButtonDisable: this.state.landmark_err
                                    })
                                }} />
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: 170 }}>
                                <Text style={styles.Text_label}> CITY</Text>
                                <View style={styles.Address_TextField}>
                                    <TextInput onChangeText={value => this.setState({ City: value.trim() })}
                                        onBlur={() => {
                                            this.setState({ city_err: validation('City', this.state.City) })
                                        }} />
                                </View>
                            </View>
                            <View style={{ width: 170 }}>
                                <Text style={styles.Text_label}> STATE</Text>
                                <View style={styles.Address_TextField}>
                                    <TextInput onChangeText={value => this.setState({ state: value.trim() })}
                                        onBlur={() => {
                                            this.setState({
                                                state_err: validation('state', this.state.state),
                                                ButtonDisable: this.state.address_err
                                            })
                                        }} />
                                </View>
                            </View>
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: 170 }}>
                                <Text style={styles.Text_label}> ZIP CODE</Text>
                                <View style={styles.Address_TextField}>
                                    <TextInput onChangeText={value => this.setState({ zipCode: value.trim() })}
                                        onBlur={() => {
                                            this.setState({
                                                zip_err: validation('pinCode', this.state.zipCode)
                                            })
                                        }} />
                                </View>
                            </View>
                            <View style={{ width: 170 }}>
                                <Text style={styles.Text_label}> COUNTRY</Text>
                                <View style={styles.Address_TextField}>
                                    <TextInput onChangeText={value => this.setState({ country: value.trim() })}
                                        onBlur={() => {
                                            this.setState({
                                                country_err: validation('country', this.state.country)
                                            })
                                        }} />
                                </View>
                            </View>
                        </View>




                        {console.log(this.state.address_err.addErr, " $$$")}

                        {/* {this.state.address_err == false ? this.setState({ ButtonDisable: false }) : null}           */}
                        {console.log(this.state.ButtonDisable, " 444$$$")}

                    </View>
                    <View style={styles.footer}>
                        <View>
                            <ButtonField text='SAVE ADDRESS' style={styles.addAddress_button}
                                disbled={this.state.ButtonDisable} onPress={() => this.AddAddress()} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
