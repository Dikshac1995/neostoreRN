import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntIcon from 'react-native-vector-icons/AntDesign';

import { styles } from './style'
import Searchbar1 from '../searchnar/searchbar'
import { ScrollView } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';




export default class Header extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         firstQuery: '',
    //     }
    // }
    press() {
        console.log('on press search');
        // <Animatable.View animation="slideInRight" duration={500} style={{width:50}}>
        // <Searchbar
        //         placeholder="Search"
        //         width={60} 
        //         tintColor="white"
        //     // onChangeText={query => { this.setState({ firstQuery: query }); }}
        //     // value={firstQuery}
        //     />
        //     </Animatable.View>
    }
    render() {
        const text = this.props.text
        return (
            <View style={styles.header}>
                <View style={styles.headerSection}>

                    <TouchableOpacity onPress={this.props.onPress ? () => this.props.onPress() : null}  >

                        <AntIcon name={this.props.name1} size={30} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode='head'>{
                        // ((text).length > 20) ?
                        //     (((text).substring(0, 20 - 3)) + '...') :
                        text}
                    </Text>
                    <TouchableOpacity >
                        <Icon name={this.props.name2} size={30} color='#fff'
                            // onPress={()=>this.props.navigation.navigate('searchitem')}
                            onPress={this.props.onClick ? () => this.props.onClick() : null}
                        ></Icon>

                    </TouchableOpacity>

                </View >
                <TouchableOpacity
                    onPress={() => this.press()}
                >
                    {/* <Icon name={this.props.name2} size={30} ></Icon> */}

                </TouchableOpacity>
            </View>


        )
    }
}
