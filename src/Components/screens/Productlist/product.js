import React, { Component } from 'react'
import { Text, View, Image, FlatList, ActivityIndicator, ToastAndroid, RefreshControl } from 'react-native'
import StarRating from 'react-native-star-rating';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux';
import Header from '../../Reusable/header /header'
import { FetchProductList } from '../../../Redux/Action/productlist'

const DATA = []
class ProductList extends Component {
    constructor(props) {
        super(props);
        this.page = 6,
            this.state = {
                isLoading: true,
                ProductList: [],
                isRefreshing: false,
            };
    }
    showToastWithGravityAndOffset = () => {
        ToastAndroid.showWithGravityAndOffset(
            " 6 out of 8 ",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,


        );
    };
    componentDidMount() {
        this.fetchdata(this.page)

    }

    async  fetchdata(page) {
        setTimeout(() => {
            this.setState({ isLoading: true })
        }, 2000)
        const { category_id } = this.props.route.params;
        console.log("categoryId", category_id)
        let type = 'commonProducts?category_id=' + category_id + '&pageNo=1&perPage=' + page
        console.log('type1', type)

        await this.props.FetchProductList(type);
        const { data, isFetching } = this.props;
        console.log("data in productList", data, isFetching)
        // const data3 = [...this.state.ProductList]
        // DATA.push(data.product_details)
        const data3 = []
        console.log('data3', data)

        const data2 = data3.concat(data.product_details)
        console.log(data2)
        setTimeout(() => {
            this.setState({
                isLoading: false,
                ProductList: data2
            })
        }, 5000)


    }
    componentDidUpdate(prevProps) {
        console.log("did", prevProps)
        if (this.props.data.product_details !== prevProps.data.product_details) {
            setTimeout(() => {
                this.setState({
                    isLoading: false,
                    ProductList: this.props.data.product_details
                });
            }, 2000)
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
        console.log('in loader', this.state.isLoading)
        //it will show indicator at the bottom of the list when data is loading otherwise it returns null
        if (!this.state.loading) return null;
        return (
            <ActivityIndicator size={30}
                style={{ color: '#000', }}
            />
        );
    };

    handleLoadMore = () => {
        console.log('indataaaa')

        if (!this.state.isLoading) {
            if (this.page < 8) {
                this.page = this.page + 1; // increase page by 1
                this.fetchdata(this.page); // method for API call 
            }
        }
    };
    onRefresh() {
        const { category_id } = this.props.route.params;
        console.log(category_id, 'category')
        this.setState({ isRefreshing: true }); // true isRefreshing flag for enable pull to refresh indicator
        // method for API call 

        const url = `http://180.149.241.208:3022/commonProducts?category_id=${category_id}&pageNo=1&perPage=8`
        fetch(url)
            .then(res => res.json())//response type
            .then(data1 => {
                this.setState({
                    isLoading: false,
                    ProductList: data1.product_details,
                    isRefreshing: false
                });
            })
            .catch(error => {
                console.log(error);
            });
        console.log("data23", this.state.ProductList);
    }

    onPressItem(id, product_name) {
        { this.props.navigation.navigate('productDetail', { product_id: id, product_name: product_name }) }
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
                    {/* {(this.state.loading) ? <ActivityIndicator size='large' /> : */}
                    <View style={{ marginHorizontal: 20 }}>
                        <FlatList data={this.state.ProductList}
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this.onRefresh.bind(this)}
                                />
                            }
                            renderItem={({ item }) =>
                                <View >
                                    <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', padding: 0, alignItems: 'center' }}
                                        onPress={() => this.onPressItem(item.product_id, item.product_name)
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
                                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{
                                                // ((item.product_name).length > 20) ?
                                                // (((item.product_name).substring(0, 20 - 3)) + '...') :
                                                item.product_name}
                                            </Text>
                                            <Text style={{ fontSize: 15 }}>{item.product_material}</Text>
                                            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                                <StarRating rating={item.product_rating} starSize={20} fullStarColor="orange" />
                                            </View>
                                            <Text style={{ color: 'red', fontSize: 15, fontWeight: 'bold' }}>Rs.{item.product_cost}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                            // onScroll={() => this.showToastWithGravityAndOffset()}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            ListFooterComponent={this.renderFooter.bind(this)}
                            onEndReachedThreshold={1}
                            onEndReached={this.showToastWithGravityAndOffset()}
                            onScroll={() => this.handleLoadMore()}

                            // onEndReached={this.handleLoadMore()}
                            keyExtractor={item => item.id} />
                    </View>
                    {/* } */}
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