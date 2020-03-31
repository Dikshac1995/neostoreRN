import React, { Component } from 'react'
import { Text, View ,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './style'
import Searchbar1 from  '../searchnar/searchbar'
import { ScrollView } from 'react-native-gesture-handler';



export default class Header extends Component {
    press() {
        <Searchbar1/>
    }
    render() {
        return (
         <View style ={styles.header}>
                <View style={styles.headerSection}>
        
                    <TouchableOpacity onPress={
                    () => props.navigatation.navigate('Homescreen')}>
                 {/* onPress={() => this.props.navigation.navigate('productList', { category_id: this.props.category_id })}>                    */}
                    <Icon name={this.props.name1} size={30} color="#fff" />
             </TouchableOpacity>
                <Text style={styles.headerTitle}>{this.props.text}</Text>
                <TouchableOpacity onClick={() => this.press()}>
                    <Icon name={this.props.name2} size={30} color='#fff'></Icon>
                    
                        </TouchableOpacity>
                    
                </View >
            </View>   
           
           
        )
    }
}
