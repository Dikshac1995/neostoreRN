import React, { Component } from 'react'
import { Text, View, Image, ScrollView, FlatList, Picker, TouchableOpacity } from 'react-native'
import { FetchProductDetail } from '../../../Redux/Action/productlist'
import { connect } from 'react-redux';
import { styles } from './style'
import Button1 from '../../Reusable/ButtonField/buttonField'
import QuantityPicker from '../../Reusable/dropDown/picker';
import ButtonField from '../../Reusable/ButtonField/buttonField';
import AsyncStorage from '@react-native-community/async-storage';


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
        };
    }

    componentDidMount() {

        this.getStoredData()
        const { product_id, Product } = this.props.route.params;
        // arr = [...this.state.productData]
        if (!Product == " ") {
            arr.push(Product)
            console.log(arr, "1234")
        } else {
            console.log('data')
        }

        console.log("categoryId", Product)
        let type = 'getProductByProdId/' + product_id
        console.log('type1', type)
        this.props.FetchProductDetail(type);
        const { data, userData } = this.props;
        console.log(this.props.data, "Prductdata")
        console.log(" user data in place order ", userData)
        var subImages_id = data.product_details[0].subImages_id
        this.setState({
            ProductDetailData: data.product_details[0],
            productCategory: data.product_details[0].category_id,
            subImages_id: data.product_details[0].subImages_id,
            // productData: arr
        });


    }
    async getStoredData() {
        const customer_details = JSON.parse(await AsyncStorage.getItem('customerDetail'))
        const value = JSON.parse(await AsyncStorage.getItem('myOrder'));
        console.log("my cart order", value)

        console.log("cust_detail", customer_details)


        arr.push(value)
        console.log(arr, "12345")


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
        const { product_id, Product } = this.props.route.params;
        console.log(Product, "abc")
        console.log("cust add", this.state.Address)
        const customerData = this.state.customer_details
        const Address = this.state.Address
        console.log("data from detail module ", this.state.ProductDetailData)
        console.log('datadik', this.state.productData)


        return (
            (!this.state.ProductDetailData) ? <ActivityIndicator /> :

                <>

                    {/* shipping Address section start  */}
                    <View style={{ paddingHorizontal: 20, height: '30%' }} >
                        {this.state.Address == ' ' ? null :
                            <View style={styles.Address}>
                                <Text style={styles.address_text}> {customerData.first_name}  {customerData.last_name}</Text>
                                <Text style={styles.address_text}>
                                    {Address.address} , {Address.state},
                                    {Address.country} , {Address.pincode}</Text>
                            </View>
                        }
                        <ButtonField text=" Change or Add Address" style={styles.addressButton}
                            onPress={() => {
                                !this.state.Address ?
                                    this.props.navigation.navigate('AddAddress')
                                    :
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
                    {/* <View style={styles.productDetailSection1_wrapper}>
                        <View style={{ width: 200, height: 100 }}>
                            <Text style={styles.product_name}>{this.state.ProductDetailData.product_name}</Text>
                            <Text style={styles.categogy_name}>{this.state.productCategory.category_name}</Text>
                        </View>
                        <View>
                            <Image style={{ width: 100, height: 100 }}
                                source={{
                                    uri: 'http://180.149.241.208:3022/' + this.state.ProductDetailData.product_image
                                }} />
                        </View>
                    </View> */}

                    {/* <View style={styles.productDetailSection1_wrapper}>
                        <View style={{ width: 200 }}>

                            <Text style={styles.material_name}>{this.state.ProductDetailData.product_material}</Text>
                           
                            <Picker
                                selectedValue={this.state.selectedValue}
                                style={{ width: 100 }}
                                onValueChange={(itemValue, itemIndex) => this.setState({ selectedValue: itemValue })}
                            >
                                <Picker.Item label="1 " value="1" />
                                <Picker.Item label="2" value="2" />
                                <Picker.Item label="3" value="3" />
                                <Picker.Item label="4 " value="4" />
                                <Picker.Item label="5 " value="5" />

                            </Picker>


                        </View>

                        <View >
                            <Text style={{ fontSize: 20 }}>Rs.{this.state.ProductDetailData.product_cost}</Text>
                        </View>

                    </View> */}




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

                                <View >
                                    <TouchableOpacity style={{ padding: 20 }}
                                        onPress={() => this.removeProduct(data.indexOf(item))}
                                    >

                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{ width: '50%' }}>
                                                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{item.product_name}</Text>
                                            </View>
                                            <Image style={{ width: 140, height: 100 }} source={{
                                                uri: 'http://180.149.241.208:3022/' + item.product_image
                                            }} />
                                        </View>
                                        <View style={{ display: 'flex', paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>

                                            <View style={{ width: '50%' }}>
                                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.product_material}</Text>

                                            </View>
                                            <View>
                                                <Text style={{ textAlign: 'right', fontSize: 20, fontWeight: 'bold' }}>Rs.{item.product_cost}</Text>
                                            </View>

                                        </View>
                                        <View>
                                            <Picker
                                                selectedValue={this.state.selectedValue}
                                                style={{ width: 100 }}
                                                onValueChange={(itemValue, itemIndex) => this.setState({ selectedValue: itemValue })}
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
                    <View style={{ height: '30%' }}>
                        <View style={{ height: 100, backgroundColor: 'pink', marginBottom: 10 }}>
                            <Text style={styles.priceDetail}>Price Detail</Text>
                            <View style={styles.priceDetailWrapper}>
                                <Text style={{ fontSize: 20, width: 250 }}>Price</Text>
                                <Text style={{ fontSize: 20 }}>{this.state.ProductDetailData.product_cost * this.state.selectedValue}</Text>
                            </View>
                        </View>


                        <View style={styles.footer}>
                            <View style={styles.footer_wrapper}>
                                <View style={{ padding: 10 }}><Text style={styles.footerProduct_cost}>Rs.{this.state.ProductDetailData.product_cost * this.state.selectedValue}</Text>
                                </View>
                                <ButtonField text="ORDER NOW" style={styles.footerButton_text} />

                            </View>
                        </View>
                    </View>
                </>
        )
    }
}


const mapStateToProps = state => ({
    data: state.productListReducer.data,
    isFetching: state.productListReducer.isFetching,
    state: state,
    isLoggedIn: state.auth.isLoggedIn,
    isLoading: state.auth.isLoading,
    userData: state.auth.userData,
});

const mapDispatchToProps = (dispatch) => {
    return {
        FetchProductDetail: (type) => dispatch(FetchProductDetail(type))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Placeorder)