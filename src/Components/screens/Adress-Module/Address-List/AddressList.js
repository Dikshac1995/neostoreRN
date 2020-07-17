import React, { Component } from 'react'
import { Text, View, ScrollView, Alert, FlatList, TouchableOpacity } from 'react-native'
import Header from '../../../Reusable/header /header'
import ButtonField from '../../../Reusable/ButtonField/buttonField'
import { styles } from './style'
import AsyncStorage from '@react-native-community/async-storage';
import { api } from '../../../../utils/api'
import { RadioButton } from 'react-native-paper';
import { connect } from 'react-redux';
import { FetchAddress } from '../../../../Redux/Action/address'
import Loader from '../../../Reusable/loader/loader'


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
            addressinfo: '',
            loading: true,
            loader: false,
        };
    }

    componentDidMount() {
        this.getData()

    }
    componentDidUpdate(prevProps, prevState) {
        console.log(prevProps, '@345', this.props)
        // if (prevState.addressData !== this.props.addressData) {
        //     this.getData()
        // }
    };
    async getData() {
        console.log('data23')
        let token = await AsyncStorage.getItem('token');
        const customerData = JSON.parse(await AsyncStorage.getItem('customerDetail'))
        await this.props.FetchAddress(token)
        const data = this.props.addressData
        if (data !== undefined) {
            const D_address = (element) => element.isDeliveryAddress == true;
            const res = data.findIndex(D_address)

            setTimeout(() => {
                this.setState({
                    token: token, data: customerData.customer_details,
                    addressData: data,
                    loading: false,
                    radioCheck: res
                })
            }, 1000)
        }
        else {
            setTimeout(() => {
                this.setState({
                    // token: token, data: customerData.customer_details,
                    // addressData: data,
                    loading: false,
                    // radioCheck: res
                })
            }, 4000)
        }



        // api.fetchapi(api.baseUrl + 'getCustAddress', 'get', " ", token)

        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('Success:', data);
        //         if (data.success == true) {
        //             const D_address = (element) => element.isDeliveryAddress == true;
        //             const res = data.customer_address.findIndex(D_address)
        //             this.setState({
        //                 token: token,
        //                 addressData: data.customer_address,
        //                 loading: false,
        //                 data: customerData.customer_details,
        //                 radioCheck: res
        //             })
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

    Delete_address(id) {
        const data = { address_id: id }
        Alert.alert(
            'Delete Address ',
            'Do you want to Delete Address ',
            [
                {
                    text: 'OK', onPress: async () => {

                        api.fetchapi(api.baseUrl + 'deladdress/' + id, 'Delete', JSON.stringify(data), this.state.token)
                            .then((res) => res.json())
                            .then((data) => {
                                console.log(data)
                                if (data.success === true) {
                                    // this.setState({})
                                    this.getData()
                                    // this.state.addressData.splice(id, 1);
                                    console.log(this.state.addressData, '12')

                                }
                            })
                    }
                },
                {
                    text: 'cancle', onPress: () => {
                        return null
                    }
                },
            ],
            { cancelable: false }
        )


    }

    saveAddress() {
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
        this.setState({ loader: true })
        api.fetchapi(api.baseUrl + 'updateAddress', 'put',
            JSON.stringify(address_data), this.state.token)
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                if (data.success == true) {
                    setTimeout(() => {
                        // Alert.alert(responseJSON.message)
                        this.setState({ loader: false })
                        Alert.alert(
                            data.message,
                            ' ',
                            [{
                                text: 'OK', onPress: () => {
                                    this.props.navigation.navigate('oder summary',
                                        { product_id: 0, Product: 0, addressData: this.state.addressinfo })
                                }
                            },],
                            { cancelable: false }
                        )
                    }, 2000)



                }
                else {
                    Alert.alert(data.message)
                }
            })



    }
    render() {
        const data = this.state.data
        return (
            <View style={{ flex: 1 }}>
                <Header name1='arrowleft' text='Address List ' name2='plus'
                    onPress={() => this.props.navigation.goBack()}
                    onClick={() => this.props.navigation.navigate('AddAddress')}
                />
                {this.state.loading ?
                    <Loader name='onLoad'
                        loading={true} /> :
                    <>
                        <Loader
                            loading={this.state.loader} />
                        <View style={{ flex: 8 }}>
                            <Text style={styles.shipping_text}>
                                Shipping Address</Text>
                            <View style={styles.userName_wrapper}>
                                <Text style={styles.userName_text}>
                                    {data.first_name}  {data.last_name}
                                </Text>
                                {this.state.addressData == 0 && <Text> Your Address list is Empty - First Add Address </Text>}
                                <FlatList
                                    data={this.state.addressData}
                                    ItemSeparatorComponent={this.FlatListItemSeparator}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity onPress={() => this.Delete_address(item.address_id)}
                                                style={{
                                                    flex: 1,
                                                    flexDirection: 'row',
                                                }}>
                                                <View style={{ flex: 0.1, justifyContent: 'center' }}>
                                                    <RadioButton
                                                        value={index}
                                                        status={this.state.radioCheck == index ? 'checked' : 'unchecked'}
                                                        onPress={() => {
                                                            this.setState({
                                                                radioCheck: index,
                                                                address_id: item.address_id,
                                                                addressinfo: item
                                                            })

                                                        }} />
                                                </View>

                                                <View style={styles.address_wrapper}>

                                                    <Text style={styles.address_text}> {item.address},
                                                        {item.city} , {item.state}</Text>

                                                    <Text style={styles.address_text}>
                                                        {item.pincode} , {item.country}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        );
                                    }}
                                    keyExtractor={(item, index) => index.toString()}
                                />

                            </View>
                        </View>

                        <View style={styles.footer}>
                            <ButtonField text='SAVE ADDRESS' style={styles.addAddress_button}
                                disbled={this.state.ButtonDisable} onPress={() =>
                                    this.saveAddress()} />
                        </View>
                    </>

                }
            </View>
        )
    }
}
// addressData: state.AddressReducer.data
const mapStateToProps = state => ({
    addressData: state.AddressReducer.data,
    loading: state.AddressReducer.isFetching


})

//Map your action creators to your props.
const mapDispatchToProps = (dispatch) => {
    return {
        FetchAddress: (type) => dispatch(FetchAddress(type))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressList)