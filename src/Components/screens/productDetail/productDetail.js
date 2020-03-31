import React, { Component } from 'react'
import { Text, View, Image, ScrollView, FlatList,TouchableOpacity,Modal,StyleSheet,TouchableHighlight, Alert} from 'react-native'
import { connect } from 'react-redux';
import { FetchProductDetail } from '../../../Redux/Action/productlist'
import StarRating from 'react-native-star-rating';
import { styles } from './style'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Button from '../../Reusable/ButtonField/buttonField'
import { windowWidth, windowHeight } from '../../../Assets/Constant/constant'
import Header from '../../Reusable/header /header'
import AsyncStorage from '@react-native-community/async-storage';
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
        };
    }
    toggleModal(visible) {
        this.setState({ modalVisible: visible });
    }
    componentDidMount() {
        const { product_id } = this.props.route.params;
         console.log("categoryId", product_id)
        let type = 'getProductByProdId/' + product_id
        console.log('type1', type)
        this.props.FetchProductDetail(type);
        const { data } = this.props;
        console.log(this.props.data)
        var subImages_id = data.product_details[0].subImages_id
        this.setState({
            ProductDetailData: data.product_details[0],
            productCategory: data.product_details[0].category_id,
            subImages_id: data.product_details[0].subImages_id
        })
        
    }
    async Buynow() {
        const { product_id } = this.props.route.params;
        let user = await AsyncStorage.getItem('token');
        console.log(user)
        if (user) {
            // this.props.navigation.navigate('placeorder')
            this.props.navigation.navigate('oder summary', { product_id:product_id }) 
        
        }
        else {
            Alert.alert('for purchase any product you hava to login ')
            this.props.navigation.navigate('login')     
        }
    }
    render() {
        console.log("PDwer", this.state.ProductDetailData)
        console.log("j", this.state.ProductDetailData.category_id)

        return (
            (!this.state.ProductDetailData) ? <ActivityIndicator /> :
        <View>
                    {/* <Header name='arrow-left' text='productList' name='serach' /> */}
        <View style={{ width: windowWidth, height: windowHeight }}>
         <ScrollView>
         <View style={styles.productDeatailModule}>
                  {/* ProductDetailInfo Section*/}
                <View style={styles.productDeatailSection1}>    
                    <View style={styles.productDetailSection1_wrapper}>       
                        <Text style={styles.product_name}>{this.state.ProductDetailData.product_name}</Text>
                        <Text style={styles.categogy_name}>Categogy-{this.state.productCategory.category_name}</Text> 
                        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.material_name}>{this.state.ProductDetailData.product_material}</Text>
                            <StarRating rating={this.state.ProductDetailData.product_rating} starSize={20} fullStarColor="orange" />
                        </View>
                    </View>  
                </View>   
                                {/* Product detail Info Section end                */}
                                
                                {/* Product Detail section 2 start  */}
                                                    
            <View style={styles.productDetailSection2}>
                <View style = {styles.productDetailSection2_wapper}>
                     <View style={styles.PDsection2_Price}>
                            <Text style={styles.product_cost}>Rs,{this.state.ProductDetailData.product_cost}</Text>
                            <Icon name="share-alt" size={30} color="#7f7f7f" />
                    </View>
                    <View style={{alignItems:'center'}}>
                            <Image style={{ width: 200, height: 200}} source={{
                            uri: 'http://180.149.241.208:3022/' + this.state.productCategory.product_image
                            }} />
                    </View>
                     <View style ={{alignItems:'flex-end'}}>        
                         <View style={{ display:'flex',backgroundColor: 'blue', borderRadius: 80, width: 60, height: 60 }}>
                            <View style ={{alignItems:'center',paddingTop:10}}>
                                  <Icon name='shopping-cart' size={30} color="#fff" /> 
                            </View>
                        </View>   
                    </View>                     
                    <View>
                         <FlatList data={this.state.subImages_id.product_subImages}
                            showsVerticalScrollIndicator={false}
                            horizontal={true}
                            renderItem={({ item }) =>
                                <View>
                                    <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',padding:10}} onPress={() => { this.props.navigation.navigate('productDetail', { product_id: item.product_id }) }}>
                                        <View style={{ borderWidth:2,borderColor:'grey'}}>
                                            <Image style={{ width: 90, height: 100 }}
                                            source={{uri: 'http://180.149.241.208:3022/' + item}} />
                                         </View>   
                                     </TouchableOpacity>
                                </View>}/>
                        </View>
                 </View>
            </View>   
                 {/* Product Detail section 2 end                     */}
                    {/* Product Description Module start */}
                <View style={{ backgroundColor: '#fff' }}>    
                     <View style ={{paddingHorizontal:20}}>
                        <Text style={styles.Product_description_title}>Description-</Text>
                        <Text style ={{padding:20}}>{this.state.ProductDetailData.product_desc}
                        </Text>
                     </View>
                </View>
                {/* Product Description end              */}
                                
        </View>
        </ScrollView>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly',paddingBottom:30,marginBottom:50}}>
                        <Button text="BUY_NOW" onPress={() => this.Buynow() }  style ={{backgroundColor:'red'}} />
                            <Button text="RATE" onPress={() => this.toggleModal(true) }  />
                    </View>
                    </View>
            <View style={styles1.container}>
                        <Modal animationType={"slide"} transparent={true}
                            visible={this.state.modalVisible}
                            onRequestClose={() => this.toggleModal(false)}>

                        <View style={styles1.modal}>
                           
                                <Text style={styles.product_name}>{this.state.ProductDetailData.product_name}</Text>
                                <Text>{this.state.productCategory.category_name}</Text> 
                                 <View style={{alignItems:'center',margin:20}}>
                            <Image style={{ width: 200, height: 200}} source={{
                            uri: 'http://180.149.241.208:3022/' + this.state.productCategory.product_image
                            }} />
                                </View>
                                <StarRating starSize={30} fullStarColor="orange" />
                            <TouchableHighlight onPress={() => {
                                this.toggleModal(!this.state.modalVisible)
                         }}>
                             
                        <View style ={{borderRadius:10,backgroundColor:'red',paddingBottom:10,marginTop:10,width:290}}>
                              <Text style={styles1.text}>Rate-Now</Text></View>
                            </TouchableHighlight>
                        </View>
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


const styles1 = StyleSheet.create({
    container: {
         width: 50,
    height:50,
      
    //     alignItems: 'center',
    //  backgroundColor: 'red',
        padding:10
    },
    modal: {
        // height:60,
        borderRadius: 10,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 30,
        marginTop: 180,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,

         borderWidth: 3,
       
        borderColor: '#fff',
        borderTopWidth:2,
        borderBottomWidth: 1,
        shadowColor: 'white',
        shadowOffset: { width: 7, height: 5},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 6,
    },
    text: {
        color: '#fff',
        marginTop: 10,
        marginLeft: 70,
        fontSize:30
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(productDetail)