import React, {
    Component
}
from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,TextInput
} from 'react-native';
import {  NavigationContainer, DrawerActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MyAccount from '../screens/MyAccount/index';
import Homescreen from '../screens/Home/homescreen'
import Splashscreen from '../screens/splashscreen'
import LoginScreen from '../screens/Login/login'
import Registration from '../screens/Register/registration'
import MyDrawer from './drawerMain';
import ForgotPassword from '../screens/ForgotPassword/forgotpassword';
import SetPassword from '../screens/setpassword/setpassword'
import ProductList from '../screens/Productlist/product';
import productDetail from '../screens/productDetail/productDetail'
import Placeorder from '../screens/placeorder'
import EditProfile from '../screens/EditProfile/editProfile'
import ResetPassword from '../screens/ResePassword/resetPassword'
import AddAddress from '../screens/Add_address/add_address';
import Map from '../Map'
import Mycard from '../screens/MyCardScreen/Mycard'
import AddressList from '../screens/AddressList'
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import Header from '../Reusable/header /header'
import SliderBox from '../Reusable/sliderBox'
import Searchitem from '../Reusable/searchnar/searchbar'
import Search from '../Reusable/searchnar/search'
import Share1 from '../Reusable/share/share'
import StoreLocator from '../Map/store';
import lazyLoading from '../screens/flatlistLazy/lazyloading'


const Stack = createStackNavigator();

class Main extends Component {
    // Searchbar() {
    //     <Animatable.View animation="slideInRight" duration={500}>
    //         <View style={{ width: 300, borderRadius: 30 }}>
    //            <TextInput placeholder='search' />
    //         </View> 
    //     </Animatable.View>
        
    // }
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName='MyDrawer' >
                    <Stack.Screen name="homescreen" component={Homescreen} options={{ headerShown: false }} /> 
                    {/* <Stack.Screen name="Header" component={Header} options={{ headerShown: false }} />  */}
                    <Stack.Screen name="MyDrawer" component={MyDrawer} options={{ headerShown: false }} />
                    {/* <Stack.Screen name="SliderBox" component={SliderBox} options={{ headerShown: false }} /> */}
                    <Stack.Screen name="searchitem" component={Searchitem} options={{ headerShown: false }} />
                    <Stack.Screen name="search" component={Search} options={{ headerShown: false }} />
                    <Stack.Screen name="share" component={Share1} options={{ headerShown: false }} />
                    {/* <Stack.Screen name="lazyLoading" component={lazyLoading} options={{ headerShown: false }} /> */}

                    <Stack.Screen name="loginScreen" component={LoginScreen}
                        options={{
                            headerStyle: { backgroundColor: 'red' },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                                marginLeft: 70,
                                fontSize: 25,
                            }
                        }
                        }/>
                    <Stack.Screen name="Register" component={Registration}
                        options = { {headerStyle: {backgroundColor: 'red'},
                                headerTintColor: '#fff',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                    marginLeft: 70,
                                    fontSize:25,
                                }
                            }
                        }
                    />
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{
                        headerStyle: { backgroundColor: 'red' },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            marginLeft: 70,
                            fontSize: 25,
                        }
                    }
                    }/>
                    <Stack.Screen name="SetPassword" component={SetPassword} options={{
                        headerStyle: { backgroundColor: 'red' },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            marginLeft: 70,
                            fontSize: 25,
                        }
                    }
                    }/>
                    <Stack.Screen name="productList" component={ProductList} options={{
                        headerShown: false

                        // headerStyle: { backgroundColor: 'red' },
                        // headerTintColor: '#fff',
                        // headerTitleStyle: {
                        //     fontWeight: 'bold',
                        // }
                    }
                    } />
                    <Stack.Screen name="productDetail" component={productDetail} options={{
                        headerShown: false
                        // headerStyle: { backgroundColor: 'red' },
                        // headerTintColor: '#fff',
                        // headerTitleStyle: {
                        //     fontWeight: 'bold',
                        // }
                    }
                    } />
                    <Stack.Screen name="oder summary" component={Placeorder} options={{
                        headerStyle: { backgroundColor: 'red' },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            marginLeft: 70,
                            fontSize: 25,
                        }
                    }
                    } />

                    <Stack.Screen name="MyAccount" component={MyAccount} options={{
                        headerShown: false 
                        // headerStyle: { backgroundColor: 'red' },
                        // headerTintColor: '#fff',
                        // headerTitleStyle: {
                        //     fontWeight: 'bold',
                        // }
                    }
                    } />
                    <Stack.Screen name='EditProfile' component={EditProfile} options={{
                        headerStyle: { backgroundColor: 'red' },
                        headerTintColor: '#fff',
                        headerTitle:'Edit Profile',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            marginLeft: 70,
                            fontSize:25
                        }
                    }
                    } />
                    <Stack.Screen name='ResetPassword' component={ResetPassword} options={{
                        headerStyle: { backgroundColor: 'red' },
                        headerTintColor: '#fff',
                        headerTitle: ' Reset password',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            marginLeft: 50,
                            fontSize:25
                        }
                    }
                    } />
                    <Stack.Screen name='AddAddress' component={AddAddress} options={{
                     headerShown:false
                    }} />
                   
                    <Stack.Screen name='Mycard' component={Mycard} options={{
                        headerShown: false

                    }
                    } />
                    <Stack.Screen name='Addresslist ' component={AddressList} options={{
                        headerStyle: { backgroundColor: 'red' },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }
                    }
                    } />
                    <Stack.Screen name='Map' component={Map} options={{
                        headerShown:false
                       
                    }
                    } />

                    <Stack.Screen name='storeLocator' component={StoreLocator} options={{
                        headerShown:false
                        // headerStyle: { backgroundColor: 'red' },
                        // headerTintColor: '#fff',
                        // headerTitleStyle: {
                        //     fontWeight: 'bold',
                        // }
                    }
                    } />

        
                </Stack.Navigator> 
             </NavigationContainer>  
        );
    }
}



export default Main;
