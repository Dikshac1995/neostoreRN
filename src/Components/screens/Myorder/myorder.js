import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native'
import Header from '../../Reusable/header /header';
import { api } from '../../../utils/api';
import AsyncStorage from '@react-native-community/async-storage';
import moment from "moment";
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

import Loader from '../../Reusable/loader/loader'



export default class Myorder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myOder: [],
            token: ' ',
            serachShow: false,
            loading: true
        }
        this.arrayholder = [];
    }
    componentDidMount() {
        this.getdata()
        // const { page } = this.state;
    }

    async getdata() {

        let token = await AsyncStorage.getItem('token');

        api.fetchapi(api.baseUrl + 'getOrderDetails', 'get', " ", token)
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                if (data.status_code === 200) {
                    const pdata = data.product_details
                    this.setState({ myOder: data.product_details, loading: false })
                    this.arrayholder = pdata;
                }
                else {
                    Alert.alert(data.message)
                }
            })
    }
    searchFilterFunction = text => {
        const newData = this.arrayholder.filter(function (item) {
            //applying filter for the inserted text in search bar
            const itemData = item.product_details[0].order_id ? item.product_details[0].order_id.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({ myOder: newData });
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
    onsearchClick() {
        console.log('hiii', this.arrayholder)
        this.setState({
            serachShow: !this.state.serachShow,
            myOder: this.arrayholder
        })
        // this.getdata()


    }
    render() {
        const data = this.state.myOder
        console.log(this.state.myOder, 'myorder', data)

        return (
            // 
            <View style={{
                flex: 1
            }}>

                {!this.state.serachShow ?

                    <Header name1='arrowleft' text='My order' name2='search'
                        onPress={() => this.props.navigation.goBack()}
                        onClick={() => this.onsearchClick()}
                    // onClick={() => this.props.navigation.navigate('searchitem')}
                    />
                    :
                    <View style={{ height: 80, backgroundColor: 'red', paddingTop: 10, padding: 10 }}>
                        <Animatable.View animation="slideInRight" duration={500} style={{ height: 60, backgroundColor: '#fff', flexDirection: 'row', padding: 5, alignItems: 'center' }}>
                            <Animatable.View animation='fadeInLeft' duration={500} style={{ height: 50, backgroundColor: '#fff', flexDirection: 'row', padding: 5, alignItems: 'center' }}>
                                <Icon name='arrow-left' size={25}
                                    onPress={() => { 'arrow-left' ? this.onsearchClick() : null }} />
                            </Animatable.View>

                            <TextInput placeholder="search" style={{ fontSize: 25, marginLeft: 15 }}
                                onChangeText={value => this.searchFilterFunction(value)
                                    // this.setState({
                                    // text: value.trim(),
                                    // }),

                                }
                            // onBlur={() => this.search('text', this.state.text)}
                            />
                        </Animatable.View>
                    </View>}
                <>
                    {
                        this.state.loading ?
                            <Loader name='onLoad'
                                loading={true} /> :
                            <>
                                {data.length === 0 &&
                                    <View style={{ flex: 1, alignItems: 'center', paddingTop: 200 }} >
                                        <Text> oders list is empty</Text>
                                    </View>}
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
                            </>}
                </>
            </View>


        )
    }
}
