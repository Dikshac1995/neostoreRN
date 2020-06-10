import React, { Component } from 'react'
import { Text, View, ScrollView, Alert, FlatList, TouchableOpacity } from 'react-native'
import Header from '../../Reusable/header /header'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { styles } from './style'
import AsyncStorage from '@react-native-community/async-storage';
import { api } from '../../../utils/api'
import { RadioButton } from 'react-native-paper';





export default class add_list extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addressData: [],
            token: '',
            addressData: {},
            checked: true,
            data: [],
            radioCheck: 'first',
        };
    }

    componentDidMount() {
        this.getData()

    }
    async getData() {
        let token = await AsyncStorage.getItem('token');
        const customerData = JSON.parse(await AsyncStorage.getItem('customerDetail'))


        this.setState({ token: token, data: customerData.customer_details })
        api.fetchapi('http://180.149.241.208:3022/getCustAddress', 'get', " ", this.state.token)

            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                if (data.success == true) {
                    this.setState({ addressData: data.customer_address })
                }
                else {
                    Alert.alert("not found ")
                }
            })


    }
    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    }
    render() {
        console.log("customerdata", this.state.addressData)
        const data = this.state.data
        console.log("data", data)
        return (
            <View style={{ flex: 1 }}>
                <Header name1='arrowleft' text='Address List ' name2='plus'
                    onPress={() => this.props.navigation.goBack()}
                    onClick={() => this.props.navigation.navigate('AddAddress')}
                />


                <Text style={{ fontSize: 25, margin: 20, color: '#8B8888' }}>
                    Shipping Address</Text>


                <View style={{ padding: 10, height: 400 }}>
                    <FlatList
                        data={this.state.addressData}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={({ item }) => {
                            return (
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                    }}>
                                    <View style={{ marginTop: 40 }}>
                                        <RadioButton value="first"
                                            status={this.state.radioCheck === 'first' ? 'checked' : 'unchecked'}
                                            onPress={() => {
                                                this.setState({
                                                    radioCheck: 'first',
                                                    gender: 'male'
                                                });
                                            }} />
                                    </View>
                                    <TouchableOpacity>
                                        <View style={{ flex: 1, flexDirection: 'column', paddingVertical: 15 }}>
                                            <Text style={{ marginHorizontal: 10, fontSize: 30 }}>
                                                {data.first_name}  {data.last_name}
                                            </Text>
                                            <Text style={styles.address_text}> {item.address}, {item.state}</Text>

                                            <Text style={styles.address_text}>
                                                {item.pincode} , {item.country}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                        keyExtractor={(index, item) => index}
                    />


                </View>


                <View style={{
                    backgroundColor: '#fff',
                    marginBottom: 10, height: 20, flex: 1, justifyContent: 'flex-end'
                }}>
                    <ButtonField text='SAVE ADDRESS' style={styles.addAddress_button}
                        disbled={this.state.ButtonDisable} onPress={() => this.AddAddress()} />
                </View>

            </View>
        )
    }
}
