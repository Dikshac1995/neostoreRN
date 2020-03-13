import React, { Component } from 'react'
import { Text, View ,TouchableOpacity,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

import { HeaderTitle } from '@react-navigation/stack';
import SliderBox1 from './sliderBox'
import Card from './card'
import MyDrawer from '../../drawernav'
// import { styles } from '../../../style/style'
// import { connect } from 'react-redux';
// import { changeCount } from '../../../Redux/Action/productlist';
// import { bindActionCreators } from 'redux';


  export default class Homescreen extends Component {
     
    render() {
        return (
        <View>
            <View style={styles.headerSection}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.openDrawer()
                        //this.props.navigation.navigate('Register')
                        console.log('counter :', this.props)
                        console.log('counter :', this.props.count)
                        console.log('imageReducer :', this.props.image)
                    }
                    }>
                    <View style = {{backgroundColor:'red',opacity: 0.6,padding: 10}}>
                        <Icon name="bars" size={30} color="#fff" />
                    </View>
                    </TouchableOpacity>
                    <Text style = {styles.headerTitle}>NeoSTORE</Text>
                    <Icon name ="search" size = {30} color= '#fff'></Icon>
              </View>
                <View style= {{height:200}}>
                    <SliderBox1 />
                </View>
                <View style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <View style={{ flexDirection: 'row', justifyContent:'center' }} >
                        <Card title="sofa" name="couch" {...this.props}  category_name="sofa" category_id="5cfe3c5aea821930af69281e"/>
                        <Card title="bed" name="bed" {...this.props} category_id="5cfe3c65ea821930af69281f"/>
                </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Card title="chair" name="chair" {...this.props} category_id="5cfe3c6fea821930af692820"/>
                        <Card title="Table" name="table"{...this.props} category_id="5cfe3c79ea821930af692821"/>
                </View>
            </View>       
         </View>
        )
    }
}



const styles= StyleSheet.create({
    headerSection: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'red',
        padding:10
    },
    headerTitle: {
        fontSize: 30,
        color:'white'
        
    },
    
})
 
// const mapStateToProps = state => ({
//     count: state.count,
//     stat: state,
//     image: state.imageReducer
// });
// const mapDispatchToProps = dispatch => ({
    
  
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Homescreen)