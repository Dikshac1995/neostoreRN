import React, { Component } from 'react';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyAccount from '../Screens/MyAccount/index';
// import Homescreen from '../screens/Home/homescreen'
import LoginScreen from '../Screens/Login/login'
import Registration from '../Screens/Register/registration'
import MyDrawer from './drawerMain';
import ForgotPassword from '../Screens/ForgotPassword/forgotpassword';
import SetPassword from '../Screens/setpassword/setpassword'
import ProductList from '../Screens/Productlist/product';
import productDetail from '../Screens/productDetail/productDetail'
import Placeorder from '../Screens/placeorder'
import EditProfile from '../Screens/EditProfile/editProfile'
import ResetPassword from '../Screens/ResePassword/resetPassword'
import AddAddress from '../Screens/Adress-Module/Add-address/AddAddress'
import AddressList from '../Screens/Adress-Module/Address-List/AddressList'
// import AddAddress from '../screens/Add_address/add_address';
import Map from '../Map'
import Mycard from '../Screens/MyCardScreen/Mycard'
// import Addresses from '../screens/Address_list/add_list'
import Searchitem from '../Reusable/searchnar/searchbar'
import Share1 from '../Reusable/share/share'
import StoreLocator from '../Map/index';
import Myorder from '../Screens/Myorder/myorder'
import LazyLoading from '../Screens/flatlistLazy/lazyloading'
import Orderid from '../Screens/OrderId/orderid'



const Stack = createStackNavigator();

class Main extends Component {

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName='MyDrawer' >
                    {/* <Stack.Screen name="homescreen" component={Homescreen} options={{ headerShown: false }} /> */}
                    <Stack.Screen name="MyDrawer" component={MyDrawer} options={{ headerShown: false }} />
                    <Stack.Screen name="searchitem" component={Searchitem} options={{ headerShown: false }} />
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
                        headerTitle: 'Order Summary',
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
                    <Stack.Screen name='address' component={AddressList} options={{
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
