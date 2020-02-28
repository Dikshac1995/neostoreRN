import React, { Component } from 'react'
import { Text, View ,TouchableOpacity,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { HeaderTitle } from '@react-navigation/stack';
import SliderBox1  from './sliderBox'

export default class Homescreen extends Component {
    render() {
        return (
        <View>
            <View style={styles.headerSection}>
                    <TouchableOpacity onPress = {() => this.props.navigation.navigate('Register')}>
                        <View style = {{backgroundColor:'red',opacity: 0.6,padding: 10}}>
                            <Icon name="bars" size={30} color="#fff" />
                        </View>
                    </TouchableOpacity>
                    <Text style = {styles.headerTitle}>NeoSTORE</Text>
                    <Icon name ="search" size = {30} color= '#fff'></Icon>
              </View>
                <View style= {{height:400}}>
                    < SliderBox1 / >
                 </View>
         </View>
        )
    }
}

const styles = StyleSheet.create({
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
        
    }
})
