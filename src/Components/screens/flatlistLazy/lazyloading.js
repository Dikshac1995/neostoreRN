import React, { Component } from 'react'
import { Text, View ,FlatList,ActivityIndicator,RefreshControl,Image,Alert} from 'react-native'
import axios from 'axios'

export default class lazyloading extends Component {
    constructor(props) {
        super(props);
        this.perpage = 4;
        this.state = {
            loading: false, // user list loading
            isRefreshing: false, //for pull to refresh
            data: [], //user list
            error: ''
        }
    }
    componentDidMount() {
        this.fetchUser(this.perpage) //Method for API call
    }

    fetchUser(perpage) {
        const pageNo = perpage
        console.log(pageNo)
        const url = `http://180.149.241.208:3022/commonProducts?category_id=5cfe3c65ea821930af69281f&pageNo=1&perPage=${pageNo}`
        fetch(url)
            .then(res => res.json())//response type
            .then(data1 => {
                this.setState({
                    loading: false,
                    data: data1.product_details,
                });
            })
            .catch(error => {
                console.log(error);
            });
        console.log("data23", this.state.data);
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
        console.warn("load")
        if (!this.state.loading) {
            this.perpage = this.perpage + 8; // increase page by 1
            if (this.perpage <= 40) {
                this.fetchUser(this.perpage); // method for API call 
            }
            else {
                Alert.alert('you reach to amximum available product ')
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
                });
            })
            .catch(error => {
                console.log(error);
            });
        console.log("data23", this.state.data);
    }
    render() {
        console.log(this.state.data,'##')
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
                    ListFooterComponent={this.renderFooter.bind(this)}
                    onEndReachedThreshold={0.4}
                    onEndReached={this.handleLoadMore.bind(this)}
                />
            </View>
        );
    
    }
}
