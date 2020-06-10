import React, { Component } from 'react'
import { Text, View, Image, ScrollView, FlatList, Picker } from 'react-native'
import { FetchProductDetail } from '../../../Redux/Action/productlist'
import { connect } from 'react-redux';
import { styles } from './style'
import Button1 from '../../Reusable/ButtonField/buttonField'
import QuantityPicker from '../../Reusable/dropDown/picker';
import ButtonField from '../../Reusable/ButtonField/buttonField';
import AsyncStorage from '@react-native-community/async-storage';


class Placeorder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: ' ',
            // isLoading:true,
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
        const { product_id } = this.props.route.params;
        // console.log("categoryId", product_id)
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

        })

    }
    async getStoredData() {
        const customer_details = JSON.parse(await AsyncStorage.getItem('customerDetail'))
        console.log("cust_detail", customer_details)
        this.setState({
            Address: customer_details.customer_address[0],
            customer_details: customer_details.customer_details,
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
        console.log("cust add", this.state.Address)
        const customerData = this.state.customer_details
        const Address = this.state.Address

        return (
            (!this.state.ProductDetailData) ? <ActivityIndicator /> :


                <>
                    <View style={{ paddingHorizontal: 20 }} >
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
                    <View
                        style={{
                            height: 1,
                            width: "100%",
                            backgroundColor: "#000",
                        }}
                    />
                    <View style={styles.productDetailSection1_wrapper}>
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
                    </View>

                    <View style={styles.productDetailSection1_wrapper}>
                        <View style={{ width: 200 }}>
                            <Text style={styles.material_name}>{this.state.ProductDetailData.product_material}</Text>
                            {/* <QuantityPicker/> */}
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
                    </View>

                    <View
                        style={{
                            height: 1,
                            width: "100%",
                            backgroundColor: "#000",
                        }}
                    />
                    <View style={{ margin: 10, height: 100 }}>
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