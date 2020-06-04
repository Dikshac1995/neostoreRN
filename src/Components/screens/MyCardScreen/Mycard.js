import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList, Image, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../../Reusable/header /header'



const myCardProduct = []
export default class Mycard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myCardItem: []
        }

    }

    componentDidMount() {
        console.log('mycard')
        // const { data } = this.props.route.params;
        // this.setState({ myCardItem:data })
        console.log(this.state.myCardItem, 'ddddjjjj')
        this.retrieveData()

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
    removeProduct(id) {
        console.log('+++', id)
        Alert.alert(
            'Remove from card ',
            'Do you want to Remove this Product from Mycard',
            [
                {
                    text: 'OK', onPress: async () => {
                        // Alert.alert(id)
                        myCardProduct.splice(id, 1);
                        await AsyncStorage.setItem("MycardData", JSON.stringify(myCardProduct))
                        this.setState({ myCardItem: JSON.parse(await AsyncStorage.getItem("MycardData")) })



                        // card_dataItem.push(data)
                        // console.log('~~~', card_dataItem)
                        // this.storeData(card_dataItem)
                        // // this.recivedData()
                        // this.props.navigation.navigate('Mycard',
                        //     // { data: this.state.ProductDetailData }
                        // )
                        console.log("????????")
                    }
                },
                {
                    text: 'cancle', onPress: () => {
                        return null
                    }
                },
            ],
            { cancelable: false }
        )

    }

    // storeData = async () => {
    //     try {
    //         await AsyncStorage.setItem('MycardData', this.props.route.parsms);
    //     } catch (error) {
    //         // Error saving data
    //     }
    // };

    retrieveData = async () => {


        // console.log("$$$####^^^^",products)
        try {
            const existingProduct = await AsyncStorage.getItem('MycardData')
            console.log('...', existingProduct)
            console.log('   ', this.state.myCardItem)
            let newProduct = JSON.parse(existingProduct);
            console.log("&&", newProduct)

            if (!newProduct) {
                newProduct = null
            }
            myCardProduct.push(newProduct)
            console.log("myCardProduct", myCardProduct)
            await AsyncStorage.setItem('MycardData', JSON.stringify(myCardProduct))
            this.setState({ myCardItem: JSON.parse(await AsyncStorage.getItem("MycardData")) })


            // console.log('hello', products)
            // console.log('h1', this.state.myCardItem)
            // var value = this.state.myCardItem.concat(newProduct);
            // var value1 = this.state.myCardItem.push(newProduct);


            // console.log('hello1', value1)
            // this.setState({ myCardItem: value })
            console.log('AAAAAAAAAAAAAAAAAAAa', this.state.myCardItem)


            // if (value !== null) {
            //     // We have data!!
            //     console.log("dikshs", value);
            //     this.setState({ myCardItem: value })
            //     console.log('//',this.state.myCardItem)
            // }
        } catch (error) {
            // Error retrieving data
        }
    };

    render() {
        // const { data } = this.props.route.params;

        const data = this.state.myCardItem

        console.log("   fish", data)
        return (
            <View>
                <Header name1='arrowleft' text='My Cards' name2='search'
                    onPress={() => this.props.navigation.goBack()}
                    onClick={() => this.props.navigation.navigate('share')}
                />
                <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                    {/* <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', paddingTop: 10, alignItems: 'center' }}
                    onPress={() => { this.props.navigation.navigate('productDetail', { product_id: data.product_id }) }}
                    >
                        
                      <Image style={{ width: 120, height: 100 }} source={{
                        uri: 'http://180.149.241.208:3022/' + data.product_image
                        }} />
                       
                        <View style={{ paddingLeft: 20, width: 250 }}>  
                            <Text style={{ fontSize: 20}}> {
                                // ((data.product_name).length > 12) ?
                                // (((data.product_name).substring(0, 20- 3)) + '...') :
                            data.product_name}</Text>
                             <Text style={{fontSize:20}}>({data.product_material})</Text>
                             <Text style ={{textAlign:'right',fontSize:20,paddingTop:20}}> Rs. {data.product_cost}</Text>
                            </View>
                 </TouchableOpacity> */}

                    <FlatList data={myCardProduct}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) =>
                            <View >
                                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', padding: 0, alignItems: 'center' }}
                                    // onPress={() => { this.props.navigation.navigate('productDetail', { product_id: item.product_id }) }}
                                    onPress={() => this.removeProduct(data.indexOf(item))}
                                >
                                    <View>
                                        <Image style={{ width: 120, height: 100 }} source={{
                                            uri: 'http://180.149.241.208:3022/' + item.product_image
                                        }} />
                                    </View>
                                    <View style={{ padding: 20, width: 250 }}>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.product_name}</Text>
                                        <Text style={{ fontSize: 15 }}>({item.product_material})</Text>
                                        {/* <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                            <StarRating rating={item.product_rating} starSize={20} fullStarColor="orange" />
                                        </View> */}
                                        <Text style={{ textAlign: 'right', fontSize: 15, fontWeight: 'bold' }}>Rs.{item.product_cost}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>}

                        ItemSeparatorComponent={this.FlatListItemSeparator} />
                </View>


                <View style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    backgroundColor: 'white',
                    paddingTop: 420
                }}>
                    <View style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                        paddingHorizontal: 20, marginBottom: 10
                    }}>
                        <View><Text> Rs, 4000</Text></View>
                        <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 5, width: 200, height: 50 }}

                            onPress={this.oderNow}
                        >
                            <Text style={{ justifyContent: "center", color: 'white', fontSize: 20, marginLeft: 50, marginTop: 10 }}>
                                Order Now</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
            // <View style ={{display:'flex',justifyContent:'flex-end'}}>
            //     <Text> textInComponent </Text>
            //     <View style={{justifyContent:'center',backgroundColor:'red'}}>
            //     <View style ={{display:'flex',flexDirection:'row'}}>
            //         <Text>Rs.500000</Text>
            //         <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 5, width: 200, height: 50 }}

            //             onPress={this.oderNow}
            //         >
            //             <Text style={{ justifyContent: "center", color: 'white', fontSize: 20, marginLeft: 50, marginTop: 10 }}>
            //                 Order Now</Text>
            //         </TouchableOpacity>
            //         </View></View>
            // </View>
        )
    }
}
