import React, { Component } from 'react'
import { Text, View, Button, Alert, ScrollView, SafeAreaView } from 'react-native'
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
// import TextField from '../../Reusable/textField/textField'



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
            token: ' '

        }
    }
    componentDidMount() {
        this.getToken()

    }

    async getToken() {

        let token = await AsyncStorage.getItem('token');
        this.setState({ token: token })
    }

    AddAddress() {
        let collection1 = {}
        collection1.address = this.state.address
        collection1.pincode = this.state.zipCode
        collection1.city = this.state.City
        collection1.state = this.state.state
        collection1.country = this.state.country
        let error = {}
        // error.address_err = this.state.address_err
        var url = 'http://180.149.241.208:3022/address'

        api.fetchapi(url, 'post',
            JSON.stringify(collection1), this.state.token)

            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                if (data.success === 'true') {
                    Alert.alert(" address added successfully")
                }
                else {
                    Alert.alert('Fill the mentioned data ')
                }
            })
            .catch((error) => {
                console.log('Error:', error);
            });


    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <Header name1='arrowleft' text='Add Address ' name2='search'
                    onPress={() => this.props.navigation.goBack()}
                    onClick={() => this.props.navigation.navigate('share')}
                />
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.Address_wrapper}>

                        <View style={styles.fields}>
                            <Text style={styles.Text_label}>Address</Text>
                            <TextInput style={styles.Address_TextField} multiline={true} numberOfLines={3}

                                onChangeText={value => this.setState({
                                    address: value.trim(),
                                    address_err: validation('Address', value),
                                })}
                                onBlur={() => {
                                    this.setState((state) => ({
                                        address_err: validation('Address', this.state.address),
                                        ButtonDisable: state.ButtonDisable + this.state.address_err
                                    }))
                                }
                                } />
                            <Text style={{ fontSize: 15, color: 'red' }}> {this.state.address_err}</Text>
                        </View>

                        <View style={styles.fields}>
                            <Text style={styles.Text_label}>Landmark</Text>
                            <TextInput style={styles.Address_TextField}
                                onChangeText={value => this.setState({
                                    LANDMARK: value.trim(),
                                    landmark_err: validation('Landmark', this.state.LANDMARK),

                                })}
                                onBlur={() => {
                                    this.setState({
                                        landmark_err: validation('Landmark', this.state.LANDMARK),
                                        ButtonDisable: this.state.landmark_err
                                    })
                                }} />
                            <Text>{this.state.landmark_err}</Text>
                        </View>
                        <View style={styles.address_fields}>
                            <View style={styles.fields_two}>
                                <Text style={styles.Text_label}> City</Text>
                                <TextInput style={styles.Address_TextField}
                                    onChangeText={value => this.setState({
                                        City: value.trim(),
                                        city_err: validation('City', value),

                                    })}
                                    onBlur={() => {
                                        this.setState({
                                            city_err: validation('City', this.state.City),
                                            ButtonDisable: this.state.landmark_err
                                        })
                                    }} />
                                <Text>{this.state.city_err}</Text>
                            </View>
                            <View style={styles.fields_two}>
                                <Text style={styles.Text_label}> State</Text>
                                <TextInput style={styles.Address_TextField}
                                    onChangeText={value => this.setState({
                                        state: value.trim(),
                                        state_err: validation('state', value),

                                    })}
                                    onBlur={() => {
                                        this.setState({
                                            state_err: validation('state', this.state.state),
                                            ButtonDisable: this.state.landmark_err
                                        })
                                    }} />
                                <Text>{this.state.state_err}</Text>
                            </View>
                        </View>

                        <View style={styles.address_fields}>
                            <View style={styles.fields_two}>
                                <Text style={styles.Text_label}> Zip Code</Text>
                                <TextInput style={styles.Address_TextField}
                                    keyboardType={"number-pad"} maxLength={6}
                                    onChangeText={value => this.setState({
                                        zipCode: value.trim(),
                                        zip_err: validation('pinCode', value),

                                    })}
                                    onBlur={() => {
                                        this.setState({
                                            zip_err: validation('pinCode', this.state.zipCode),
                                            ButtonDisable: this.state.landmark_err
                                        })
                                    }} />
                                <Text>{this.state.zip_err}</Text>
                            </View>
                            <View style={styles.fields_two}>
                                <Text style={styles.Text_label}> Country</Text>
                                <TextInput style={styles.Address_TextField}
                                    onChangeText={value => this.setState({
                                        country: value.trim(),
                                        country_err: validation('country', value),

                                    })}
                                    onBlur={() => {
                                        this.setState({
                                            country_err: validation('country', this.state.country),
                                            ButtonDisable: this.state.landmark_err
                                        })
                                    }} />
                                <Text>{this.state.country_err}</Text>
                            </View>
                        </View>




                    </View>
                    <View style={styles.footer}>
                        <ButtonField text='SAVE ADDRESS' style={styles.addAddress_button}
                            disbled={this.state.ButtonDisable} onPress={() => this.AddAddress()} />
                    </View>
                </ScrollView>


            </SafeAreaView>
        )
    }
}
