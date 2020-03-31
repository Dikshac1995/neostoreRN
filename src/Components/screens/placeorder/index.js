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
                
                
               <>
                    <View style={{ height: 150, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style ={{fontSize:20,paddingBottom:10}}> Neostore Pune 444115 </Text>
                       <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 5, width :300,height: 50}}

                     onPress={this.props.navigation.navigate('AddAddress')}
                  >
                    <Text style={{ justifyContent: "center", color: 'white', margin:10,paddingLeft:30,fontSize:20}}>Change or Add Address</Text>
                    </TouchableOpacity>
    
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
                    <View  style ={{margin:10}}>
                  <Text style={{textDecorationLine:'underline',fontSize:25,paddingLeft:25,paddingTop:10}}>Price Detail</Text>
              <View style ={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',paddingVertical:20}}>
                          <Text style={{fontSize:20,width:250}}>Price</Text>
                       <Text style={{ fontSize: 20 }}>{this.state.ProductDetailData.product_cost}</Text>
                     </View>
                   </View>
                    
                   
                <View style={styles.footer}>
                    <View style={styles.footer_wrapper}>
                            <Text style={styles.footerProduct_cost}>Rs,{this.state.ProductDetailData.product_cost}</Text>
                            <TouchableOpacity style={styles.footerOrder_button}

                            onPress={this.oderNow}
                        >
                                <Text style={styles.footerButton_text}>
                                Order Now</Text>
                        </TouchableOpacity>
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
});

const mapDispatchToProps = (dispatch) => {
    return {
        FetchProductDetail: (type) => dispatch(FetchProductDetail(type))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Placeorder)