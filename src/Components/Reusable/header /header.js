import React, { Component } from 'react'
import { Text, View ,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './style'
import Searchbar1 from  '../searchnar/searchbar'
import { ScrollView } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';




export default class Header extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         firstQuery: '',
    //     }
    // }
    press() {
        console.log('on press search');
        <Searchbar
            placeholder="Search"
            // onChangeText={query => { this.setState({ firstQuery: query }); }}
            // value={firstQuery}
        />
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
                <TouchableOpacity onPress={() => this.press()}>
                    <Icon name={this.props.name2} size={30} color='#fff'></Icon>
                    
                        </TouchableOpacity>
                    
                </View >
            </View>   
           
           
        )
    }
}
