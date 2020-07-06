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
    showToastWithGravityAndOffset = () => {
        console.log('tost')
        ToastAndroid.showWithGravityAndOffset(
            " 5 out of 8 ",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,


        );
    };
    componentDidMount() {
        // this.fetchdata(this.page)
        this.fetchProductList(this.page)
    }

    fetchProductList() {
        const { category_id } = this.props.route.params;
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
                }, 5000)
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
                        // position: 'relative',
                        flex: 1,

                        height: 50,
                        paddingVertical: 20,
                        borderTopWidth: 1,
                        marginTop: 10,
                        marginBottom: 10,
                        // backgroundColor: 'blue'

                    }}
                >
                    <ActivityIndicator animating size="large" />
                </View>
            );
        }
        else {
            console.log('loader1')
            return null
        }
    };


    _handleLoadMore = () => {
        if (!this.state.loading) {


            if (this.state.page < 2) {
                // setTimeout(() => {
                this.setState(
                    (prevState, nextProps) => ({
                        page: prevState.page + 1,
                        loading: true
                    }),
                    () => {
                        this.fetchProductList();
                    }
                )
                // }, 5000)
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
                        // <View style={styles.loading}>
                        //     <View>
                        //         <ActivityIndicator size='large' />
                        //     </View>
                        // </View>

                        :
                        <View style={{ marginHorizontal: 20 }}>
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
                                        <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', padding: 0, alignItems: 'center' }}
                                            onPress={() => this.onPressItem(item.product_id, item.product_name)
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
                                                    ((item.product_name).length > 20) ?
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
                                    </View>
                                }
                                onScroll={() => this.showToastWithGravityAndOffset()}
                                ItemSeparatorComponent={this.FlatListItemSeparator}
                                onEndReached={this._handleLoadMore}
                                onEndReachedThreshold={0}
                                initialNumToRender={6}
                                ListFooterComponent={this._renderFooter}
                                keyExtractor={item => item.id} />
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