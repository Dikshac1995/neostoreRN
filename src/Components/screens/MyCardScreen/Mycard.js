import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList, Image, Picker, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../../Reusable/header /header'
import { api } from '../../../utils/api';
import Button from '../../Reusable/ButtonField/buttonField'
import { styles } from './style'
import { connect } from 'react-redux';
import { getCartData } from '../../../Redux/Action/mycat'





const myCartProduct = []
class Mycart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myCardItem: [],
            data: [],
            cost: '',
            finalCost: ' ',
            token: ' ',
            selectedValue: [1, 1, 1],
            quantity: [],
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
        this.getptoductapi()



    }
    async getptoductapi() {

        const token = await AsyncStorage.getItem('token');
        if (token) {
            api.fetchapi('http://180.149.241.208:3022/getCartData', 'get', " ", token)
                .then((response) => response.json()).then((data) => {
                    console.log('Success:', data);
                    if (data.status_code === 200) {
                        const cartProduct = data.product_details.map((res) => res.product_id)
                        const quantity = data.product_details.map((res) => res.quantity)
                        const cartdata = myCartProduct.concat(cartProduct)
                        console.log('cartProduct', cartdata)
                        var cost = cartdata.map(res => res.product_cost)
                        var sum = cost.reduce(function (a, b) { return a + b; }, 0);

                        console.log(cost, sum)
                        this.setState({
                            myCardItem: cartdata,
                            quantity: quantity,
                            finalCost: sum
                        })
                    }
                    else {
                        Alert.alert(data.message)
                    }
                });
        }
        // this.props.getCartData(token);
    }
    pickerChange(index, value) {
        console.log('val', index, value)
        const { quantity } = this.state
        quantity.splice(index, 1, value)
        this.setState({ quantity: [...quantity] })
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
            this.props.navigation.navigate('oder summary', { product_id: 0, Product: 0 })


        } catch (error) {
            console.log(error)
        }
    }
    async  storedata() {
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

            const token = await AsyncStorage.getItem('token');
            const existingProduct = await AsyncStorage.getItem('MycardData')
            console.log('...', existingProduct)
            console.log('   ', this.state.myCardItem)
            let newProduct = JSON.parse(existingProduct);
            myCartProduct.push(newProduct)

            console.log("&&", myCartProduct)
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
                token: token
            })

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
                        renderItem={({ item, index }) =>
                            <View >
                                <TouchableOpacity style={styles.myOrder_container}
                                    // onPress={() => { this.props.navigation.navigate('productDetail', { product_id: item.product_id }) }}
                                    onLongPress={() => this.removeProduct(data.indexOf(item))}>
                                    <View>
                                        <Image style={{ width: 120, height: 100 }} source={{
                                            uri: 'http://180.149.241.208:3022/' + item.product_image
                                        }} />
                                    </View>
                                    <View style={{ padding: 15, width: 250 }}>
                                        <Text style={styles.product_name}>{item.product_name}</Text>
                                        <Text style={styles.product_material}>({item.product_material})</Text>

                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Picker
                                                key={index}
                                                selectedValue={this.state.quantity[index]}
                                                style={{ width: 80, }}
                                                onValueChange={(itemValue, ) =>
                                                    // this.pickerChange(data.indexOf(item), itemValue)
                                                    this.pickerChange(index, itemValue)
                                                }  >
                                                {
                                                    this.state.pickerItem.map((v) => {
                                                        return <Picker.Item label={v.label} value={v.value} />
                                                    })}


                                            </Picker>
                                            <Text style={{ fontSize: 17, paddingTop: 10, fontWeight: 'bold' }}>Rs.{item.product_cost}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>}

                        ItemSeparatorComponent={this.FlatListItemSeparator} />
                </View>

                <View style={styles.footer}>
                    <View ><Text style={styles.totalPrice}>Rs, {this.state.finalCost}</Text></View>
                    <Button text="order Now" onPress={() => this.orderNow()} style={styles.buttonStyle} />


                </View>

            </View >
            // </View >

        )
    }
}


const mapStateToProps = state => ({
    data: state.mycartReducer
})

//Map your action creators to your props.
const mapDispatchToProps = (dispatch) => {
    return {
        getCartData: (type) => dispatch(getCartData(type))
    };
}

// export default connect(mapStateToProps, mapDispatchToProps)(Mycart)

export default Mycart