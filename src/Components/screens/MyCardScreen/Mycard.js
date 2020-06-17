import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList, Image, Picker, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../../Reusable/header /header'
import { api } from '../../../utils/api';



const myCardProduct = []
export default class Mycard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myCardItem: [],
            data: [],
            cost: '',
            finalCost: ' ',
            token: ' ',
            selectedValue: [1, 1, 1],
            pickerItem: [{ 'label': '1', 'value': '1', 'selectedValue': '1' },
            { 'label': '2', 'value': '2', 'selectedValue': '2' },
            { 'label': '3', 'value': '3', 'selectedValue': '3' },
            { 'label': '4', 'value': '4', 'selectedValue': '4' }]
        }

    }

    componentDidMount() {


        const { data } = this.props.route.params;
        console.log("mydata", data)
        this.state.data.push(data)
        console.log(this.state.data, 'ddddjjjj')
        this.retrieveData()
        // this.getptoductapi()


    }
    async getptoductapi() {
        const token = await AsyncStorage.getItem('token');

        api.fetchapi('http://180.149.241.208:3022/getCartData', 'get', " ", token)
            // const res = await api.fetchapi('http://180.149.241.208:3022/getCustProfile', 'get', " ", token)

            .then((response) => response.json()).then((data) => {
                console.log('Success:', data);


            });
    }
    pickerChange(index) {
        console.log('val', index)
        const indexvalue = this.state.myCardItem.indexOf(this.state.myCardItem[index])
        console.log(indexvalue)

        if (index === indexvalue) {
            this.setState({
                selectedValue: value
            })
        }
        else {
            this.setState({
                selectedValue: '1'
            })

        }

    }

    async  orderNow() {
        console.log(this.state.myCardItem, "@@@@")
        console.log('Hi', this.state.myCardItem)
        const values = this.state.myCardItem

        console.log('7777', values)
        try {
            await AsyncStorage.setItem('myOrder', JSON.stringify(values));
            const value = JSON.parse(await AsyncStorage.getItem('myOrder'));
            console.log("place order", value)

        } catch (error) {
            console.log(error)
        }



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
    removeProduct(id) {
        console.log('+++', id)
        Alert.alert(
            'Remove from card ',
            'Do you want to Remove this Product from Mycard',
            [
                {
                    text: 'OK', onPress: async () => {
                        // Alert.alert(id)
                        this.state.myCardItem.splice(id, 1);
                        console.log('del', this.state.myCardItem)
                        await AsyncStorage.setItem('MycardData', JSON.stringify(this.state.myCardItem))
                        this.setState({ myCardItem: JSON.parse(await AsyncStorage.getItem('MycardData')) })
                        console.log(this.state.myCardItem, "@@@@")
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



    retrieveData = async () => {
        try {

            // const token = JSON.parse(await AsyncStorage.getItem('token'));
            const existingProduct = await AsyncStorage.getItem('MycardData')
            console.log('...', existingProduct)
            console.log('   ', this.state.myCardItem)
            let newProduct = JSON.parse(existingProduct);
            console.log("&&", newProduct)
            var cost = newProduct.map(res => res.product_cost)
            console.log("cost ", cost)
            console.log(
                cost.reduce((a, b) => a + b, 0)
            )

            var sum = cost.reduce(function (a, b) { return a + b; }, 0);
            console.log("sum", sum)

            this.setState({
                myCardItem: newProduct,
                cost: cost,
                finalCost: sum,
                // token: token
            })
            this.getptoductapi()
            console.log('AAAAAAAAAAAAAAAAAAAa', this.state.myCardItem)
            console.log('AAAAAAAAAAAAAAAAAAAa', this.state.token)

        } catch (error) {
            // Error retrieving data
        }
    };

    render() {

        const data = this.state.myCardItem
        console.log("   fish", data)
        return (
            <View>
                <Header name1='arrowleft' text='My Carts' name2='search'
                    onPress={() => this.props.navigation.goBack()}
                    onClick={() => this.props.navigation.navigate('share')}
                />
                <View style={{ marginHorizontal: 20, height: 500 }}>

                    <FlatList data={data}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) =>
                            <View >
                                <TouchableOpacity style={{
                                    display: 'flex', marginTop: 5,
                                    flexDirection: 'row', padding: 0, alignItems: 'center'
                                }}
                                    // onPress={() => { this.props.navigation.navigate('productDetail', { product_id: item.product_id }) }}
                                    onPress={() => this.removeProduct(data.indexOf(item))}>
                                    <View>
                                        <Image style={{ width: 120, height: 100 }} source={{
                                            uri: 'http://180.149.241.208:3022/' + item.product_image
                                        }} />
                                    </View>
                                    <View style={{ padding: 15, width: 250 }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.product_name}</Text>
                                        <Text style={{ fontSize: 15 }}>({item.product_material})</Text>

                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Picker
                                                selectedValue={this.state.selectedValue[1]}
                                                style={{ width: 80, }}
                                                onValueChange={(itemValue, itemIndex) =>
                                                    // this.pickerChange(data.indexOf(item), itemValue)
                                                    this.pickerChange(this)
                                                }  >
                                                {
                                                    this.state.pickerItem.map((v) => {
                                                        return <Picker.Item label={v.label} value={v.value} />
                                                    })}

                                                {/* <Picker.Item label="1 " value="1" />
                                                <Picker.Item label="2" value="2" />
                                                <Picker.Item label="3" value="3" />
                                                <Picker.Item label="4 " value="4" />
                                                <Picker.Item label="5 " value="5" /> */}

                                            </Picker>
                                            <Text style={{ fontSize: 17, paddingTop: 10, fontWeight: 'bold' }}>Rs.{item.product_cost}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>}

                        ItemSeparatorComponent={this.FlatListItemSeparator} />
                </View>

                <View style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                    paddingHorizontal: 20, marginBottom: 5, paddingTop: 10, backgroundColor: '#fff', height: 80
                }}>
                    <View ><Text style={{ fontSize: 20, fontWeight: 'bold' }}>Rs, {this.state.finalCost}</Text></View>

                    <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 5, width: 200, height: 50 }}

                        onPress={() => { this.orderNow() }}
                    >
                        <Text style={{ justifyContent: "center", color: 'white', fontSize: 20, marginLeft: 50, marginTop: 10 }}>
                            Order Now</Text>
                    </TouchableOpacity>
                </View>

            </View >
            // </View >

        )
    }
}
