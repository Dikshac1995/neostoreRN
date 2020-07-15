import React, { Component } from 'react'
import { Text, View, Image, FlatList, ActivityIndicator, ToastAndroid, RefreshControl } from 'react-native'
import StarRating from 'react-native-star-rating';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux';
import { api } from '../../../utils/api'
import Header from '../../Reusable/header /header'
import Loader from '../../Reusable/loader/loader'
import { styles } from './style'


// import { FetchProductList } from '../../../Redux/Action/productlist'

const DATA = []
export default class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            ProductList: [],
            isRefreshing: false,
            page: 1,
            loading: false
        };
    }
    showToastWithGravityAndOffset = (item) => {
        console.log('tost', item.length)
        ToastAndroid.showWithGravityAndOffset(
            item.length + " out of 8 ",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,


        );
    };
    componentDidMount() {
        this.fetchProductList(this.page)
    }

    fetchProductList() {
        const { category_id } = this.props.route.params;
        console.log(category_id, '1234')
        const { page } = this.state;
        const url = api.baseUrl + `commonProducts?category_id=${category_id}&pageNo=${page}&perPage=5`
        fetch(url)
            .then(res => res.json())
            .then(response => {
                console.log("res", response)
                setTimeout(() => {
                    this.setState((prevState, nextProps) => ({
                        ProductList:
                            page === 1
                                ? Array.from(response.product_details)
                                : [...this.state.ProductList, ...response.product_details],
                        isLoading: false
                    }));
                }, 2000)
            }).catch(error => {
                this.setState({ error, isLoading: false });
            });

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

    _renderFooter = () => {
        console.log('loading', this.state.loading)
        if (this.state.loading) {
            console.log('load');

            return (

                <View
                    style={{
                        flex: 1,
                        height: 50,
                        paddingVertical: 20,
                        borderTopWidth: 1,
                        marginTop: 10,
                        marginBottom: 10,
                    }}
                >
                    <ActivityIndicator animating size="large" />
                </View>
            );
        }
        else {
            return null
        }
    };


    _handleLoadMore = () => {
        if (!this.state.loading) {
            if (this.state.page < 2) {
                this.setState(
                    (prevState, nextProps) => ({
                        page: prevState.page + 1,
                        loading: true
                    }),
                    () => {
                        this.fetchProductList();
                    }
                )

            }
        }
    };
    _handleRefresh = () => {
        this.setState(
            {
                page: 1,
                refreshing: true
            },
            () => {
                this.fetchProductList();
            }
        );
    };

    onPressItem(id, product_name) {
        { this.props.navigation.navigate('productDetail', { product_id: id, product_name: product_name }) }
    }


    render() {
        const { category_name } = this.props.route.params;
        console.log('product in state ', this.state.ProductList)

        return (
            <>
                <Header name1='arrowleft' text={category_name} name2='search'
                    onPress={() => this.props.navigation.goBack()}
                    onClick={() => this.props.navigation.navigate('searchitem')}
                />
                <View style={{ flex: 1 }}>
                    {(this.state.isLoading) ?
                        <Loader name='onLoad'
                            loading={true} />
                        :
                        <View style={{ marginHorizontal: 20, flex: 1 }}>
                            <FlatList data={this.state.ProductList}
                                showsVerticalScrollIndicator={false}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isRefreshing}
                                        onRefresh={this._handleRefresh}
                                    />
                                }
                                renderItem={({ item, index }) =>
                                    <View >
                                        <TouchableOpacity style={styles.Product_List}
                                            onPress={() => this.onPressItem(item.product_id, item.product_name)
                                            }
                                        >
                                            <View style={{ flex: 1 }}>
                                                {!item.product_image ? <ActivityIndicator size='large' /> :
                                                    <Image style={{ width: '100%', height: 100, resizeMode: "stretch" }} source={{
                                                        uri: api.baseUrl + item.product_image
                                                    }} />}
                                            </View>
                                            <View style={styles.productName_warpper}>
                                                <Text style={styles.Product_name}>{
                                                    ((item.product_name).length > 20) ?
                                                        (((item.product_name).substring(0, 20 - 3)) + '...') :
                                                        item.product_name}
                                                </Text>

                                                <Text style={styles.Product_material}>{item.product_producer}</Text>
                                                <View style={styles.start_wapper}>
                                                    <StarRating rating={Number(item.product_rating)} starSize={20} fullStarColor="orange" />
                                                </View>
                                                <Text style={styles.Product_cost}>Rs.{item.product_cost}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                }
                                onScroll={() => this.showToastWithGravityAndOffset(this.state.ProductList)}
                                ItemSeparatorComponent={this.FlatListItemSeparator}
                                onEndReached={this._handleLoadMore}
                                onEndReachedThreshold={0}
                                initialNumToRender={6}
                                ListFooterComponent={this._renderFooter}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    }
                </View>
            </>
        )
    }
}


// const mapStateToProps = state => ({
//     data: state.productListReducer.data,
//     isFetching: state.productListReducer.isFetching,
//     state: state,
// });

// const mapDispatchToProps = (dispatch) => {
//     return {
//         FetchProductList: (type) => dispatch(FetchProductList(type))
//     };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ProductList)