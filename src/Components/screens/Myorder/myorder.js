import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import Header from '../../Reusable/header /header';
import { api } from '../../../utils/api';
import AsyncStorage from '@react-native-community/async-storage';
import moment from "moment";


export default class Myorder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myOder: [],
            token: ' '
        }
    }
    componentDidMount() {
        this.getdata()
    }

    async getdata() {
        let token = await AsyncStorage.getItem('token');

        api.fetchapi('http://180.149.241.208:3022/getOrderDetails', 'get', " ", token)
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                if (data.status_code === 200) {
                    this.setState({ myOder: data.product_details })
                }


            })
    }
    onPressItem(product_details, order_id) {
        console.log(order_id, product_details)
        { this.props.navigation.navigate('Orderid', { product_details: product_details.product_details, order_id: order_id }) }


    }
    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 2,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    }
    render() {
        console.log(this.state.myOder, 'myorder')

        return (

            <View>
                <Header name1='arrowleft' text='My order' name2='search'
                    onPress={() => this.props.navigation.goBack()}
                    onClick={() => this.props.navigation.navigate('searchitem')}
                />
                <FlatList
                    data={this.state.myOder}

                    renderItem={({ item, index }) => {
                        moment.locale('en');
                        var dt = item.product_details[0].createdAt;

                        return (

                            <TouchableOpacity style={{ padding: 10, paddingHorizontal: 20 }}
                                onPress={() => this.onPressItem(item, item.product_details[0].order_id)} >
                                <View style={{ flex: 1, padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.product_details[0].order_id}</Text>
                                    <Text style={{ fontSize: 20 }}>Rs, {item.product_details[0].total_cartCost}</Text>

                                </View>


                                <Text style={{ fontSize: 20 }}> Order-Date :
                                    {moment(dt).format(' MMM  D  y')}
                                </Text>
                            </TouchableOpacity>

                        );
                    }}
                    ItemSeparatorComponent={this.FlatListItemSeparator}

                    keyExtractor={(index, item) => index}
                />



            </View>
        )
    }
}
