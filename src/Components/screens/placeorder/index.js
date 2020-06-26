import React, { Component } from 'react'
import { Text, View, Image, ScrollView, FlatList, Picker, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { styles } from './style'
import ButtonField from '../../Reusable/ButtonField/buttonField';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../../Reusable/header /header';
import { api } from '../../../utils/api'
import { connect } from 'react-redux';
import { getCartData } from '../../../Redux/Action/mycat'



const arr = [];
const quantity = []

class Placeorder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: ' ',
            productData: ' ',
            ProductDetailData: [],
            productCategory: [],
            subImages_id: [],
            modalVisible: false,
            addressData: '',
            product_cost: '',
            finalCost: ' ',
            Address: [],
            customer_details: [],
            picker: [
                { label: '1', value: 1, },
                { label: '2', value: 2, },
            ]
        };
    }

    async  componentDidMount() {
        await this.getData()


        const { product_id, Product, addressData } = this.props.route.params;
        console.log("product", Product)
        if (Product == 0) {
            console.log(0)
            // this.getStoredData()
        }
        else {
            if (Product.quantity === undefined) { Product.quantity = 1 }

            arr.push(Product)
            quantity.push(Product.quantity)
            var cost = arr.map(res => res.product_cost)
            console.log(cost, "co")
            var sum = cost.reduce(function (a, b) { return a + b; }, 0);
            this.setState({
                productData: arr,
                quantity: quantity,
                product_cost: cost,
                finalCost: sum
            })
            this.datafrom_Api()

        }
        this.getStoredData()

    }

    async datafrom_Api() {
        let token = await AsyncStorage.getItem('token');
        await this.props.getCartData(token)
        const mycartdata = this.props.data.data
        console.log('mycart', mycartdata)

    }

    async getStoredData() {
        const { product_id, Product, addressData } = this.props.route.params;
        console.log('add data', this.state.productData, this.state.quantity)

        const customer_details = JSON.parse(await AsyncStorage.getItem('customerDetail'))
        const value = JSON.parse(await AsyncStorage.getItem('myOrder'));
        console.log('valu', value, customer_details)
        if (value !== null) {
            const prod_quantity = value.map((res) => res.quantity)
            const product_quantity = quantity.concat(prod_quantity)
            const data = arr.concat(value)
            var cost = data.map(res => res.product_cost)
            var sum = cost.reduce(function (a, b) { return a + b; }, 0);

            console.log(sum)

            this.setState({
                productData: data,
                quantity: product_quantity,
                product_cost: cost,
                finalCost: sum
            })

        }
        this.setState({
            Address: customer_details.customer_address[0],
            customer_details: customer_details.customer_details,

        })
    }


    add_address() {
        this.props.navigation.navigate('AddAddress')
    }

    async  oderNow() {
        const { productData } = this.state
        console.log('product data1', productData)
        let token = await AsyncStorage.getItem('token');
        Alert.alert(
            'place order ',
            'do u want to buy a product ',
            [
                { text: 'Cancel', onPress: () => { return null } },
                {
                    text: 'Confirm', onPress: () => {
                        if (productData !== null) {
                            let flag = [{ flag: 'checkout' }];
                            let data1 = [...productData, ...flag];
                            // productData.map((e, index) => {
                            //     let object = [{
                            //         _id: e.product_id,
                            //         product_id: e.product_id,
                            //         quantity: this.state.quantity[index]

                            //     },
                            //     { flag: 'checkout' }]
                            api.fetchapi("http://180.149.241.208:3022/addProductToCartCheckout", 'post',
                                JSON.stringify(data1),
                                token)
                                .then((response) => response.json()).then((data) => {
                                    console.log('Success:', data);
                                    if (data.success) {
                                        Alert.alert(data.message)
                                        AsyncStorage.removeItem('myOrder');
                                        // this.setState({ productData: ' ' })
                                        // this.props.navigation.navigate('homescreen')
                                    }
                                    else {
                                        Alert.alert(data.message)

                                    }

                                });
                            // })
                        }

                    }
                },
            ],
            { cancelable: false }
        )




    }
    pickerChange(index, value) {
        const elementsIndex = this.state.productData.findIndex(element => element.id == id)
        let newArray = [...this.state.productData]
        newArray[index] = { ...newArray[index], quantity: value }
        console.log(elementsIndex, newArray, "data")
        console.log('val', index, value)
        const { quantity } = this.state
        quantity.splice(index, 1, value)
        this.setState({ quantity: [...quantity] })
        // this.state.cost.splice(index, 1, value * this.state.cost)
        console.log("this", this.state.productData[0].quantity)
        console.log('picker value ', this.state.quantity, this.state.product_cost)
        var sum = 0;
        for (var i = 0; i < this.state.quantity.length; i++) {
            sum += this.state.quantity[i] * this.state.product_cost[i];
        }
        console.log('fsum', sum)
        this.setState({
            finalCost: sum,
            productData: newArray
        })


    }


    async getData() {
        let token = await AsyncStorage.getItem('token');
        const customerData = JSON.parse(await AsyncStorage.getItem('customerDetail'))


        this.setState({ token: token, data: customerData.customer_details })
        api.fetchapi('http://180.149.241.208:3022/getCustAddress', 'get', " ", this.state.token)

            .then((response) => response.json())
            .then((data) => {
                console.log('Success address data :', data);
                if (data.success == true) {

                    var address = data.customer_address.filter(function (res) {
                        return res.isDeliveryAddress == true;
                    });
                    this.setState({ addressData: address[0] })
                    console.log('datt', address)

                }
                else {
                    Alert.alert("not found ")
                }
                console.log('addressData', this.state.addressData)

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

        const { product_id, Product, addressData } = this.props.route.params;
        console.log(this.state.addressData, 'addData')
        console.log("productData", this.state.productData, this.state.quantity)
        const customerData = this.state.customer_details
        // const Address = this.state.Address
        const Address = this.state.addressData
        return (
            (!this.state.productData) ? <ActivityIndicator /> :
                <>
                    {/* shipping Address section start  */}
                    <View style={{ height: '30%', paddingHorizontal: 20 }} >


                        < View style={styles.Address} >
                            <Text style={styles.address_custname}> {customerData.first_name}  {customerData.last_name}</Text>
                            <Text style={styles.address_text}>
                                {Address.address} , {Address.state},
                                    {Address.country} , {Address.pincode}</Text>
                        </View>

                        <ButtonField text=" Change or Add Address" style={styles.addressButton}
                            onPress={() => {
                                (this.state.Address).length > 0 ?
                                    this.props.navigation.navigate('AddAddress') :
                                    this.props.navigation.navigate('address')
                            }
                            }
                        />
                    </View>
                    {/* product section start  */}
                    <View
                        style={{
                            height: 1,
                            width: "100%",
                            backgroundColor: "#000",
                        }}
                    />

                    <View style={{ height: "40%" }}>
                        <FlatList data={this.state.productData}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) =>
                                <View>
                                    <TouchableOpacity style={{ padding: 20 }} >
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{ width: '50%' }}>
                                                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{item.product_name}</Text>
                                            </View>
                                            <Image style={{ width: 110, height: 80 }} source={{
                                                uri: 'http://180.149.241.208:3022/' + item.product_image
                                            }} />
                                        </View>
                                        <View style={{ display: 'flex', paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{ width: '30%' }}>
                                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.product_producer}</Text>
                                            </View>
                                            <View>
                                                <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: 'bold' }}>
                                                    Rs.{item.product_cost * this.state.quantity[index]}</Text>
                                            </View>
                                        </View>
                                        <View>
                                            <Picker
                                                selectedValue={this.state.quantity[index]}
                                                style={{ width: 100 }}
                                                onValueChange={(itemValue, itemIndex) =>
                                                    this.pickerChange(index, itemValue)
                                                }
                                            >

                                                <Picker.Item label="1 " value="1" />
                                                <Picker.Item label="2" value="2" />
                                                <Picker.Item label="3" value="3" />
                                                <Picker.Item label="4 " value="4" />
                                                <Picker.Item label="5 " value="5" />

                                            </Picker>
                                        </View>

                                    </TouchableOpacity>
                                </View>}
                            keyExtractor={item => item.id}
                            ItemSeparatorComponent={this.FlatListItemSeparator} />
                    </View>

                    {/* sfooter section  */}
                    <View
                        style={{
                            height: 1,
                            width: "100%",
                            backgroundColor: "#000",
                        }}
                    />
                    <View style={{ height: '30%' }}>
                        <View style={{ height: 100, marginBottom: 10 }}>
                            <Text style={styles.priceDetail}>Price Detail</Text>
                            <View style={styles.priceDetailWrapper}>
                                <Text style={{ fontSize: 20, width: 250 }}>Price</Text>
                                <Text style={{ fontSize: 20 }}>Rs.{this.state.finalCost}</Text>
                            </View>
                        </View>


                        <View style={styles.footer}>
                            <View style={styles.footer_wrapper}>

                                <Text style={styles.footerProduct_cost}>Rs.{this.state.finalCost}</Text>

                                <ButtonField text="ORDER NOW" style={styles.footerButton_text} onPress={() => this.oderNow()} />

                            </View>
                        </View>
                    </View>
                </>
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


// export default Placeorder;
export default connect(mapStateToProps, mapDispatchToProps)(Placeorder)
