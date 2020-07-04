import React, { Component } from 'react';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyAccount from '../screens/MyAccount/index';
import Homescreen from '../screens/Home/homescreen'
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
import Addresses from '../screens/Address_list/add_list'
import Searchitem from '../Reusable/searchnar/searchbar'
import Search from '../Reusable/searchnar/search'
import Share1 from '../Reusable/share/share'
import StoreLocator from '../Map/index';
import Myorder from '../screens/Myorder/myorder'
import LazyLoading from '../screens/flatlistLazy/lazyloading'
import Orderid from '../screens/OrderId/orderid'



const Stack = createStackNavigator();

class Main extends Component {

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName='MyDrawer' >
                    <Stack.Screen name="homescreen" component={Homescreen} options={{ headerShown: false }} />
                    <Stack.Screen name="MyDrawer" component={MyDrawer} options={{ headerShown: false }} />
                    <Stack.Screen name="searchitem" component={Searchitem} options={{ headerShown: false }} />
                    <Stack.Screen name="search" component={Search} options={{ headerShown: false }} />
                    <Stack.Screen name="share" component={Share1} options={{ headerShown: false }} />
                    <Stack.Screen name="Myorder" component={Myorder} options={{ headerShown: false }} />
                    <Stack.Screen name="LazyLoading" component={LazyLoading} options={{ headerShown: false }} />
                    <Stack.Screen name="Orderid" component={Orderid} options={{ headerShown: false }} />

                    <Stack.Screen name="loginScreen" component={LoginScreen}
                        options={{
                            headerStyle: { backgroundColor: 'red' },
                            headerTintColor: '#fff',
                            headerTitle: 'Login',
                            headerTitleAlign: 'center',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                                fontSize: 25,
                            }
                        }
                        } />
                    <Stack.Screen name="Register" component={Registration}
                        options={{
                            headerStyle: { backgroundColor: 'red' },
                            headerTintColor: '#fff',
                            headerTitleAlign: 'center',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                                fontSize: 25,
                            }
                        }
                        }
                    />
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{
                        headerStyle: { backgroundColor: 'red' },
                        headerTintColor: '#fff',
                        headerTitle: 'Forgot Passsword',
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 25,
                        }
                    }
                    } />
                    <Stack.Screen name="SetPassword" component={SetPassword} options={{
                        headerStyle: { backgroundColor: 'red' },
                        headerTintColor: '#fff',
                        headerTitle: 'Set Password',
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 25,
                        }
                    }
                    } />
                    <Stack.Screen name="productList" component={ProductList} options={{
                        headerShown: false
                    }
                    } />
                    <Stack.Screen name="productDetail" component={productDetail} options={{
                        headerShown: false
                    }
                    } />
                    <Stack.Screen name="oder summary" component={Placeorder} options={{
                        headerStyle: { backgroundColor: 'red' },
                        headerTintColor: '#fff',
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 25,
                        }
                    }
                    } />

                    <Stack.Screen name="MyAccount" component={MyAccount} options={{
                        headerShown: false
                    }
                    } />
                    <Stack.Screen name='EditProfile' component={EditProfile} options={{
                        headerStyle: { backgroundColor: 'red' },
                        headerTintColor: '#fff',
                        headerTitle: 'Edit Profile',
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 25
                        }
                    }
                    } />
                    <Stack.Screen name='ResetPassword' component={ResetPassword} options={{
                        headerStyle: { backgroundColor: 'red' },
                        headerTintColor: '#fff',
                        headerTitle: ' Reset password',
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 25
                        }
                    }
                    } />
                    <Stack.Screen name='AddAddress' component={AddAddress} options={{
                        headerShown: false
                    }} />
                    <Stack.Screen name='address' component={Addresses} options={{
                        headerShown: false
                    }} />

                    <Stack.Screen name='Mycard' component={Mycard} options={{
                        headerShown: false
                    }} />

                    <Stack.Screen name='Map' component={Map} options={{
                        headerShown: false
                    }} />

                    <Stack.Screen name='storeLocator' component={StoreLocator} options={{
                        headerShown: false
                    }} />


                </Stack.Navigator>
            </NavigationContainer >
        );
    }
}



export default Main;
