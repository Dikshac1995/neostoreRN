import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Homescreen from '../screens/Home/homescreen'
import LoginScreen from '../screens/Login/login'

const Stack = createStackNavigator();

 function Root() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Homescreen" component={Homescreen} />
            <Stack.Screen name="loginScreen" component={LoginScreen} />
        </Stack.Navigator>
    );
 }
export default Root;