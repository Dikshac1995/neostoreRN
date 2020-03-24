import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

// import { ss } from '@react-navigation/stack';
import SliderBox1 from '../../Reusable/sliderBox'

import Card from '../../Reusable/card'
// import MyDrawer from '../../drawernav'



  export default class Homescreen extends Component {
     
    render() {
        return (
           <ScrollView>
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
                <View>
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
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Card title="Almirah" name="dungeon"{...this.props} category_id="5d14c15101ae103e6e94fbe0" />
                    </View> 
              </View>
                </View>
        </ScrollView>
        )
    }
}



const styles= StyleSheet.create({
    headerSection: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'red',
        // padding: 10,
        paddingVertical:15,
        paddingHorizontal:15
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