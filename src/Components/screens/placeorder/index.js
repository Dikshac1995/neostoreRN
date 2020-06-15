import React, { Component } from 'react'
import { Text, View, Image, ScrollView, FlatList, Picker, TouchableOpacity, ActivityIndicator } from 'react-native'
import { styles } from './style'
import ButtonField from '../../Reusable/ButtonField/buttonField';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../../Reusable/header /header'


const arr = [];

class Placeorder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: ' ',
            productData: [],
            ProductDetailData: [],
            productCategory: [],
            subImages_id: [],
            modalVisible: false,
            selectedValue: "1",
            Address: [],
            customer_details: [],
            picker: [
                { label: '1', value: 1, },
                { label: '2', value: 2, },
            ]
        };
    }

    componentDidMount() {
        const arr = [];
        const { product_id, Product } = this.props.route.params;
        console.log("product", Product)
        this.getStoredData()

        arr.push(Product)
        this.setState({ productData: arr })
    }

    async getStoredData() {
        const customer_details = JSON.parse(await AsyncStorage.getItem('customerDetail'))
        const value = JSON.parse(await AsyncStorage.getItem('myOrder'));

        this.setState({
            Address: customer_details.customer_address[0],
            customer_details: customer_details.customer_details,
            productData: value
        })
    }


    add_address() {
        this.props.navigation.navigate('AddAddress')
    }

    oderNow() {

    }
    pickerChange(itemIndex, itemValue) {
        if (!itemIndex == " ") {
            this.setState({
                selectedValue: itemValue
            })
        }
        console.log(itemIndex, itemValue)

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

        console.log("cust add", this.state.Address)
        const customerData = this.state.customer_details
        const Address = this.state.Address
        console.log("data from detail module ", this.state.ProductDetailData)
        console.log('datadik', this.state.productData)
        return (
            (this.state.productDataData) ? <ActivityIndicator /> :
                <>
                    {/* shipping Address section start  */}
                    <View style={{ height: '30%', paddingHorizontal: 20 }} >
                        {(this.state.Address).length > 0 ? null :
                            <View style={styles.Address}>
                                <Text style={styles.address_custname}> {customerData.first_name}  {customerData.last_name}</Text>
                                <Text style={styles.address_text}>
                                    {Address.address} , {Address.state},
                                    {Address.country} , {Address.pincode}</Text>
                            </View>
                        }
                        <ButtonField text=" Change or Add Address" style={styles.addressButton}
                            onPress={() => {
                                (this.state.Address).length > 0 ?
                                    this.props.navigation.navigate('address')
                                    :
                                    this.props.navigation.navigate('AddAddress')
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
                            renderItem={({ item }) =>
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
                                                <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: 'bold' }}>Rs.{item.product_cost}</Text>
                                            </View>
                                        </View>
                                        <View>
                                            <Picker
                                                selectedValue={this.state.selectedValue}
                                                style={{ width: 100 }}
                                                onValueChange={(itemValue, itemIndex) =>
                                                    this.pickerChange(this.state.productData.indexOf(item), itemValue)
                                                    // this.setState({ selectedValue: itemValue })
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
                                <Text style={{ fontSize: 20 }}>{this.state.ProductDetailData.product_cost * this.state.selectedValue}</Text>
                            </View>
                        </View>


                        <View style={styles.footer}>
                            <View style={styles.footer_wrapper}>

                                <Text style={styles.footerProduct_cost}>Rs.{this.state.ProductDetailData.product_cost * this.state.selectedValue}</Text>

                                <ButtonField text="ORDER NOW" style={styles.footerButton_text} />

                            </View>
                        </View>
                    </View>
                </>
        )
    }
}



export default Placeorder;