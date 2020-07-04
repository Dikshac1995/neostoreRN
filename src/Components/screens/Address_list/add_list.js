import React, { Component } from 'react'
import { Text, View, ScrollView, Alert, FlatList, TouchableOpacity } from 'react-native'
import Header from '../../Reusable/header /header'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { styles } from './style'
import AsyncStorage from '@react-native-community/async-storage';
import { api } from '../../../utils/api'
import { RadioButton } from 'react-native-paper';
import { connect } from 'react-redux';
import { FetchAddress } from '../../../Redux/Action/address'

class AddressList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addressData: [],
            token: '',
            // addressData: {},
            checked: true,
            data: [],
            radioCheck: ' ',
            address_id: ' ',
            addressinfo: ''
        };
    }

    componentDidMount() {
        // let token AsyncStorage.getItem('token');
        // console.log('tok', token)
        this.getData()

    }
    async getData() {
        let token = await AsyncStorage.getItem('token');
        const customerData = JSON.parse(await AsyncStorage.getItem('customerDetail'))
        this.props.FetchAddress(token)


        this.setState({ token: token, data: customerData.customer_details })
        const data = this.props.data
        console.log('as', data)
        var address = data.filter(function (res) {
            return res.isDeliveryAddress == true;
        });
        console.log('addr', address)
        // this.setState({ addressData: address[0] })

        this.setState({ addressData: data })




        // api.fetchapi(api.baseUrl + 'getCustAddress', 'get', " ", this.state.token)

        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('Success:', data);
        //         if (data.success == true) {
        //             this.setState({ addressData: data.customer_address })

        //         }
        //         else {
        //             Alert.alert("not found ")
        //         }
        //     })


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


    saveAddress() {
        console.log(this.state.data)
        console.log(this.state.address_id)
        console.log(this.state.addressinfo, "daaaa")
        const address_data = {
            address_id: this.state.addressinfo.address_id,
            address: this.state.addressinfo.address,
            pincode: this.state.addressinfo.pincode,
            city: this.state.addressinfo.city,
            state: this.state.addressinfo.state,
            country: this.state.addressinfo.country,
            isDeliveryAddress: true,
        }
        const data = { address_id: this.state.address_id }

        api.fetchapi(api.baseUrl + 'updateAddress', 'put',
            JSON.stringify(address_data), this.state.token)

            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                if (data.success == true) {
                    Alert.alert(data.message)
                    this.props.navigation.navigate('oder summary', { product_id: 0, Product: 0, addressData: this.state.data })

                }
                else {
                    Alert.alert(data.message)
                }
            })



    }
    render() {
        console.log('hh', this.props)
        console.log("customerdata", this.state.addressData)
        const data = this.state.data
        console.log("data", data)
        return (
            <View style={{ flex: 1 }}>
                <Header name1='arrowleft' text='Address List ' name2='plus'
                    onPress={() => this.props.navigation.goBack()}
                    onClick={() => this.props.navigation.navigate('AddAddress')}
                />
                <View style={{ height: '75%' }}>
                    <Text style={{ fontSize: 25, margin: 20, color: '#8B8888' }}>
                        Shipping Address</Text>
                    <View style={{ padding: 10, height: 400, marginHorizontal: 10 }}>
                        <Text style={{ marginHorizontal: 10, fontSize: 25, }}>
                            {data.first_name}  {data.last_name}
                        </Text>
                        <FlatList
                            data={this.state.addressData}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            renderItem={({ item, index }) => {
                                return (
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                        }}>
                                        <View style={{ marginTop: 40 }}>
                                            <RadioButton
                                                value={index}
                                                status={this.state.radioCheck == index ? 'checked' : 'unchecked'}
                                                onPress={() => {
                                                    this.setState({
                                                        radioCheck: index, address_id: item.address_id,
                                                        addressinfo: item
                                                    })

                                                }} />
                                        </View>
                                        <TouchableOpacity>
                                            <View style={{ flex: 1, flexDirection: 'column', paddingVertical: 15 }}>

                                                <Text style={styles.address_text}> {item.address}, {item.city} , {item.state}</Text>

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
                </View>

                <View style={{
                    backgroundColor: '#fff',
                    marginBottom: 10,
                }}>
                    <ButtonField text='SAVE ADDRESS' style={styles.addAddress_button}
                        disbled={this.state.ButtonDisable} onPress={() => this.saveAddress()} />
                </View>

            </View>
        )
    }
}
const mapStateToProps = state => ({
    data: state.AddressReducer.data
})

//Map your action creators to your props.
const mapDispatchToProps = (dispatch) => {
    return {
        FetchAddress: (type) => dispatch(FetchAddress(type))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressList)