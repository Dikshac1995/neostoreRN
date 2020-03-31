
import React,{ Component } from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Homescreen from '../screens/Home/homescreen'
import LoginScreen from '../screens/Login/login'
import Icon from 'react-native-vector-icons/FontAwesome5';
import MyAccount from '../screens/MyAccount/index'
import Mycard from '../screens/MyCardScreen/Mycard'
import { Text, View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import CustomDrawerContent from './drawernav'

const Drawer = createDrawerNavigator();

export default class MyDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LoggedIn: false
        }
    }

    async getToken() {
        let token = await AsyncStorage.getItem('token');
        console.log('****************', token)
        if (token !== null) {
            this.setState({ LoggedIn: true })
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!", this.state.LoggedIn)
        }

    }
    componentDidMount() {

        this.getToken()

    }
    render() {
        return (

            <Drawer.Navigator drawerContent={props => CustomDrawerContent(props, this.state.LoggedIn)} drawerType='slide'  >

                <Drawer.Screen name="Homescreen" component={Homescreen} />
                <Drawer.Screen name="loginScreen" component={LoginScreen} />
                <Drawer.Screen name="MyAccount" component={MyAccount} />
            </Drawer.Navigator>
        );
    }
}