import React, { Component } from 'react'
import { Text, View, Image, FlatList ,ActivityIndicator,ToastAndroid} from 'react-native'
import StarRating from 'react-native-star-rating';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { windowWidth } from '../../../Assets/Constant/constant'
import { FetchProductList } from '../../../Redux/Action/productlist'
import { connect } from 'react-redux';
import Header from '../../Reusable/header /header'


class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // isLoading:true,
            ProductData: []
        };
    }
    showToastWithGravityAndOffset = () => {
        ToastAndroid.showWithGravityAndOffset(
            " 5 of 8 ",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
            
        );
    };
    componentDidMount() {
        const { category_id} = this.props.route.params;
        console.log("categoryId", category_id)
        let type = 'commonProducts?category_id=' + category_id + '&pageNo=1&perPage=8'
        console.log('type1',type)
        this.props.FetchProductList(type);
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
        const { category_name } = this.props.route.params;
        console.warn(category_name)
        const { data} = this.props;
        console.log("hello", data.product_details);
        const ProductDetail = data.product_details;
        return (
          
            <>
                <Header name1='arrow-left' text={category_name} name2='search'
                    onPress={() => this.props.navigation.goBack()}
                    onClick={() => this.props.navigation.navigate('searchitem')}

                />
            <View>
                    {(!ProductDetail) ? <ActivityIndicator size='large'/> :
               
                        <View style={{ marginHorizontal: 20 }}>
                   
                            <FlatList data={ProductDetail}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) =>
                                    <View >
                                        <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', padding: 0, alignItems: 'center' }}
                                            onPress={() => { this.props.navigation.navigate('productDetail', { product_id: item.product_id }) }}
                                          >
                                            <View>
                                                <Image style={{ width: 120, height: 100 }} source={{
                                                    uri: 'http://180.149.241.208:3022/' + item.product_image
                                                }} />
                                            </View>
                                            <View style={{ padding: 20, width: 250 }}>
                                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{((item.product_name).length > 20) ?
                                                    (((item.product_name).substring(0, 20- 3)) + '...') :
                                                    item.product_name}
                                                </Text>
                                                <Text style={{ fontSize: 15 }}>{item.product_material}</Text>
                                                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                                    <StarRating rating={item.product_rating} starSize={20} fullStarColor="orange" />
                                                </View>
                                                <Text style={{ color: 'red', fontSize: 15, fontWeight: 'bold' }}>Rs.{item.product_cost}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>}
                                onScroll={() => this.showToastWithGravityAndOffset()}
                                ItemSeparatorComponent={this.FlatListItemSeparator} />
                        </View>}
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
        FetchProductList: (type) => dispatch(FetchProductList(type))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)