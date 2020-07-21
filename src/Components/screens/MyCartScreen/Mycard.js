import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList, Image, Picker, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../../Reusable/header /header'
import { api } from '../../../utils/api';
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { styles } from './style'
import { connect } from 'react-redux';
import { getCartData } from '../../../Redux/Action/mycart'
import Loader from '../../Reusable/loader/loader'



const arr = []
const array = []
class Mycart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: {
                productData: [],
                quantity: '',
                cost: ' ',
            },
            myCardItem: [],
            data: [],
            product_cost: [],
            finalCost: ' ',
            token: ' ',
            selectedValue: [1, 1,],
            quantity: [],
            loading: true
        }
        this.array = []

    }

    componentDidMount() {
        this.getCartData()
        this.getptoductapi()
    }

    async getCartData() {
        try {

            const data = JSON.parse(await AsyncStorage.getItem('CardData'));
            if (data.length > 0) {
                const prod_quantity = data.map((res) => res.quantity)
                var cost = data.map(res => res.product_cost)
                var sum = cost.reduce(function (a, b) { return a + b; }, 0);
                this.setState({
                    myCardItem: data,
                    quantity: prod_quantity,
                    finalCost: sum,
                    product_cost: cost,
                    loading: false
                })
                this.storedata(this.state.myCardItem, this.state.quantity)
            }
        }

        catch (error) {
            console.log(error)
        }

    }
    async getptoductapi() {
        const token = await AsyncStorage.getItem('token');
        this.props.getCartData(token)
        const data = this.props.data
        if (data.data !== undefined) {
            const cartProduct = data.data.map((res) => res.product_id)
            const prod_quantity = data.data.map((res) => res.quantity)
            const Valu = [...this.state.myCardItem]
            const quantity = [...this.state.quantity]
            const mycartdata = Valu.concat(cartProduct)
            var uniqueArray = mycartdata.reduce((filter, current) => {
                var dk = filter.find(item => item._id === current._id)
                if (!dk) {
                    return filter.concat([current]);
                } else {
                    return filter
                }

            }, []);

            let dup = [...new Set(mycartdata)];
            var cost = uniqueArray.map(res => res.product_cost)
            var sum = cost.reduce(function (a, b) { return a + b; }, 0);
            this.setState({
                myCardItem: uniqueArray,
                quantity: 1,
                finalCost: sum,
                product_cost: cost,
                loading: false,
                // cart: { ...this.state.cart, productData: mycartdata, quantity: quantity, }
            })
            this.storedata(this.state.myCardItem, this.state.quantity)

        }
        else {
            const cartData = [...this.state.myCardItem]
            if (cartData.length == 0) {
                this.storedata(cartData)
                this.setState({ loading: false })
            }
        }
    }

    async  orderNow() {
        this.state.myCardItem.forEach(function (element) {
            element.quantity = 1;
        });
        const values = this.state.myCardItem
        try {
            await AsyncStorage.setItem('myOrder', JSON.stringify(values));
            const value = JSON.parse(await AsyncStorage.getItem('myOrder'));
            this.props.navigation.navigate('oder summary', { product_id: 0, Product: 0 })
        }
        catch (error) {
            console.log(error)
        }
    }


    async  storedata(val) {
        val.forEach(function (element) {
            element.quantity = 1;
        });
        try {
            await AsyncStorage.setItem('MycartData', JSON.stringify(val));
            await AsyncStorage.setItem('CardData', JSON.stringify(val));
            const value = JSON.parse(await AsyncStorage.getItem('MycartData'));
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


    async removeProduct(id, product) {
        const token = await AsyncStorage.getItem('token');
        Alert.alert(
            'Remove from card ',
            'Do you want to Remove this Product from Mycard',
            [
                {
                    text: 'OK', onPress: async () => {
                        this.state.myCardItem.splice(id, 1);
                        api.fetchapi(api.baseUrl + 'deletecustomerCart/' + product._id, 'Delete', JSON.stringify({ product_id: id }), token)
                            .then((res) => res.json())
                            .then((data) => { console.log(data, ' data') })
                        await AsyncStorage.setItem('MycartData', JSON.stringify(this.state.myCardItem))
                        await AsyncStorage.setItem('CardData', JSON.stringify(this.state.myCardItem))
                        this.setState({ myCardItem: JSON.parse(await AsyncStorage.getItem('MycartData')) })
                        var cost = this.state.myCardItem.map(res => res.product_cost)
                        var sum = cost.reduce(function (a, b) { return a + b; }, 0);
                        this.setState({ finalCost: sum })

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

    render() {
        const info = this.props.data
        const data = this.state.myCardItem
        return (
            <>
                <Header name1='arrowleft' text='My Carts' name2='search'
                    onPress={() => this.props.navigation.goBack()}
                    onClick={() => this.props.navigation.navigate('searchitem')}
                />

                <View style={{ flex: 1 }}>

                    {(this.state.loading) ?
                        <Loader name='onLoad'
                            loading={true} /> :
                        <>
                            {(data.length) == 0 ?
                                <View style={styles.emptyCart_err}>
                                    <Text style={{ fontSize: 20 }}> Your cart is empty</Text>
                                </View> :
                                <View style={{ flex: 1, }}>
                                    <View style={{ flex: 1, }}>
                                        <View style={styles.flatList_wrapper}>
                                            <FlatList data={data}
                                                showsVerticalScrollIndicator={false}
                                                renderItem={({ item, index }) =>
                                                    <TouchableOpacity style={styles.myOrder_container}
                                                        onLongPress={() => this.removeProduct(index, item)}>
                                                        <View style={{ flex: 1 }}>
                                                            <View>
                                                                <Image style={{ width: '100%', height: 100, resizeMode: 'stretch' }} source={{
                                                                    uri: api.baseUrl + item.product_image
                                                                }} />
                                                            </View>
                                                        </View>
                                                        <View style={{ padding: 15, flex: 2, }}>
                                                            <Text style={styles.product_name}>{item.product_name}</Text>
                                                            <Text style={styles.product_material}>({item.product_material})</Text>

                                                            <View>
                                                                <Text style={styles.product_cost}>Rs.{item.product_cost}</Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                }
                                                ItemSeparatorComponent={this.FlatListItemSeparator}
                                                keyExtractor={(item, index) => index.toString()}
                                            />
                                        </View>

                                        <View style={styles.footer}>
                                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={styles.totalPrice}>Rs, {this.state.finalCost}</Text>
                                                <ButtonField text="ORDER NOW" style={styles.footerButton_text}
                                                    onPress={() => this.orderNow()} />
                                            </View>

                                        </View>
                                    </View>
                                </View>
                            }</>
                    }

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

export default connect(mapStateToProps, mapDispatchToProps)(Mycart)

// export default Mycart