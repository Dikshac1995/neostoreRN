import React, { Component } from 'react'
import { Text, View, FlatList, ActivityIndicator, Image, RefreshControl } from 'react-native';
import axios from 'axios';

const listData = []

export default class list extends Component {
    constructor(props) {
        super(props);
        this.page = 1;
        this.state = {
            loading: false, // user list loading
            isRefreshing: false, //for pull to refresh
            data: [], //user list
            error: ''
        }
    }

    componentDidMount() {
        this.fetchUser(this.page) //Method for API call
    }
    fetchUser(page) {
        //stackexchange User API url
        const url = `http://180.149.241.208:3022/commonProducts?category_id=5cfe3c65ea821930af69281f&pageNo=${page}&perPage=5`

        this.setState({ loading: true })
        axios.get(url)
            .then(res => {
                console.log('res', res.data.product_details)

                console.log(listData)
                listData.push(res.data.product_details). //concate list with response
                    console.log(listData, '1')
                this.setState({ loading: false, data: data })
            })
            .catch(error => {
                this.setState({ loading: false, error: 'Something just went wrong' })
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
            this.page = this.page + 1; // increase page by 1
            this.fetchUser(this.page); // method for API call 
        }
    };

    onRefresh() {
        this.setState({ isRefreshing: true }); // true isRefreshing flag for enable pull to refresh indicator
        const url = `https://api.stackexchange.com/2.2/users?page=1&order=desc&sort=reputation&site=stackoverflow`;
        axios.get(url)
            .then(res => {
                let data = res.data.items
                this.setState({ isRefreshing: false, data: data }) // false isRefreshing flag for disable pull to refresh indicator, and clear all data and store only first page data
            })
            .catch(error => {
                this.setState({ isRefreshing: false, error: 'Something just went wrong' }) // false isRefreshing flag for disable pull to refresh
            });
    }





    render() {
        console.log(this.state.data, 'data')
        if (this.state.loading && this.page === 1) {
            return <View style={{
                width: '100%',
                height: '100%'
            }}><ActivityIndicator style={{ color: '#000' }} /></View>;
        }
        return (
            <View style={{ width: '100%', height: '100%' }}>
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
                        <View style={{
                            flexDirection: 'row',
                            padding: 15,
                            alignItems: 'center'
                        }}>
                            <Image source={{ uri: item.profile_image }}
                                style={{
                                    height: 50,
                                    width: 50,
                                    marginRight: 10
                                }} />
                            <Text style={{
                                fontSize: 18,
                                alignItems: 'center',
                                color: '#65A7C5',
                            }}>{item.display_name}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListFooterComponent={this.renderFooter.bind(this)}
                    onEndReachedThreshold={0.4}
                    onEndReached={this.handleLoadMore.bind(this)}
                />
            </View>
        );
    }

}

