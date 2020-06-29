import React, { Component } from 'react'
import { Text, View, FlatList, ActivityIndicator, RefreshControl, Image, Alert } from 'react-native'
import axios from 'axios'
import Header from '../../Reusable/header /header'

const data = []

export default class lazyloading extends Component {
    constructor(props) {
        super(props);
        this.page = 1;
        this.state = {
            loading: true, // user list loading
            isRefreshing: false, //for pull to refresh
            data: [], //user list
            error: '',

        }
    }
    componentDidMount() {
        this.fetchUser(this.page) //Method for API call
    }

    fetchUser(page) {

        console.log(page, "data")

        const url = `http://180.149.241.208:3022/commonProducts?category_id=5cfe3c65ea821930af69281f&pageNo=${page}&perPage=5`

        this.setState({ loading: true })

        fetch(url)
            .then(res => res.json())//response type
            .then(data1 => {
                setTimeout(() => { this.setState({ loading: true }) }, 50000);
                console.log(data1, 'dataaaaaa')
                const data3 = [...this.state.data]
                const data2 = data3.concat(data1.product_details)
                // const resule = data.concat(datares)
                console.log(data3, '-->')
                setTimeout(() => {
                    this.setState({
                        loading: false, data: data2,
                    });
                }, 10000)
            })
            .catch(error => {
                console.log(error);
            });

    }


    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 2,
                    width: '100%',
                    backgroundColor: '#CED0CE'
                }}
            />
        );
    };


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
                this.fetchUser(this.page); // method for API call 
            }
        }
    };

    onRefresh() {
        this.setState({ isRefreshing: true }); // true isRefreshing flag for enable pull to refresh indicator
        const url = `http://180.149.241.208:3022/commonProducts?category_id=5cfe3c65ea821930af69281f&pageNo=1&perPage=8`
        fetch(url)
            .then(res => res.json())//response type
            .then(data1 => {

                this.setState({
                    loading: false,
                    data: data1.product_details,
                    isRefreshing: false,
                });
            })
            .catch(error => {
                console.log(error);
            });
        console.log("data23", this.state.data);
    }
    render() {
        console.log("data", this.state.data)
        if (this.state.loading && this.page === 1) {
            return <View style={{
                width: '100%',
                height: '100%'
            }}><ActivityIndicator style={{ color: '#000' }} /></View>;
        }
        return (
            <View style={{ width: '100%', height: '100%' }}>
                <Header name1='arrowleft' text='Address List ' name2='plus'
                    onPress={() => this.props.navigation.goBack()}
                    onClick={() => this.props.navigation.navigate('AddAddress')}
                />

                <FlatList
                    data={this.state.data}
                    extraData={this.state}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }

                    renderItem={({ item }) => (
                        // <Text> {item.product_name}</Text>
                        <View style={{
                            flexDirection: 'row',
                            padding: 15,
                            alignItems: 'center'
                        }}>
                            <View>
                                <Image style={{ width: 120, height: 100 }} source={{
                                    uri: 'http://180.149.241.208:3022/' + item.product_image
                                }} />
                            </View>
                            <Text style={{
                                fontSize: 18,
                                alignItems: 'center',
                                color: '#65A7C5',
                            }}>{item.product_name}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListFooterComponent={this.renderFooter}
                    onEndReachedThreshold={0.7}
                    onEndReached={this.handleLoadMore()}
                />
            </View>
        );

    }
}
