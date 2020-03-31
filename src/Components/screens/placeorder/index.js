import React, { Component } from 'react'
import { Text, View, Image, ScrollView, FlatList, TouchableOpacity,Button} from 'react-native'
import { FetchProductDetail } from '../../../Redux/Action/productlist'
import { connect } from 'react-redux';
import { styles } from './style'
import  Button1 from '../../Reusable/ButtonField/buttonField'
import QuantityPicker from '../../Reusable/dropDown/picker';
class Placeorder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity:' ',
            // isLoading:true,
            ProductDetailData: [],
            productCategory: [],
            subImages_id: [],
            modalVisible: false,
            
        };
    }
  
    componentDidMount() {
        const { product_id } = this.props.route.params;
        // console.log("categoryId", product_id)
        let type = 'getProductByProdId/' + product_id
        console.log('type1', type)
        this.props.FetchProductDetail(type);
        const { data } = this.props;
        console.log(this.props.data)
        var subImages_id = data.product_details[0].subImages_id
        this.setState({
            ProductDetailData: data.product_details[0],
            productCategory: data.product_details[0].category_id,
            subImages_id: data.product_details[0].subImages_id
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
        return (
            (!this.state.ProductDetailData) ? <ActivityIndicator /> :
                <View style={{ paddingHorizontal: 10 }}>
                    <ScrollView>
                    <View style ={{height:150,display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 5, width :300,height: 50}}

                            onPress={this.onPress}
                        >
                            <Text style={{ justifyContent: "center", color: 'white', margin:10,paddingLeft:30,fontSize:20}}>Change or Add Address</Text>
                        </TouchableOpacity>
                        {/* <Button1  text=" change or Add Address"
                            onPress={() => this.add_address()}/> */}
                    </View>
                    <View
                        style={{
                            height: 1,
                            width: "100%",
                            backgroundColor: "#000",

                        }}
                        />
                        
                    <View style={styles.productDetailSection1_wrapper}>
                     <View style ={{width:200,height:100}}>
                        <Text style={styles.product_name}>{this.state.ProductDetailData.product_name}</Text>
                        <Text style={styles.categogy_name}>{this.state.productCategory.category_name}</Text>
                    </View>
                    <View>
                            <Image style={{ width: 100, height:100 }}
                                source={{
                        uri: 'http://180.149.241.208:3022/' + this.state.productCategory.product_image
                     }} />
                        </View>
                    </View> 
                    
                    <View style={styles.productDetailSection1_wrapper}>
                        <View style ={{width:200}}>
                                <Text style={styles.material_name}>{this.state.ProductDetailData.product_material}</Text>
                                <QuantityPicker/>
                         </View>
                         <View >          
                        <Text style ={{fontSize:20}}>Rs,{this.state.ProductDetailData.product_cost}</Text>
                    </View>
                </View>  
                            
                    <View
                        style={{
                            height: 1,
                            width: "100%",
                            backgroundColor: "#000",
                           
                        }}
                    />
                    <View>
                            <View >
                        <Text style={{textDecorationLine:'underline',fontSize:25,paddingLeft:25,paddingTop:10}}>Price Detail</Text>
                        <View style ={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',paddingVertical:20}}>
                            <Text style={{fontSize:20,width:250}}>Price</Text>
                            <Text style={{ fontSize: 20 }}>{this.state.ProductDetailData.product_cost}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            height: 1,
                            width: "100%",
                            backgroundColor: "#000",

                        }}
                            />
                           
                        </View>
                       </ScrollView> 

                        <View style={{ display: 'flex', paddingTop: 20 }}>
                            <View style={{ justifyContent: 'flex-end' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                    <Text style={{ fontSize: 30 }}>Rs.{this.state.ProductDetailData.product_cost}</Text>
                                    <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 5, width: 200, height: 50 }}

                                        onPress={this.oderNow}
                                    >
                                    <Text style={{ justifyContent: "center", color: 'white', fontSize: 20, marginLeft: 50, marginTop: 10 }}>
                                        Order Now</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                </View>
                

   
        )
    }
}


const mapStateToProps = state => ({
    data: state.productListReducer.data,
    isFetching: state.productListReducer.isFetching,
    state: state,
});

const mapDispatchToProps = (dispatch) => {
    return {
        FetchProductDetail: (type) => dispatch(FetchProductDetail(type))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Placeorder)