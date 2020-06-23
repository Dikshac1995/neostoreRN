import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import Header from '../../Reusable/header /header';
import { api } from '../../../utils/api';
import AsyncStorage from '@react-native-community/async-storage';


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
                    this.setState({ myOder: data.product_details[0].product_details })
                }


            })
    }
    onPressItem(product_details, order_id) {
        console.log(order_id)
        { this.props.navigation.navigate('Orderid', { product_details: product_details, order_id: order_id }) }


    }
    ListItemSeparator = () => {
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
        console.log(this.state.myOder, 'myorder')

        return (

            <View>
                <Header name1='arrowleft' text='My order' name2='search'
                    onPress={() => this.props.navigation.goBack()}
                    onClick={() => this.props.navigation.navigate('searchitem')}
                />
                <FlatList
                    data={this.state.myOder}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={({ item, index }) => {
                        return (


                            <TouchableOpacity style={{ padding: 10, paddingHorizontal: 20 }}
                                onPress={() => this.onPressItem(item.product_details, item.order_id)}

                            >
                                <View style={{ flex: 1, padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{item.order_id}</Text>
                                    <Text style={{ fontSize: 20 }}>Rs, {item.total_cartCost}</Text>



                                </View>
                                <Text style={{ fontSize: 20 }}> Order-Date : {item.createdAt}</Text>
                            </TouchableOpacity>

                        );
                    }}
                    keyExtractor={(index, item) => index}
                />



            </View>
        )
    }
}
