import React, { Component } from 'react'
import { Text, View, Image, FlatList ,ActivityIndicator} from 'react-native'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { styles } from '../../../style/style'
import StarRating from 'react-native-star-rating';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { windowWidth } from '../Constant/constant'
import { FetchProductList } from '../../../Redux/Action/productlist'
import { connect } from 'react-redux';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // isLoading:true,
            ProductData: []
        };
    }

    componentDidMount() {
        const { category_id } = this.props.route.params;
        console.log("categoryId", category_id)
        let type = 'commonProducts?category_id=' + category_id + '&pageNo=1&perPage=5'
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
        const { data} = this.props;
        console.log("hello", data.product_details);
        const ProductDetail = data.product_details;
        return (
            (!ProductDetail) ? <ActivityIndicator /> :
        
                 
              <View style={{ marginHorizontal: 20 }}>
                <FlatList data={ProductDetail }
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) =>
                        <View >
                            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', padding: 0, alignItems: 'center' }} onPress={() => { this.props.navigation.navigate('productDetail',{product_id:item.product_id})}}>
                            <View>
                                <Image style={{ width: 120, height: 100 }} source={{
                                uri: 'http://180.149.241.208:3022/' + item.product_image}} />
                            </View>
                            <View style={{ padding:20, width: 200 }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.product_name}</Text>
                                <Text style={{ fontSize: 15 }}>{item.product_material}</Text>
                                <View style={{justifyContent:'flex-end',alignItems:'flex-end'}}>
                                 <StarRating rating={item.product_rating} starSize={20} fullStarColor="orange"/>
                                </View>
                                <Text style={{ color: 'red', fontSize: 15, fontWeight: 'bold' }}>Rs.{item.product_cost}</Text>
                             </View>
                            </TouchableOpacity>    
                        </View>}
                            
                    ItemSeparatorComponent={this.FlatListItemSeparator}/>
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
        FetchProductList: (type) => dispatch(FetchProductList(type))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)