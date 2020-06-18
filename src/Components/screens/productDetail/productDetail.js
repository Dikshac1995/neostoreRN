import React, { Component } from 'react'
import {
    Text, View, Image, ScrollView, FlatList,
    TouchableOpacity, Modal, Dimensions,
    TouchableHighlight, ActivityIndicator, Alert, Share
} from 'react-native'
import StarRating from 'react-native-star-rating';
import { styles } from './style'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Button from '../../Reusable/ButtonField/buttonField'
import { windowWidth, windowHeight, tokenHard } from '../../../Assets/Constant/constant'
import Header from '../../Reusable/header /header'
import AsyncStorage from '@react-native-community/async-storage';
import Search from '../../Reusable/searchnar/search'
import { ThemeProvider } from 'react-native-paper';
import Share1 from 'react-native-share';
import ImageViewer from 'react-native-image-zoom-viewer';
import { api } from '../../../utils/api'
import share from '../../Reusable/share/share'




const myCardItem = [] // for storing data 
class productDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            ProductDetailData: [],
            productCategory: [],
            subImages_id: [],
            modalVisible: false,
            starCount: 0,
            modalShow: false,

            product_id: 0,
            product_image: ' ',
            token: false,
            token_id: ' '

        };
    }

    toggleModal(visible) {
        this.setState({ modalVisible: visible });
    }
    showZoomModal(visible) {
        this.setState({ modalShow: visible });
    }
    componentDidMount() {
        this.gettoken()
        const { product_id } = this.props.route.params;
        console.log("categoryId", product_id)
        const type = 'getProductByProdId/' + product_id

        api.fetchapi('http://180.149.241.208:3022/' + type, 'get')
            .then((response) => response.json()).then((data) => {
                console.log('Success:', data.product_details);

                this.setState({
                    isLoading: false,
                    ProductDetailData: data.product_details[0],
                    subImages_id: data.product_details[0].subImages_id,
                    product_image: data.product_details[0].product_image,
                    product_id: data.product_details[0].product_id,
                    productCategory: data.product_details[0].category_id
                })

            })
    }

    async gettoken() {
        console.log("ingettoken")
        const token = await AsyncStorage.getItem('token');
        if (!token == " ") {
            this.setState({
                token: true,
                token_id: token
            })
        }
    }
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    updateRating() {
        if (this.state.token) {
            console.log('product_id', this.state.product_id)
            const data = {
                product_id: this.state.product_id,

            };
            console.log('data', data)
            const url = 'http://180.149.241.208:3022/updateProductRatingProdId'
            api.fetchapi(url, 'put', JSON.stringify(data), this.state.token_id)

                // fetch(url, {
                //     method: 'put', // or 'PUT'
                //     headers: {
                //         'Content-Type': "application/json",
                //         // 'Content-Type': 'application/x-www-form-urlencoded',
                //         Authorization: token ? 'Bearer ' + token : null
                //     },
                //     body: { "product_id": "5cfe3f0fb4db0f338946eabd" }

                // })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                    if (data.status_code == 200) {
                        Alert.alert('thank you for rating our product');
                        this.setState({ modalVisible: false });
                    }
                    else {
                        Alert.alert(data.message)
                    } this.setState({ modalVisible: false });
                })
                .catch((error) => {
                    console.log('Error:', error);
                });
        }
        else {
            Alert.alert(' for the update product you have to login ');
            this.setState({ modalVisible: false });
        }
    }

    addToCard(data) {
        console.log(';;;;;', data)
        if (this.state.token) {

            Alert.alert(
                'ADD to card ',
                'Do you want to  Add this to Mycard',
                [
                    {
                        text: 'OK', onPress: () => {

                            myCardItem.push(data)
                            console.log('~~~', myCardItem)
                            this.storeData(myCardItem)
                            // this.recivedData()
                            this.props.navigation.navigate('Mycard',
                                { data: this.state.ProductDetailData }
                            )
                            console.log("????????", this.state.cardData)
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
        else {
            Alert.alert(
                'for Add  any product  to cart you need to login ',
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
    storeData = async (data) => {
        const values = this.state.ProductDetailData
        const value = data
        console.log('7777', value)
        try {
            await AsyncStorage.setItem('MycardData', JSON.stringify(values));

        } catch (error) {
            console.log(error)
        }
    };


    async Buynow() {
        console.log("token", this.state.token)
        const { product_id } = this.props.route.params;
        if (this.state.token) {
            this.props.navigation.navigate('oder summary', { product_id: product_id, Product: this.state.ProductDetailData })
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

    onClickSubImage(imageid) {

        this.setState({ product_image: imageid })

    }


    render() {
        const Product_name = this.state.ProductDetailData.product_name
        return (

            <View>
                <Header name1='arrowleft' text={Product_name} name2='search'
                    onPress={() => this.props.navigation.goBack()}
                    onClick={() => this.props.navigation.navigate('searchitem')}
                />
                {(this.state.isLoading) ? <ActivityIndicator size='large' /> :

                    <View style={{ width: windowWidth, height: windowHeight }}>
                        <ScrollView>
                            <View style={styles.productDeatailModule}>
                                {/* ProductDetailInfo Section*/}
                                <View style={styles.productDeatailSection1}>
                                    <View style={styles.productDetailSection1_wrapper}>
                                        <View style={{ width: '80%' }}>
                                            <Text style={styles.product_name}>{this.state.ProductDetailData.product_name}</Text>
                                            <Text style={styles.categogy_name}>Categogy - {this.state.productCategory.category_name}</Text>
                                        </View>
                                        <View style={styles.material_wraper}>
                                            <Text style={styles.material_name}>{this.state.ProductDetailData.product_producer}</Text>
                                            <StarRating rating={this.state.ProductDetailData.product_rating} starSize={20} fullStarColor="orange" />
                                        </View>
                                    </View>
                                </View>
                                {/* Product detail Info Section end */}

                                {/* Product Detail section 2 start  */}

                                <View style={styles.productDetailSection2}>
                                    <View style={styles.productDetailSection2_wapper}>
                                        <View style={styles.PDsection2_Price}>
                                            <Text style={styles.product_cost}>Rs,{this.state.ProductDetailData.product_cost}</Text>
                                            <Icon name="share-alt" size={30} color="#7f7f7f"
                                                onPress={() => share(this.state.product_image, this.state.ProductDetailData.product_name)}
                                            // {() => Share1.open(shareOptions)}
                                            // {() => this.onShare()}
                                            />
                                        </View>
                                        <View style={{ position: 'relative' }}>
                                            <View style={{ alignItems: 'center' }}>
                                                <TouchableOpacity onPress={() => this.showZoomModal(true)}  >
                                                    <Image style={{ width: 220, height: 160 }} source={{
                                                        uri: api.baseUrl + this.state.product_image
                                                    }} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.mycart_WrapperContainer}>
                                                <View style={styles.mycart_Wrapper}>
                                                    <View style={styles.mycart_icon}>
                                                        <Icon name='shopping-cart' size={27} color="#fff"
                                                            onPress={() => this.addToCard(this.state.ProductDetailData)}
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
                                                        <TouchableOpacity style={styles.subImage_Container} onPress=
                                                            {() => this.onClickSubImage(item)}>
                                                            <View style={styles.subImage_Wrapper}>
                                                                <Image style={{ width: 90, height: 100 }}
                                                                    source={{ uri: api.baseUrl + item }} />
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
                                        <Text style={styles.Product_description}>{this.state.ProductDetailData.product_desc}
                                        </Text>
                                    </View>
                                </View>

                                {/* Product Description end */}

                            </View>
                        </ScrollView>

                        <View style={styles.footer}>
                            <Button text="BUY_NOW" onPress={() => this.Buynow()} style={styles.buttonStyle} />
                            <Button text="RATE" onPress={() => this.toggleModal(true)} style={styles.rate_button} />
                        </View>
                    </View>}

                <View style={styles.container}>
                    <Modal animationType={"slide"} transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => this.toggleModal(false)}>
                        <View style={styles.modal}>
                            <Text style={styles.product_name}>
                                {Product_name}
                                {/* {(((Product_name).length) > 20) ?
                                    (((Product_name).substring(0, 20 - 3)) + '...') :
                                    Product_name} */}
                            </Text>
                            <Text>{this.state.productCategory.category_name}</Text>
                            <View style={{ alignItems: 'center', margin: 20 }}>
                                <Image style={{ width: 200, height: 200 }} source={{
                                    uri: api.baseUrl +
                                        this.state.ProductDetailData.product_image
                                }} />
                            </View>
                            <StarRating starSize={30} fullStarColor="orange" disabled={false}
                                maxStars={5}
                                rating={this.state.starCount}
                                selectedStar={(rating) => this.onStarRatingPress(rating)} />
                            <TouchableHighlight onPress={() => {
                                // this.toggleModal(!this.state.modalVisible)
                                this.updateRating();
                            }}>
                                <View style={{ borderRadius: 10, backgroundColor: 'red', paddingBottom: 10, marginTop: 10, width: 290 }}>
                                    <Text style={styles.text}>Rate-Now</Text></View>
                            </TouchableHighlight>
                        </View>
                    </Modal>
                </View>


                {/* Model for zoom Imageviwer */}
                <View >
                    <Modal visible={this.state.modalShow} transparent={true} onRequestClose={() => this.showZoomModal(false)}>

                        <ImageViewer imageUrls={
                            [{
                                url: api.baseUrl + this.state.product_image
                            }]} />


                    </Modal>
                </View>
            </View>
        )
    }
}


export default productDetail