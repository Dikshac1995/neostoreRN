
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
import ActionBar from './acivity'
import AddressList from '../screens/AddressList'
import Root  from './functionstack'
import registration from '../screens/Register/registration';


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

            <Drawer.Navigator drawerContent={props => CustomDrawerContent(props, this.state.LoggedIn)} 
                drawerType='slide' drawerContentOptions={{
                    
                    // activeTintColor: 'red', 
                    itemStyle: { margin: 10 },
                    // inactiveTintColor: 'red',
                 activeBackgroundColor: '#eee',
                    // inactiveBackgroundColor: 'rgba(0,0,0,0)',
                    // width:200,
                    // backgroundColor:'black'
                   
                }}
                drawerStyle={{
                    backgroundColor: 'black',
                    width: 320,
                    activeBackgroundColor:'#eee'
                }} >
                
                <Drawer.Screen name="Homescreen" component={Homescreen} labelStyle={{ color: 'black', fontSize: 30, backgroundColor: 'transparent' }}
                        options={{
                            drawerLabel: 'Account',
                            // backgroundColor: 'black',
                            drawerIcon: () => <Icon name="users" size={25}
                                onPress={() => this.Searchbar()}
                   
                                labelStyle={{ color:'#fff', fontSize: 30 }}

                         />
                        }} />  
                     {/* <Drawer.Screen name="Root" component={Root} /> */}
                
                    {/* <Drawer.Screen name="loginScreen" component={LoginScreen}
                        options={{
                            drawerLabel: 'User Login ',
                        
                            drawerIcon: () => <Icon name="user-alt" size={25}
                                onPress={() => this.Searchbar()}
                            
                            />
                        }} />
                    <Drawer.Screen name="Register" component={registration}
                        options={{
                            drawerLabel: 'User Registration  ',
                            drawerIcon: () => <Icon name="user-plus" size={25}
                                onPress={() => this.Searchbar()}

                            />
                        }} />  */}
                        
                <Drawer.Screen name='Adddress List ' component={AddressList}
                />
            </Drawer.Navigator>
        );
    }
}