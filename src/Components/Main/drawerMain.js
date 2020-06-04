
import React,{ Component } from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Homescreen from '../screens/Home/homescreen'
import LoginScreen from '../screens/Login/login'
import Icon from 'react-native-vector-icons/FontAwesome5';
import MyAccount from '../screens/MyAccount/index'
import Mycard from '../screens/MyCardScreen/Mycard'
import { Text, View, Image, TouchableOpacity, StyleSheet, Alert ,LayoutAnimation,FlatList} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import CustomDrawerContent from './drawernav'
import ActionBar from './acivity'
import AddressList from '../screens/AddressList'
import Root  from './functionstack'
import Registration from '../screens/Register/registration';
import lazyLoading from '../screens/flatlistLazy/lazyloading'
import Sidebar from './slider'


const Drawer = createDrawerNavigator();

export default class MyDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LoggedIn: false,

            expanded: false,
            
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
    toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded })
        console.warn (this.state.expanded)
    }

    render() {
        return (

            <Drawer.Navigator drawerContent={props => {
                return <CustomDrawerContent {...props} />;
            }}
                drawerType='slide'
                drawerStyle={{
                    backgroundColor: 'black',
                    width: 320,
                    activeBackgroundColor: '#eee',
                    inactiveBackgroundColor: 'black'
                  
                }} >
                {!this.state.LoggedIn ?
                    <Drawer.Screen name="Homescreen" component={Homescreen} labelStyle={{ color: 'black', fontSize: 30, backgroundColor: 'transparent' }}
                        options={{
                            drawerLabel: 'Account',
                            drawerIcon: () => <Icon name="users" size={25} color='red'
                                               onPress={() => this.toggleExpand()}/>
                        }}
                    />
                    // //  {/* <Drawer.Screen name="Root" component={Root} /> */}
                
                    // {/* <Drawer.Screen name="loginScreen" component={LoginScreen}
                    //     options={{
                    //         drawerLabel: 'User Login ',
                        
                    //         drawerIcon: () => <Icon name="user-alt" size={25}
                    //             onPress={() => this.Searchbar()}
                            
                    //         />
                    //     }} />
                    // <Drawer.Screen name="Register" component={registration}
                    //     options={{
                    //         drawerLabel: 'User Registration  ',
                    //         drawerIcon: () => <Icon name="user-plus" size={25}
                    //             onPress={() => this.Searchbar()}

                    //         />
                    //     }} />  */}
                        
                    : null}
                    {/* <Drawer.Screen name='Adddresslist' component={AddressList}
                    />} */}
                
                
                    {this.state.expanded &&
                    
                    <Drawer.Screen name='Register' component={Registration}
                        // labelStyle={{ color: '#fff' }}
                        // drawerContent={{ inactiveTintColor: 'red' ,activeTintColor:'#fff',inactiveBackgroundColor:'blue'}}
                        // options={{
                        //     drawerLabel: 'User Registration  ',
                            
                        //     drawerIcon: () => <Icon name="user-plus" size={25} color='#fff'
                        //         paddingLeft={10}
                        //         onPress={()=>Alert.alert('hi')}
                                
                        //     />,
                        //     itemStyle: { marginHorizontal: 30,color:'#fff' },
                           
                        // }}
                    />} 
                
                <Drawer.Screen name="lazyLoading" component={lazyLoading} options={{ headerShown: false }} />

                       
            </Drawer.Navigator>
        );
    }
}