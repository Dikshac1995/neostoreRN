import React, { Component } from 'react'
import { Text, View, Image, ScrollView, FlatList, Picker, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { styles } from './style'
import ButtonField from '../../Reusable/ButtonField/buttonField';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../../Reusable/header /header';
import { api } from '../../../utils/api'
import { connect } from 'react-redux';
import { getCartData } from '../../../Redux/Action/mycat'
import { useIsFocused } from '@react-navigation/native';
import { FetchAddress } from '../../../Redux/Action/address'
import Loader from '../../Reusable/loader/loader'


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
            isLoading: true,
            picker: [
                { label: '1', value: 1, },
                { label: '2', value: 2, },
            ]
        };
    }

    componentDidMount() {
        console.log('data')
        this.getData()
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
            setTimeout(() => {
                this.setState({
                    productData: arr,
                    quantity: quantity,
                    product_cost: cost,
                    finalCost: sum,
                    isLoading: false
                })
            }, 2000)
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
        this.setState({ isLoading: true })

        const { product_id, Product, addressData } = this.props.route.params;
        console.log('add data', this.state.productData, this.state.quantity)
        const customer_details = JSON.parse(await AsyncStorage.getItem('customerDetail'))
        const value = JSON.parse(await AsyncStorage.getItem('myOrder'));
        console.log('valu', customer_details)
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
                finalCost: sum,
                isLoading: false
            })

        }
        this.setState({
            Address: customer_details.customer_address[0],
            customer_details: customer_details.customer_details,

        })
    }
    // componentDidUpdate(prevProps, prevState) {
    //     console.log(prevState.Address, 'addre', this.state.Address)
    //     if (prevState.Address === this.state.Address) {
    //     }
    // };

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
                            api.fetchapi(api.baseUrl + "addProductToCartCheckout", 'post',
                                JSON.stringify(data1),
                                token)
                                .then((response) => response.json()).then(async (data) => {
                                    console.log('Success:', data);
                                    if (data.success) {
                                        // AsyncStorage.removeItem('MycartData');
                                        // await AsyncStorage.multiRemove('myOrder')
                                        Alert.alert(data.message)
                                        this.props.navigation.navigate('homescreen')

                                        // this.setState({ productData: ' ' })

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
        const elementsIndex = this.state.productData.findIndex(element => element.id == index)
        let newArray = [...this.state.productData]
        newArray[index] = { ...newArray[index], quantity: value }
        const { quantity } = this.state
        quantity.splice(index, 1, value)
        this.setState({ quantity: [...quantity] })
        var sum = 0;
        for (var i = 0; i < this.state.quantity.length; i++) {
            sum += this.state.quantity[i] * this.state.product_cost[i];
        }
        this.setState({
            finalCost: sum,
            productData: newArray
        })
    }


    async getData() {
        let token = await AsyncStorage.getItem('token');
        const customerData = JSON.parse(await AsyncStorage.getItem('customerDetail'))
        this.setState({ token: token, data: customerData.customer_details })

        // this.props.FetchAddress(token)
        // const data = this.props.addressData
        // console.log('as', data)
        // var address = data.filter(function (res) {
        //     return res.isDeliveryAddress == true;
        // });
        // console.log('addr', address)
        // this.setState({ addressData: address[0] })
        api.fetchapi(api.baseUrl + 'getCustAddress', 'get', " ", this.state.token)
            .then((response) => response.json())
            .then((data) => {
                console.log('Success address data :', data);
                if (data.success == true) {
                    var address = data.customer_address.filter(function (res) {
                        return res.isDeliveryAddress == true;
                    });
                    this.setState({ addressData: address[0] })
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
        const { product_id, Product, addressData } = this.props.route.params;
        const customerData = this.state.customer_details
        const Address = this.state.addressData
        return (

            // (!this.state.productData) ? <ActivityIndicator /> :
            <>

                {/* shipping Address section start  */}
                {(this.state.isLoading) ?
                    <Loader name='onLoad'
                        loading={true} /> :
                    <View>
                        <View style={{ height: '30%', paddingHorizontal: 20 }} >
                            <View style={styles.Address} >
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

                        {this.FlatListItemSeparator()}
                        <View style={{ height: "40%" }}>
                            <FlatList data={this.state.productData}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item, index }) =>
                                    <View>
                                        <TouchableOpacity style={styles.product} >
                                            <View style={styles.product_row}>
                                                <View style={styles.productName_wrapper}>
                                                    <Text style={styles.productName_text}>{item.product_name}</Text>
                                                </View>
                                                <Image style={{ width: 110, height: 80 }} source={{
                                                    uri: api.baseUrl + item.product_image
                                                }} />
                                            </View>
                                            <View style={styles.product_row}>
                                                <View style={styles.productProducer_text}>
                                                    <Text style={styles.productProducer_text}>{item.product_producer}</Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.product_cost}>
                                                        Rs.{item.product_cost * this.state.quantity[index]}</Text>
                                                </View>
                                            </View>
                                            <View>
                                                <Picker
                                                    selectedValue={this.state.quantity[index]}
                                                    style={{ width: 100 }}
                                                    onValueChange={(itemValue, itemIndex) =>
                                                        this.pickerChange(index, itemValue)} >
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
                        {this.FlatListItemSeparator()}
                        <View style={styles.priceDetail}>
                            <View style={styles.priceDetail_container}>
                                <Text style={styles.priceDetail_text}>Price Detail</Text>
                                <View style={styles.priceDetailWrapper}>
                                    <Text style={styles.priceDetailWrapper_text}>Price</Text>
                                    <Text style={styles.priceDetail_totalCost}>Rs.{this.state.finalCost}</Text>
                                </View>
                            </View>
                            <View style={styles.footer}>
                                <View style={styles.footer_wrapper}>
                                    <Text style={styles.footerProduct_cost}>Rs.{this.state.finalCost}</Text>
                                    <ButtonField text="ORDER NOW" style={styles.footerButton_text} onPress={() => this.oderNow()} />
                                </View>
                            </View>
                        </View>
                    </View>}
            </>
        )
    }
}

const mapStateToProps = state => ({
    data: state.mycartReducer,
    addressData: state.AddressReducer.data
})

//Map your action creators to your props.
const mapDispatchToProps = (dispatch) => {
    return {
        getCartData: (type) => dispatch(getCartData(type)),
        FetchAddress: (type) => dispatch(FetchAddress(type))

    };
}


// export default Placeorder;
export default connect(mapStateToProps, mapDispatchToProps)(Placeorder)
