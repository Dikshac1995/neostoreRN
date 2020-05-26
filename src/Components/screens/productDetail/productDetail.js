import React, { Component } from 'react'
import {
    Text, View, Image, ScrollView, FlatList,
    TouchableOpacity, Modal, StyleSheet,Dimensions,
    TouchableHighlight, ActivityIndicator, Alert, Share
} from 'react-native'
import { connect } from 'react-redux';
import { FetchProductDetail } from '../../../Redux/Action/productlist'
import StarRating from 'react-native-star-rating';
import { styles } from './style'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Card } from 'react-native-elements';
import Button from '../../Reusable/ButtonField/buttonField'
import { windowWidth, windowHeight, tokenHard } from '../../../Assets/Constant/constant'
import Header from '../../Reusable/header /header'
import AsyncStorage from '@react-native-community/async-storage';
import share from '../../Reusable/share'
import Search from '../../Reusable/searchnar/search'
import { ThemeProvider } from 'react-native-paper';
import images from '../../Reusable/share/image';
import ImageViwer from 'react-native-image-pan-zoom';

import ImageViewer from 'react-native-image-zoom-viewer';

// import {tokenHard} from '../../../Assets/Constant'

// import  Model  from '../../Reusable/ProductRateModel/productrates'
// import ModalTester from '../../Reusable/ProductRateModel/productrate'


class productDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // isLoading:true,
            ProductDetailData: [],
            productCategory: [],
            subImages_id: [],
            modalVisible: false,
            starCount: 0,
            modalShow: false,
            
            product_id: '',
            product_image:' '

        };
    }
    toggleModal(visible) {
        this.setState({ modalVisible: visible });
    }
    showZoomModal(visible) {
        this.setState({ modalShow: visible });
    }

    componentWillMount() {
        const { product_id } = this.props.route.params;
         console.log("categoryId", product_id)
        let type = 'getProductByProdId/' + product_id
        console.log('type1', type)
        this.props.FetchProductDetail(type);
        const { data } = this.props;
        console.log("data3",this.props.data)
        var subImages_id = data.product_details[0].subImages_id
        this.setState({
            ProductDetailData: data.product_details[0],
            productCategory: data.product_details[0].category_id,
            subImages_id: data.product_details[0].subImages_id,
            product_id: product_id,
            product_image: data.product_details[0].product_image,
        })
        
    }
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }


    updateRating() {
        // const { token } = this.state;
        // console.log('update rating', token);
        const data = {
            product_id: this.state.product_id,
            product_rating: this.state.starCount,
        };
        console.log('data',data)
        var url = 'http://180.149.241.208:3022/updateProductRatingProdId'
   console.log("in fet")
        fetch(url,{
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            
        }) 
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                if (data.status_code == 200) {
                    Alert.alert('thank you for rating our product');
                    
                }
                else {
                    Alert.alert(data.message)
                } this.setState({ modalVisible: false });
            })
            .catch((error) => {
                console.log('Error:', error);
            });

    }
    
    addToCard() {
        Alert.alert(
             'ADD to card ',
            'Do you want to  Add this to Mycard',
            [
                {
                    text: 'OK', onPress: () => {
                        this.storeData()
                        this.props.navigation.navigate('Mycard', { data: this.state.ProductDetailData })
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
    storeData = async () => {
        try {
            await AsyncStorage.setItem('MycardData', this.state,ProductDetailData);
        } catch (error) {
            // Error saving data
        }
    };


    async Buynow() {
        const { product_id } = this.props.route.params;
        // let user = await AsyncStorage.getItem('token');
        let user = tokenHard;
        console.log(user)
        if (user) {
            // this.props.navigation.navigate('placeorder')
            this.props.navigation.navigate('oder summary', { product_id:product_id }) 
        
        }
        else {
            Alert.alert(
                'for purchase any product you need to login ',
                'Do you want to Login?',
                [
                    { text: 'No', onPress: () => { return null } },
                    {
                        text: 'YES', onPress: () => {
                        this.props.navigation.navigate('loginScreen')
                        }
                    },
                ],
                { cancelable: false }
            )
        }
        
    }

    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'React Native ',
                title: 'Neistire latest product',
                // url: 'www.google.com',
               url: 'https://www.itl.cat/wallview/hbTxJw_download-wallpaper-love-nature-wallpaper-hd-for-mobile/'
                // urls: [images.image1, images.image2],

            },);

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    onClickSubImage(imageid) {
        console.warn(imageid);
        this.setState({product_image:imageid})
        // console.log(imageid)
    }

    
    render() {
        console.log("pr-image",this.state.product_image)
        console.log("PDwer", this.state.ProductDetailData)
        console.log("j", this.state.ProductDetailData.category_id)
        const Product_name = this.state.ProductDetailData.product_name
        console.log(Product_name,"productname")
        return (
            
           
        <View>
                    <Header name1='arrowleft' text={this.state.ProductDetailData.product_name} name2='search'
                        onPress={() => this.props.navigation.goBack()}
                        onClick={() => this.props.navigation.navigate('share')}
                    />
                <View style={{ width: windowWidth, height: windowHeight }}>
                    {(!Product_name) ? <ActivityIndicator  size='large' /> :
                        <ScrollView>
                            <View style={styles.productDeatailModule}>
                                {/* ProductDetailInfo Section*/}
                                <View style={styles.productDeatailSection1}>
                                    <View style={styles.productDetailSection1_wrapper}>
                                        <Text style={styles.product_name}>{this.state.ProductDetailData.product_name}</Text>
                                        <Text style={styles.categogy_name}>Categogy-{this.state.productCategory.category_name}</Text>
                                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={styles.material_name}>{this.state.ProductDetailData.product_material}</Text>
                                            <StarRating rating={this.state.ProductDetailData.product_rating} starSize={20} fullStarColor="orange" />
                                        </View>
                                    </View>
                                </View>
                                {/* Product detail Info Section end                */}
                                
                                {/* Product Detail section 2 start  */}
                                                    
                                <View style={styles.productDetailSection2}>
                                    <View style={styles.productDetailSection2_wapper}>
                                        <View style={styles.PDsection2_Price}>
                                            <Text style={styles.product_cost}>Rs,{this.state.ProductDetailData.product_cost}</Text>
                                            {/* <Icon name="share-alt" size={30} color="#7f7f7f" onPress={() => this.showModal(true) }/> */}
                                            <Icon name="share-alt" size={30} color="#7f7f7f" onPress={() => this.onShare()} />

                                        </View>
                                        <View style={{ position: 'relative' }}>
                                            <View style={{ alignItems: 'center' }}>
                                                <TouchableOpacity onPress={() => this.showZoomModal(true)}  >
                                                    <Image style={{ width: 200, height: 200 }} source={{
                                                        uri: 'http://180.149.241.208:3022/' + this.state.product_image
                                                    }} />
                                                </TouchableOpacity>
                                            </View>
                        
                                       
                                            <View style={{ alignItems: 'flex-end', position: 'absolute' }}>
                                                <View style={{ display: 'flex', backgroundColor: 'blue', borderRadius: 80, width: 60, height: 60, top: 140, left: 270 }}>
                                                    <View style={{ alignItems: 'center', paddingTop: 10 }}>
                                                        <Icon name='shopping-cart' size={30} color="#fff"
                                                            onPress={() => this.addToCard()}
                                                        // this.props.navigation.navigate('Mycard')}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <View>
                                            <FlatList data={this.state.subImages_id.product_subImages}
                                                showsVerticalScrollIndicator={false}
                                                horizontal={true}
                                                renderItem={({ item }) =>
                                                    <View>
                                                        <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 10 }} onPress=
                                                            // {() => { this.props.navigation.navigate('productDetail', { product_id: item.product_id }) }}
                                                            {() => this.onClickSubImage(item)}
                                                        >
                                                            <View style={{ borderWidth: 2, borderColor: 'grey' }}>
                                                                <Image style={{ width: 90, height: 100 }}
                                                                    source={{ uri: 'http://180.149.241.208:3022/' + item }} />
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>} />
                                        </View>
                                    </View>
                                </View>
                                {/* Product Detail section 2 end                     */}
                                {/* Product Description Module start */}
                                <View style={{ backgroundColor: '#fff' }}>
                                    <View style={{ paddingHorizontal: 20 }}>
                                        <Text style={styles.Product_description_title}>Description-</Text>
                                        <Text style={{ padding: 10, fontSize: 18, color: '#333333' }}>{this.state.ProductDetailData.product_desc}
                                        </Text>
                                    </View>
                                </View>
                                
                                {/* Product Description end              */}
                                
                            </View>
                        </ScrollView>}
         <View style={styles.footer}>
            <Button text="BUY_NOW" onPress={() => this.Buynow() }  style ={styles.buttonStyle} />
            <Button text="RATE" onPress={() => this.toggleModal(true)} style={styles.rate_button}  />
        </View>
     </View>
         <View style={styles.container}>
            <Modal animationType={"slide"} transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => this.toggleModal(false)}>
             <View style={styles.modal}>
                                <Text style={styles.product_name}>
                                    {/* {this.state.ProductDetailData.product_name} */}
                                    {Product_name}
                                    {/* {(((Product_name).length) > 20) ?
                                        (((Product_name).substring(0, 20 - 3)) + '...') :
                                        Product_name} */}
                                </Text>
                   <Text>{this.state.productCategory.category_name}</Text> 
                   <View style={{alignItems:'center',margin:20}}>
                     <Image style={{ width: 200, height: 200}} source={{
                        uri: 'http://180.149.241.208:3022/' + this.state.productCategory.product_image
                    }} />
                  </View>
                <StarRating starSize={30} fullStarColor="orange" disabled={false}
                     maxStars={5}
                     rating={this.state.starCount}
                   selectedStar={(rating) => this.onStarRatingPress(rating)}/>
                 <TouchableHighlight onPress={() => {
                                    // this.toggleModal(!this.state.modalVisible)
                                    this.updateRating();
             }}>
                 <View style ={{borderRadius:10,backgroundColor:'red',paddingBottom:10,marginTop:10,width:290}}>
                     <Text style={styles.text}>Rate-Now</Text></View>
                </TouchableHighlight>
            </View>
        </Modal>
                    </View>
                    <View >
                        <Modal visible={this.state.modalShow} transparent={true} onRequestClose={() => this.showZoomModal(false)}>
                           
                            <ImageViewer imageUrls={
                                [{
                                    url: 'http://180.149.241.208:3022/' + this.state.product_image
                                }]}  /> 
                            
                            
                        </Modal>
                    </View>
    </View>
    )
    }
}
const mapStateToProps = state => ({
    data: state.productListReducer.data,
    isFetching: state.productListReducer.isFetching,
    state: state,
});

const mapDispatchToProps = (dispatch) => {
    return {
        FetchProductDetail: (type) => dispatch(FetchProductDetail(type))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(productDetail)