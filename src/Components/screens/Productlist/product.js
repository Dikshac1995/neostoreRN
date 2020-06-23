import React, { Component } from 'react'
import { Text, View, Image, FlatList, ActivityIndicator, ToastAndroid } from 'react-native'
import StarRating from 'react-native-star-rating';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { windowWidth } from '../../../Assets/Constant/constant'
import { FetchProductList } from '../../../Redux/Action/productlist'
import { connect } from 'react-redux';
import Header from '../../Reusable/header /header'

const DATA = []
class ProductList extends Component {
    constructor(props) {
        super(props);
        this.page = 1,
            this.state = {
                isLoading: true,
                ProductList: []
            };
    }
    showToastWithGravityAndOffset = () => {
        ToastAndroid.showWithGravityAndOffset(
            " 8 of 40 ",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,


        );
    };
    componentDidMount() {
        this.fetchdata(this.page)

    }

    fetchdata(page) {
        const { category_id } = this.props.route.params;
        console.log("categoryId", category_id)
        let type = 'commonProducts?category_id=' + category_id + '&pageNo=' + page + '&perPage=5'
        console.log('type1', type)
        this.props.FetchProductList(type);
        const { data } = this.props;
        console.log("data in productList", data)
        const data3 = [...this.state.ProductList]
        // DATA.push(data.product_details)
        console.log('data3', data)
        const data2 = data3.concat(data.product_details)
        console.log(data2)

        this.setState({
            loading: true,
            ProductList: data2
        })


    }
    componentDidUpdate(prevProps) {
        console.log("did", prevProps)
        if (this.props.data.product_details !== prevProps.data.product_details) {
            this.setState({
                loading: false,
                ProductList: this.props.data.product_details
            });
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

    renderFooter = () => {
        //it will show indicator at the bottom of the list when data is loading otherwise it returns null
        if (!this.state.loading) return null;
        return (
            <ActivityIndicator
                style={{ color: '#000' }}
            />
        );
    };

    handleLoadMore = () => {
        if (!this.state.loading) {


            if (this.page < 2) {
                this.page = this.page + 1; // increase page by 1
                this.fetchdata(this.page); // method for API call 
            }
        }
    };

    onPressItem(id) {
        { this.props.navigation.navigate('productDetail', { product_id: id }) }
    }


    render() {
        const { category_name } = this.props.route.params;
        console.log('product in state ', this.state.ProductData)

        const { data } = this.props;
        console.log(' .........', this.state.ProductList)
        console.log("hello", data.product_details);
        const ProductDetail = data.product_details;
        return (
            <>
                <Header name1='arrowleft' text={category_name} name2='search'
                    onPress={() => this.props.navigation.goBack()}
                    onClick={() => this.props.navigation.navigate('searchitem')}
                />
                <View>
                    {(this.state.loading) ? <ActivityIndicator size='large' /> :
                        <View style={{ marginHorizontal: 20 }}>
                            <FlatList data={this.state.ProductList}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) =>
                                    <View >
                                        <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', padding: 0, alignItems: 'center' }}
                                            onPress={() => this.onPressItem(item.product_id)
                                                // { this.props.navigation.navigate('productDetail', { product_id: item.product_id }) }
                                            }
                                        >
                                            <View>
                                                {!item.product_image ? <ActivityIndicator size='large' /> :
                                                    <Image style={{ width: 120, height: 100 }} source={{
                                                        uri: 'http://180.149.241.208:3022/' + item.product_image
                                                    }} />}
                                            </View>
                                            <View style={{ padding: 20, width: 250 }}>
                                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{((item.product_name).length > 20) ?
                                                    (((item.product_name).substring(0, 20 - 3)) + '...') :
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
                                ItemSeparatorComponent={this.FlatListItemSeparator}
                                ListFooterComponent={this.renderFooter.bind(this)}
                                onEndReachedThreshold={0}
                                // onEndReached={this.handleLoadMore()}
                                keyExtractor={item => item.id} />
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