import React, { useEffect, useState } from 'react';
import { Component } from 'react';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import Homescreen from '../screens/Home/homescreen'
import LoginScreen from '../screens/Login/login'
import Icon from 'react-native-vector-icons/FontAwesome5';
import MyAccount from '../screens/MyAccount/index'
import Mycard from '../screens/MyCardScreen/Mycard'
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';


 

function CustomDrawerContent(props) {
  // const [LoggedIn, setLoggedIn] = useState(false);
  // console.log(LoggedIn)
  // getData = async () => {
  //   try {
  //     const value = JSON.parse(await AsyncStorage.getItem('token'));

  //     if (value !== null) {
  //       setLoggedIn(!LoggedIn)
  //     }
  //   } catch (e) {
  //     // error reading value
  //     console.log(e);
  //   }
  // };
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   this.getData();
  //   setInterval(this.getData, 5000);
  
  // });

  
  return (
  
    <>
     
      <View style ={{alignItems:'center',paddingTop:20}}>
        <Icon name="neos" size={80} /> 
        <Text style={{fontSize:30,fontWeight:'bold'}}>Neostore</Text>
      </View>
      <DrawerContentScrollView {...props} style={{ backgroundColor: '#fff' }} >
        <DrawerItemList {...props} />
      
        <DrawerItem
          icon={() => <Icon name="user-friends" size={30} />}
          label="Account"
          labelStyle={{ color: '#000', fontSize: 20 }}
          // onPress={() => this.nestedmenu}
        />  
        <DrawerItem
          icon={() => <Icon name="shopping-cart" size={30} />}
          label="MyCart"
          labelStyle={{ color: '#000', fontSize: 20 }}
          onPress={() => props.navigation.navigate('Mycard')}
        />  
      <DrawerItem
          icon={() => <Icon name="couch" size={30}/>}
          label="Sofa"
          labelStyle={{ color: '#000',fontSize:20 }}
          onPress={() => props.navigation.navigate('productList', { category_id :"5cfe3c5aea821930af69281e" })}
      />
      <DrawerItem
          icon={() => <Icon name="bed" size={30}/>}
          label="Bed"
          labelStyle={{ color: '#000', fontSize: 20 }}
          onPress={() => props.navigation.navigate('productList', { category_id: "cfe3c65ea821930af69281f" })}
      />
      <DrawerItem
        icon={() => <Icon name="chair" size={30} />}
          label="chair"
          labelStyle={{ color: '#000', fontSize: 20 , marginLeft:10}}
          onPress={() => props.navigation.navigate('productList', { category_id: "5cfe3c6fea821930af692820" })}
      />
      <DrawerItem
          icon={() => <Icon name="table" size={30}/>}
          label="Table"
          labelStyle={{ color: '#000', fontSize: 20 ,marginLeft:10}}
          onPress={() => props.navigation.navigate('productList', { category_id: "5cfe3c79ea821930af692821" })}
      />
      <DrawerItem
        icon = {
            () => <Icon name="dungeon" size={30}/>
        }
          label="Almirah"
          labelStyle={{ color: '#000', fontSize: 20 ,marginLeft:10}}
          onPress={() => props.navigation.navigate('productList', { category_id: "5d14c15101ae103e6e94fbe0" })}
      />
      <DrawerItem
          icon={() => <Icon name="map-marker-alt" size={30}/>}
          label="Store Locator"
          labelStyle={{ color: '#000', fontSize: 20 , marginLeft:12}}
        onPress={() => props.navigation.navigate('Map')}
        />
        
        <DrawerItem
          icon={() => <Icon name='user-friends' size={30}/>}
          label="MyAccount"
          labelStyle={{ color: '#000', fontSize: 20 ,marginLeft:10}}
          onPress={() => props.navigation.navigate('MyAccount')}
        />


      </DrawerContentScrollView>
      </>
  );
}

const Drawer = createDrawerNavigator();

export default class MyDrawer extends Component {
  
  
  render() {
    return (
      <Drawer.Navigator drawerContent={props => CustomDrawerContent(props)} drawerType='slide'  >
       
            <Drawer.Screen name="Homescreen" component={Homescreen} /> 
            <Drawer.Screen name="loginScreen" component={LoginScreen} />
            <Drawer.Screen  name ="MyAccount"  component={MyAccount}/> 
            </Drawer.Navigator>
        );
    }
}