
import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Homescreen from '../Screens/Home/homescreen'
import Icon from 'react-native-vector-icons/FontAwesome5';
// import { Text, View, Image, TouchableOpacity, StyleSheet, Alert, LayoutAnimation, FlatList } from 'react-native'
// import AsyncStorage from '@react-native-community/async-storage';
import CustomDrawerContent from '../Screens/SliderScreen/drawernav'
// import Registration from '../screens/Register/registration';



const Drawer = createDrawerNavigator();

export default class MyDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LoggedIn: false,
        }
    }

    // async getToken() {
    //     let token = await AsyncStorage.getItem('token');
    //     console.log('****************', token)
    //     if (token !== null) {
    //         this.setState({ LoggedIn: true })
    //         console.log("!!!!!!!!!!!!!!!!!!!!!!!!!", this.state.LoggedIn)
    //     }

    // }
    // componentDidMount() {
    //     console.log('dataujfbb')
    //     this.getToken()

    // }
    // componentDidUpdate() {

    // }
    // toggleExpand = () => {
    //     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    //     this.setState({ expanded: !this.state.expanded })
    //     console.warn(this.state.expanded)
    // }

    render() {
        return (
            <Drawer.Navigator drawerContent={props => {
                return <CustomDrawerContent {...props} />;
            }}
                drawerType='slide'
                drawerStyle={{
                    backgroundColor: 'black',
                    width: '80%',
                    activeBackgroundColor: '#eee',
                    inactiveBackgroundColor: 'black'

                }} >

                <Drawer.Screen name="Homescreen" component={Homescreen} labelStyle={{ color: 'black', fontSize: 30, backgroundColor: 'transparent' }}
                    options={{
                        drawerLabel: 'Account',
                        drawerIcon: () => <Icon name="users" size={25} color='red'
                            onPress={() => this.toggleExpand()} />
                    }}
                />


            </Drawer.Navigator>
        );
    }
}