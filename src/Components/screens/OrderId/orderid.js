import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native'
import Header from '../../Reusable/header /header';
import { styles } from './styles'


export default class OrderId extends Component {

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 2,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    }

    render() {
        const { product_details, order_id } = this.props.route.params;
        const cost = product_details.map((e) => e.total_productCost)
        const total_cost = cost.map(Number);
        var total = total_cost.reduce(function (a, b) { return a + b; }, 0);

        return (
            <View >
                <Header name1='arrowleft' text={order_id} name2='search'
                    onPress={() => this.props.navigation.goBack()}
                    onClick={() => this.props.navigation.navigate('searchitem')}
                />
                <View style={styles.orderId_container}>
                    <FlatList data={product_details}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) =>
                            <View >
                                <TouchableOpacity style={styles.orderId_wrapper}>
                                    <View>
                                        {!item.product_details[0].product_image ? <ActivityIndicator size='large' /> :
                                            <Image style={{ width: 120, height: 100 }} source={{
                                                uri: 'http://180.149.241.208:3022/' + item.product_details[0].product_image
                                            }} />}
                                    </View>
                                    <View style={{ padding: 20, width: 250 }}>
                                        <Text style={styles.product_name}>{
                                            ((item.product_details[0].product_name).length > 20) ?
                                                (((item.product_details[0].product_name).substring(0, 20 - 3)) + '...') :
                                                item.product_details[0].product_name}
                                        </Text>
                                        <Text style={styles.product_material}>({item.product_details[0].product_material})</Text>
                                        <View>
                                            <Text style={styles.product_quantity}>QTY:{item.quantity} </Text>
                                            <Text style={styles.product_cost}>Rs.{item.total_productCost}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>}
                        onScroll={() => this.showToastWithGravityAndOffset()}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        keyExtractor={item => item.id} />
                </View>

                <View >
                    <View style={styles.footer_wrapper}>
                        <Text style={styles.footer_text} >Total</Text>
                        <Text style={styles.footer_text}>
                            Rs. {total}</Text>

                    </View>
                </View>
            </View>
        )
    }
}
