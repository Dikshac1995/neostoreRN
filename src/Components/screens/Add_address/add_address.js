import React, { Component } from 'react'
import { Text, View, Button, Alert, ScrollView, SafeAreaView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { styles } from './style'
import AsyncStorage from '@react-native-community/async-storage';
import validation from '../../../utils/valid'
import { api } from '../../../utils/api'
import Header from '../../Reusable/header /header'



export default class AddAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            LANDMARK: ' ',
            City: '',
            State: ' ',
            zipCode: ' ',
            country: ' ',
            address_err: ' ',
            landmark_err: ' ',
            city_err: ' ',
            state_err: ' ',
            zip_err: ' ',
            country_err: ' ',
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
        const addError = validation('Address', this.state.address)
        const cityError = validation('City', this.state.City)
        const LandError = validation('Landmark', this.state.LANDMARK)
        const zipError = validation('pinCode', this.state.zipCode)
        const stateErr = validation('State', this.state.State)
        const countryErr = validation('country', this.state.country)

        this.setState(() => ({
            address_err: addError,
            city_err: cityError,
            landmark_err: LandError,
            state_err: stateErr,
            zip_err: zipError,
            country_err: countryErr,
        }))

        let collection1 = {}
        collection1.address = this.state.address
        collection1.pincode = this.state.zipCode
        collection1.city = this.state.City
        collection1.state = this.state.State
        collection1.country = this.state.country

        if (addError !== " " && cityError !== " " && LandError !== " "
            & zipError !== " " && countryErr !== " " && stateErr !== " ") {
            Alert.alert('Fill data properly ')
        }
        else {
            var url = api.baseUrl + 'address'
            api.fetchapi(url, 'post',
                JSON.stringify(collection1), this.state.token)
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                    if (data.success == true) {
                        Alert.alert(data.message)
                    }
                    else {
                        Alert.alert(data.error_message)
                    }
                })
                .catch((error) => {
                    console.log('Error:', error);
                });
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <Header name1='arrowleft' text='Add Address ' name2='search'
                    onPress={() => this.props.navigation.goBack()}
                    onClick={() => this.props.navigation.navigate('share')}
                />
                <View style={styles.Address_wrapper}>
                    <ScrollView>

                        <View style={styles.fields}>
                            <Text style={styles.Text_label}>Address</Text>
                            <TextInput style={styles.Address_TextField} multiline={true} numberOfLines={3}
                                onChangeText={value => this.setState({
                                    address: value.trim(),
                                    address_err: validation('Address', value.trim()),
                                })}
                                onBlur={() => {
                                    this.setState((state) => ({
                                        address_err: validation('Address', this.state.address),
                                        // ButtonDisable: state.ButtonDisable + this.state.address_err
                                    }))
                                }
                                } />
                            <Text style={styles.err_text}> {this.state.address_err}</Text>
                        </View>

                        <View style={styles.fields}>
                            <Text style={styles.Text_label}>Landmark</Text>
                            <TextInput style={styles.Address_TextField}
                                onChangeText={value => this.setState({
                                    LANDMARK: value.trim(),
                                    landmark_err: validation('Landmark', value.trim())
                                })}
                                onBlur={() => {
                                    this.setState({
                                        landmark_err: validation('Landmark', this.state.LANDMARK)
                                    })
                                }} />
                            <Text style={styles.err_text}>{this.state.landmark_err}</Text>
                        </View>
                        <View style={styles.address_fields}>
                            <View style={styles.fields_two}>
                                <Text style={styles.Text_label}> City</Text>
                                <TextInput style={styles.Address_TextField}
                                    onChangeText={value => this.setState({
                                        City: value.trim(),
                                        city_err: validation('City', value.trim()),

                                    })}
                                    onBlur={() => {
                                        this.setState({
                                            city_err: validation('City', this.state.City),
                                            // ButtonDisable: this.state.landmark_err
                                        })
                                    }} />
                                <Text style={styles.err_text} >{this.state.city_err}</Text>
                            </View>
                            <View style={styles.fields_two}>
                                <Text style={styles.Text_label}> State</Text>
                                <TextInput style={styles.Address_TextField}
                                    onChangeText={value => this.setState({
                                        State: value.trim(),
                                        state_err: validation('State', value.trim())
                                    })}
                                    onBlur={() => {
                                        this.setState({
                                            state_err: validation('State', this.state.State),
                                        })
                                    }} />
                                <Text style={styles.err_text}>{this.state.state_err}</Text>
                            </View>
                        </View>

                        <View style={styles.address_fields}>
                            <View style={styles.fields_two}>
                                <Text style={styles.Text_label}> Zip Code</Text>
                                <TextInput style={styles.Address_TextField}
                                    keyboardType={"number-pad"} maxLength={6}
                                    onChangeText={value => this.setState({
                                        zipCode: value.trim(),
                                        zip_err: validation('pinCode', value.trim()),
                                    })}
                                    onBlur={() => {
                                        this.setState({
                                            zip_err: validation('pinCode', this.state.zipCode),
                                        })
                                    }} />
                                <Text style={styles.err_text}>{this.state.zip_err}</Text>
                            </View>
                            <View style={styles.fields_two}>
                                <Text style={styles.Text_label}> Country</Text>
                                <TextInput style={styles.Address_TextField}
                                    onChangeText={value => this.setState({
                                        country: value.trim(),
                                        country_err: validation('country', value.trim()),
                                    })}
                                    onBlur={() => {
                                        this.setState({
                                            country_err: validation('country', this.state.country),
                                            ButtonDisable: this.state.landmark_err
                                        })
                                    }} />
                                <Text style={styles.err_text}>{this.state.country_err}</Text>
                            </View>
                        </View>
                    </ScrollView>

                    <View style={styles.footer}>
                        <ButtonField text='SAVE ADDRESS' style={styles.addAddress_button}
                            disbled={this.state.ButtonDisable} onPress={() => this.AddAddress()} />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}
