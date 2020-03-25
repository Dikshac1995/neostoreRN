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
} from 'react-native';
import {  NavigationContainer, DrawerActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MyAccount from '../screens/MyAccount/index';
import Homescreen from '../screens/Home/homescreen'
import Splashscreen from '../screens/splashscreen'
import LoginScreen from '../screens/Login/login'
import Registration from '../screens/Register/registration'
import MyDrawer from './drawernav';
import ForgotPassword from '../screens/ForgotPassword/forgotpassword';
import SetPassword from '../screens/setpassword/setpassword'
import ProductList from '../screens/Productlist/product';
import productDetail from '../screens/productDetail/productDetail'
import Placeorder from '../screens/placeorder'
import EditProfile from '../screens/EditProfile/editProfile'
import ResetPassword from '../screens/ResePassword/resetPassword'
import AddAddress from '../screens/Add_address/add_address';



const Stack = createStackNavigator();

class Main extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator >
                    {/* <Stack.Screen name="homescreen" component={Homescreen} options={{headerShown: false }}/> */}
                    <Stack.Screen name="MyDrawer" component={MyDrawer} options={{ headerShown: false }}/>
                    <Stack.Screen name="loginScreen" component={LoginScreen}  />
                    <Stack.Screen name="Register" component={Registration}
                        options = { {headerStyle: {backgroundColor: 'red'},
                                headerTintColor: '#fff',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                }
                            }
                        }
                    />
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{
                        headerStyle: { backgroundColor: 'red' },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }
                    }
                    }/>
                    <Stack.Screen name="SetPassword" component={SetPassword} options={{
                        headerStyle: { backgroundColor: 'red' },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }
                    }
                    }/>
                    <Stack.Screen name="productList" component={ProductList} options={{
                        headerStyle: { backgroundColor: 'red' },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }
                    }
                    } />
                    <Stack.Screen name="productDetail" component={productDetail} options={{
                        headerStyle: { backgroundColor: 'red' },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }
                    }
                    } />
                    <Stack.Screen name="placeorder" component={Placeorder} options={{
                        headerStyle: { backgroundColor: 'red' },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }
                    }
                    } />

                    <Stack.Screen name="MyAccount" component={MyAccount} options={{
                        headerStyle: { backgroundColor: 'red' },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }
                    }
                    } />
                    <Stack.Screen name='EditProfile' component={EditProfile} options={{
                        headerStyle: { backgroundColor: 'red' },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }
                    }
                    } />
                    <Stack.Screen name='ResetPassword' component={ResetPassword} options={{
                        headerStyle: { backgroundColor: 'red' },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }
                    }
                    } />
                    <Stack.Screen name='AddAddress' component={AddAddress} options={{
                        headerStyle: { backgroundColor: 'red' },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }
                    }
                    } />

        
                </Stack.Navigator> 
             </NavigationContainer>  
        );
    }
}



export default Main;
