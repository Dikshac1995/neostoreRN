import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList, Image } from 'react-native'
import Header from '../../Reusable/header /header';


export default class OrderId extends Component {

    render() {
        const { product_details, order_id } = this.props.route.params;
        console.log(product_details, order_id)


        return (


            <View style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Header name1='arrowleft' text={order_id} name2='search'
                    onPress={() => this.props.navigation.goBack()}
                    onClick={() => this.props.navigation.navigate('searchitem')}
                />



                <View style={{ marginHorizontal: 20 }}>
                    <FlatList data={product_details}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) =>
                            <View >
                                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', padding: 0, alignItems: 'center' }}

                                // { this.props.navigation.navigate('productDetail', { product_id: item.product_id }) }

                                >
                                    <View>
                                        {!item.product_image ? <ActivityIndicator size='large' /> :
                                            <Image style={{ width: 120, height: 100 }} source={{
                                                uri: 'http://180.149.241.208:3022/' + item.product_image
                                            }} />}
                                    </View>
                                    <View style={{ padding: 20, width: 250 }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{((item.product_name).length > 20) ?
                                            (((item.product_name).substring(0, 20 - 3)) + '...') :
                                            item.product_name}
                                        </Text>
                                        <Text style={{ fontSize: 15 }}>({item.product_material})</Text>
                                        <View>
                                            <Text style={{ fontSize: 15, textAlign: 'left' }}>QTY: 1</Text>
                                            <Text style={{ color: 'red', fontSize: 15, fontWeight: 'bold', textAlign: 'right' }}>Rs.{item.product_cost}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>}
                        onScroll={() => this.showToastWithGravityAndOffset()}
                        ItemSeparatorComponent={this.FlatListItemSeparator}

                        keyExtractor={item => item.id} />
                </View>








                {/* <View style={{ justifyContent: 'center', backgroundColor: 'red' }}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text >Rs.500000</Text>
                        <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 5, width: 200, height: 50 }}

                            onPress={this.oderNow}
                        >
                            <Text style={{ justifyContent: "center", color: 'white', fontSize: 20, marginLeft: 50, marginTop: 10 }}>
                                Order Now</Text>
                        </TouchableOpacity>
                    </View></View> */}
            </View>
        )
    }
}
