import React, { Component } from 'react'
import { Text, View, Image, ScrollView, FlatList,TouchableOpacity} from 'react-native'
import { connect } from 'react-redux';
import { FetchProductDetail } from '../../../Redux/Action/productlist'
import StarRating from 'react-native-star-rating';
import { styles } from './style'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Button from '../../Reusable/ButtonField/buttonField'
import { windowWidth, windowHeight} from '../Constant/constant'


class productDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // isLoading:true,
            ProductDetailData: [],
            productCategory: [],
            subImages_id:[],
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
    render() {
       
        console.log("PDwer", this.state.ProductDetailData)
        console.log("j", this.state.ProductDetailData.category_id)

        return (
            (!this.state.ProductDetailData) ? <ActivityIndicator /> :
        <View style={{ width: windowWidth, height: windowHeight}}>
            <ScrollView>
                <View style={styles.productDeatailModule}>
                    <Text style={styles.product_name}>{this.state.ProductDetailData.product_name}</Text>
                    <Text style={styles.categogy_name}>Categogy-{this.state.productCategory.category_name}</Text> 
                   <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={styles.material_name}>{this.state.ProductDetailData.product_material}</Text>
                       <StarRating rating={this.state.ProductDetailData.product_rating} starSize={20} fullStarColor="orange" />
                    </View>
                 
                    <View style = {{backgroundColor:'pink',borderRadius:10}}>
                        <View style={{ display: 'flex', flexDirection: 'row' ,justifyContent:'space-between',padding:10}}>
                                    <Text style={styles.product_cost}>Rs,{this.state.ProductDetailData.product_cost}</Text>
                            <Icon name="share-alt" size={30} color="#7f7f7f" />
                        </View>
                        <View style={{alignItems:'center'}}>
                        <Image style={{ width: 200, height: 200}} source={{
                            uri: 'http://180.149.241.208:3022/' + this.state.productCategory.product_image
                            }} />
                            </View>
                            
                                <View>
                                    <FlatList data={this.state.subImages_id.product_subImages}
                                        showsVerticalScrollIndicator={false}
                                         horizontal={true}
                                         renderItem={({ item }) =>
                                            <View >
                                                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',padding:10}} onPress={() => { this.props.navigation.navigate('productDetail', { product_id: item.product_id }) }}>
                                                    
                                                    <View style={{ borderWidth:2,borderColor:'grey'}}>
                                                                
                                                                <Image style={{width:90, height: 100 }} source={{
                                                                    uri: 'http://180.149.241.208:3022/' + item
                                                                }} />
                                                            </View>
                                                    
                                                </TouchableOpacity>
                                            </View>}
                                     />
                                </View>
                            </View>
                        <View>
                                <Text style={styles.Product_description_title}>Description-</Text>
                            <Text>{this.state.ProductDetailData.product_desc}
                            </Text>
                        </View>
                        
                       
                        
                </View>
                    </ScrollView>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly',paddingBottom:30,marginBottom:50}}>
                        <Button text="BUY_NOW" onPress={() => this.login()}  style ={{backgroundColor:'red'}} />
                        <Button text="RATE" onPress={() => this.login()}  />
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

export default connect(mapStateToProps, mapDispatchToProps)(productDetail)