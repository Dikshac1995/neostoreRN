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

        // this.focusListener = this.props.navigation.addListener('focus', () => {
        this.getptoductapi()
        // })
    }
    // componentWillUnmount() {
    //     // Remove the event listener before removing the screen from the stack
    //     this.focusListener();

    // }
    componentDidUpdate(Prevstate, Prevprops) {
        console.log(Prevstate, '111', this.props, Prevprops, this.state)
    }
    async getCartData() {
        try {
            const data = JSON.parse(await AsyncStorage.getItem('CardData'));
            const da = []
            da.push(data)
            console.log(data, 'l22', da)
            if (data.length === 0) {
                console.log(data.length)
            }
            // const arr = []
            else if (data !== null || data.length !== 0) {
                const data1 = arr.concat(da)
                // this.array.push(data)
                arr.forEach(function (element) {
                    element.quantity = 1;
                })
                const prod_quantity = arr.map((res) => res.quantity)


                var cost = data1.map(res => res.product_cost)
                var sum = cost.reduce(function (a, b) { return a + b; }, 0);
                console.log('product cost', data, cost, prod_quantity)
                this.setState({
                    myCardItem: data1,
                    quantity: prod_quantity,
                    finalCost: sum,
                    product_cost: cost,
                    loading: false
                })
                this.storedata(this.state.myCardItem, this.state.quantity)
            }

        } catch (error) {
            console.log(error)
        }

    }
    async getptoductapi() {
        const token = await AsyncStorage.getItem('token');
        this.props.getCartData(token)
        const data = this.props.data
        console.log(data, 'daaaa')
        if (data.data !== undefined) {
            const cartProduct = data.data.map((res) => res.product_id)
            console.log(cartProduct, '1')
            const prod_quantity = data.data.map((res) => res.quantity)
            const Valu = [...this.state.myCardItem]
            console.log(Valu, '2')
            const quantity = [...this.state.quantity]
            const mycartdata = Valu.concat(cartProduct)

            const product_quantity = quantity.concat(prod_quantity)
            var uniqueArray = mycartdata.reduce((filter, current) => {
                var dk = filter.find(item => item._id === current._id);
                if (!dk) {
                    return filter.concat([current]);
                } else {
                    return filter;
                }
            }, []);
            // let names = ['Mike', 'Matt', 'Nancy', 'Adam', 'Jenny', 'Nancy', 'Carl', 'Nancy'];
            let dup = [...new Set(mycartdata)];
            console.log(dup, '123');
            var cost = uniqueArray.map(res => res.product_cost)
            var sum = cost.reduce(function (a, b) { return a + b; }, 0);


            console.log(cost, sum, '233333')
            this.setState({
                myCardItem: uniqueArray,
                // quantity: product_quantity,
                finalCost: sum,
                product_cost: cost,
                loading: false,
                // cart: { ...this.state.cart, productData: mycartdata, quantity: quantity, }

            })
            this.storedata(this.state.myCardItem, this.state.quantity)
        }
        else {
            const cartData = [...this.state.myCardItem]
            // const cartData1 = [...this.state.mycardItem],
            if (cartData.length == 0) {
                this.storedata(cartData)
                this.setState({ loading: false })
            }



        }
    }
    // pickerChange(index, value) {
    //     console.log('val', index, value)
    //     const { quantity, product_cost } = this.state
    //     quantity.splice(index, 1, value)
    //     product_cost.splice(index, 1, quantity[index] * product_cost[index])
    //     // console.log(product_cost, '1111z')
    //     console.log(this.state.myCardItem[index].product_cost, product_cost[index], '11111111555')
    //     this.setState({ quantity: [...quantity] })
    //     console.log('picker value ', this.state.quantity, this.state.product_cost)
    //     var sum = 0;
    //     for (var i = 0; i < this.state.quantity.length; i++) {
    //         sum += this.state.quantity[i] * this.state.product_cost[i];
    //     }
    //     console.log('fsum', sum)
    //     this.setState({
    //         finalCost: sum,

    //     })
    //     this.storedata(this.state.myCardItem, this.state.quantity)


    // }

    async  orderNow() {
        this.state.myCardItem.forEach(function (element) {
            element.quantity = 1;
        });
        const values = this.state.myCardItem
        console.log('values', this.state.myCardItem)

        try {
            await AsyncStorage.setItem('myOrder', JSON.stringify(values));
            const value = JSON.parse(await AsyncStorage.getItem('myOrder'));
            console.log('orderrrrr', value)
            this.props.navigation.navigate('oder summary', { product_id: 0, Product: 0 })
        }
        catch (error) {
            console.log(error)
        }
    }


    async  storedata(val) {
        try {
            await AsyncStorage.setItem('MycartData', JSON.stringify(val));
            const value = JSON.parse(await AsyncStorage.getItem('MycartData'));
            console.log(value, 'val')
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
        Alert.alert(
            'Remove from card ',
            'Do you want to Remove this Product from Mycard',
            [
                {
                    text: 'OK', onPress: async () => {

                        this.state.myCardItem.splice(id, 1);
                        arr.splice(id, 1)
                        console.log(arr, 'll')
                        await AsyncStorage.setItem('MycartData', JSON.stringify(this.state.myCardItem))
                        await AsyncStorage.setItem('CardData', JSON.stringify(arr))
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
        console.log(data.length, 'length')
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
                                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                    <Text style={{ fontSize: 20 }}> Your cart is empty</Text>
                                </View> :
                                <View style={{ flex: 1, }}>

                                    <View style={{ flex: 1, }}>
                                        <View style={{ marginHorizontal: 20, flex: 8, }}>

                                            <FlatList data={data}
                                                showsVerticalScrollIndicator={false}
                                                renderItem={({ item, index }) =>
                                                    // <View style={{ flex: 1 }}>
                                                    <TouchableOpacity style={styles.myOrder_container}
                                                        // onPress={() => { this.props.navigation.navigate('productDetail', { product_id: item.product_id }) }}
                                                        onLongPress={() => this.removeProduct(data.indexOf(item))}>
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
                                                                {/* <Picker
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


                                            // </Picker> */}
                                                                <Text style={styles.product_cost}>Rs.{item.product_cost}</Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                    // </View>
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