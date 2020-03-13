import React, { Component } from 'react'
import { Text, View, Image, FlatList ,ActivityIndicator,ScrollView} from 'react-native'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { styles } from '../../../style/style'
import StarRating from 'react-native-star-rating';
import { TouchableOpacity } from 'react-native-gesture-handler'
import {windowWidth}from '../Constant/constant'

export default class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // isLoading:true,
            ProductData: []
        };
    }

    componentWillMount() {
        const { categoryId } = this.props.route.params;
        return fetch("http://180.149.241.208:3022/commonProducts?"+categoryId +'&pageNo=1&perPage=5')
          // ? category_id = 5cfe3c65ea821930af69281f & pageNo=1 & perPage=5")
            .then(res => res.json())
            .then(response => {
                this.setState({
                    ProductData: response.product_details,
                    // isLoading:false
                });
            })
            .catch(error => {
                console.log(error);
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
    render() {
       
       // console.log(categoryId)
        // if (!this.state.ProductData) {
        //     return (
        //         <ActivityIndicator
        //             animating={true}
        //             style={styles.indicator}
        //             size="large" color='red'
        //         />
        //     );
        // }
        // const ProductList = this.state.ProductData;

        // console.log("product", ProductList)
        // let res = ProductList.map(a => a.category_id);
        // let productImage = ProductList.map(a => a.category_id.product_image);
        // const url = 'http://180.149.241.208:3022/';
        // let PrImage = productImage.map((a) => { return url.concat(a) })
        // console.log("imges0000",PrImage);
        // console.log("prod", res)
        // console.log("productImage",productImage)
   
        return (
            (!this.state.ProductData) ? <ActivityIndicator /> :
             <ScrollView>
                 
              <View style={{ marginHorizontal: 20 }}>
                <FlatList data={this.state.ProductData}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) =>
                        <View >
                            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', padding: 0, alignItems: 'center' }}>
                            <View>
                                <Image style={{ width: 120, height: 100 }} source={{
                                    uri: 'http://180.149.241.208:3022/' + item.product_image}} />
                            </View>
                            <View style={{ padding:20, width: 200 }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.product_name}</Text>
                                <Text style={{ fontSize: 15 }}>{item.product_material}</Text>
                                <View style={{justifyContent:'flex-end',alignItems:'flex-end'}}>
                                 <StarRating rating={item.product_rating} starSize={20} fullStarColor="orange"/>
                                </View>
                                <Text style={{ color: 'red', fontSize: 15, fontWeight: 'bold' }}>Rs.{item.product_cost}</Text>
                             </View>
                            </TouchableOpacity>    
                        </View>}
                            
                    ItemSeparatorComponent={this.FlatListItemSeparator}/>
                <View>
                    {/* <Image source={{uri:PrImage[0]}}></Image> */}
                    {/* <ButtonField text="submit" onPress={() => this.props.navigation.navigate('loginScreen')} /> */}
                </View>
            </View>

         </ScrollView>

        )
    }
}

