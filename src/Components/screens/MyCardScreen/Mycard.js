import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList, Image} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

export default class Mycard extends Component {

    componentDidMount() {
        console.log('mycard')
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

    // storeData = async () => {
    //     try {
    //         await AsyncStorage.setItem('MycardData', this.props.route.parsms);
    //     } catch (error) {
    //         // Error saving data
    //     }
    // };

    retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('MycardData');
            if (value !== null) {
                // We have data!!
                console.log( "dikshs",value);
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    render() {
        const { data } = this.props.route.params;

        console.log("   fish",data)
        return (
            <View>

                <View style={{ marginHorizontal: 20 }}>
                    <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', paddingTop: 10, alignItems: 'center' }}
                        // onPress={() => { this.props.navigation.navigate('productDetail', { product_id: data.product_id }) }}
                    >
                        
                      <Image style={{ width: 120, height: 100 }} source={{
                        uri: 'http://180.149.241.208:3022/' + data.product_image
                        }} />
                       
                        <View style={{ paddingLeft: 20, width: 250 }}>  
                            <Text style={{ fontSize: 25 }}> {((data.product_name).length > 12) ?
                                (((data.product_name).substring(0, 20- 3)) + '...') :
                            data.product_name}</Text>
                             <Text style={{fontSize:20}}>( {data.product_material})</Text>
                             <Text style ={{textAlign:'right',fontSize:20,paddingTop:20}}> Rs. {data.product_cost}</Text>
                            </View>
                 </TouchableOpacity>
                    {/* <FlatList data={data}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) =>
                            <View >
                                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', padding: 0, alignItems: 'center' }}
                                    onPress={() => { this.props.navigation.navigate('productDetail', { product_id: item.product_id }) }}>
                                    <View>
                                        <Image style={{ width: 120, height: 100 }} source={{
                                            uri: 'http://180.149.241.208:3022/' + item.product_image
                                        }} />
                                    </View>
                                    <View style={{ padding: 20, width: 250 }}>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.product_name}</Text>
                                        <Text style={{ fontSize: 15 }}>{item.product_material}</Text>
                                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                            <StarRating rating={item.product_rating} starSize={20} fullStarColor="orange" />
                                        </View>
                                        <Text style={{ color: 'red', fontSize: 15, fontWeight: 'bold' }}>Rs.{item.product_cost}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>}

                        ItemSeparatorComponent={this.FlatListItemSeparator} /> */}
                </View>


            <View style={{
                flex: 1,
                justifyContent: 'flex-end',
                 backgroundColor: 'white',
                paddingTop:420
            }}>
                <View style={{ display: 'flex', flexDirection: 'row',justifyContent:'space-between' ,paddingHorizontal:20,marginBottom:10}}>
                     <Text style={{fontSize:20,padding:10}}>Rs.500000</Text>
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
