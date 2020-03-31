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
import { Text, View, Image, TouchableOpacity, StyleSheet,Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';




 

 export  default function CustomDrawerContent(props,LoggedIn ) {
  
  console.log("DDDDDDDDDDDDDDDDD", props)
  console.log('@@11@@',LoggedIn)
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
     {!LoggedIn?(
      <View style ={{alignItems:'center',paddingTop:20}}>
        <Icon name="neos" size={80} /> 
        <Text style={{fontSize:30,fontWeight:'bold'}}>Neostore</Text>
        </View>) :
        (
          <View style ={{alignItems:'center',marginTop:20,position:'relative'}}>
            <View style={{ width: 140, height: 140, borderRadius: 400 / 2, backgroundColor: '#03DAC6' }} />
            <View style ={{position:'absolute',top:20}}>
              <Icon name="user-circle" size={100} color="#fff"  />
            </View>
            <View style={{ position: 'absolute', top: 80, right:60 }}>
              <Icon name="camera" size={40} color='#0ff'  />
            </View>
            {/* <Image
              source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png' }}
              style={{ width: 100, height: 100, borderRadius: 400 / 2,backgroundColor:'yellow' }}
            /> */}
            <Text style ={{fontSize:20}}>diksha30@gmail.com</Text>
          </View>
        )}
      <DrawerContentScrollView {...props} style={{ backgroundColor: '#fff' }} >
        
        <DrawerItemList {...props} />
        {!LoggedIn ? (
          <DrawerItem
            icon={() => <Icon name="user-friends" size={30} />}
            label="Account"
            labelStyle={{ color: '#000', fontSize: 20 }}
            onPress={() =>
              <View>
                <Text>User-Login</Text>
              </View>
            }

          />) : (

            <DrawerItem
              icon={() => <Icon name="shopping-cart" size={30} />}
              label="MyCart"
              labelStyle={{ color: '#000', fontSize: 20 }}
              onPress={() => props.navigation.navigate('Mycard')}
            />)}
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
          onPress={() => props.navigation.navigate('productList', { category_id: "5cfe3c65ea821930af69281f" })}
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
        {LoggedIn ? (
          <DrawerItem
            icon={() => <Icon name='user-slash' size={30} />}
            label="Sign Out"
            labelStyle={{ color: '#000', fontSize: 20, marginLeft: 10 }}
            onPress={() =>
              Alert.alert(
                'Log out',
                'Do you want to logout?',
                [
                  { text: 'Cancel', onPress: () => { return null } },
                  {
                    text: 'Confirm', onPress: () => {
                      AsyncStorage.clear();
                      props.navigation.navigate('loginScreen')
                    }
                  },
                ],
                { cancelable: false }
              )
            }>
          
          </DrawerItem>) : (null)}
      </DrawerContentScrollView>
      </>
  );
}

