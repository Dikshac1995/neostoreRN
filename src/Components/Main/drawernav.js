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
        <Icon name="neos" size={80} color='white' /> 
        <Text style={{fontSize:30,fontWeight:'bold', color :'white'}}>Neostore</Text>
        </View>) :
        (
          <View style ={{alignItems:'center',marginTop:20,position:'relative'}}>
            <View style={{
              width: 140, height: 140, borderRadius: 400 / 2,
              //backgroundColor: '#03DAC6'
              backgroundColor:'#eee'
            }}
            />
            <View style ={{position:'absolute',top:20}}>
              <Icon name="user-circle" size={100} color="#fff"  />
            </View>
            <View style={{ position: 'absolute', top: 80, right:60 }}>
              <Icon name="camera" size={40} color='#0ee'  />
            </View>
            {/* <Image
              source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png' }}
              style={{ width: 100, height: 100, borderRadius: 400 / 2,backgroundColor:'yellow' }}
            /> */}
            <Text style ={{fontSize:20}}>diksha30@gmail.com</Text>
          </View>
        )}
      <DrawerContentScrollView {...props} style={{ backgroundColor: 'black', activeBackgroundColor:'white'}} 
      >
        
       
        {/* {!LoggedIn ? ( */}
          <>
          <DrawerItem
            icon={() => <Icon name="user-friends" size={30} color='#fff' />}
            label="Account"
            labelStyle={{ color: '#fff', fontSize: 20 }}
            onPress={() =>
              <View>
                <Text>User-Login</Text>
              </View>
            
            }
            activeBackgroundColor='#eee'
            icon={() => <Icon name="user" size={30} color='#fff' ></Icon>
            }
            accessibilityLabel="1"
            label1="1"
            label1Style={{ color: '#fff', fontSize: 20 }}
            // {
            //   <View>
            //     <Text>1</Text>
            //   </View>
            // }
            />
          <DrawerItem
              icon={() => <Icon name="user-alt" size={25}   color='#fff'/>}
              label="User-Login"
              labelStyle={{ color: '#fff', fontSize: 20 }}
              onPress={() => props.navigation.navigate('loginScreen')}
              

            />
            <DrawerItem
              icon={() => <Icon name="user-plus" size={25} color ='#fff' />}
              label="User-Registration"
              labelStyle={{ color: '#fff', fontSize: 20 }}
              onPress={() => props.navigation.navigate('Register')
                
              }

            />
            </>
        {/* ) : ( */}

            <DrawerItem
              icon={() => <Icon name="shopping-cart" size={30}  color='#fff'/>}
              label="MyCart"
              labelStyle={{ color: '#fff', fontSize: 20 }}
              
              onPress={() => props.navigation.navigate('Mycard')}
        />
            {/* )} */}
        <DrawerItemList {...props} />
      <DrawerItem
          icon={() => <Icon name="couch" size={30} color ='#fff'/>}
          label="Sofa"
          labelStyle={{ color: '#fff',fontSize:20 }}
          onPress={() => props.navigation.navigate('productList', { category_id: "5cfe3c5aea821930af69281e", category_name:"sofa" })}
      />
      <DrawerItem
          icon={() => <Icon name="bed" size={30} color='#fff'/>}
          label="Bed"
          labelStyle={{ color: '#fff', fontSize: 20 }}
          onPress={() => props.navigation.navigate('productList', { category_id: "5cfe3c65ea821930af69281f", category_name:"Bed" })}
      />
      <DrawerItem
        icon={() => <Icon name="chair" size={30} color='#fff' />}
          label="chair"
          labelStyle={{ color: '#fff', fontSize: 20 , marginLeft:10}}
          onPress={() => props.navigation.navigate('productList', { category_id: "5cfe3c6fea821930af692820", category_name:"chair"})}
      />
      <DrawerItem
          icon={() => <Icon name="table" size={30} color='#fff'/>}
          label="Table"
          labelStyle={{ color: '#fff', fontSize: 20 ,marginLeft:10}}
          onPress={() => props.navigation.navigate('productList', { category_id: "5cfe3c79ea821930af692821", category_name:"Table" })}
      />
      <DrawerItem
        icon = {
            () => <Icon name="dungeon" size={30} color='#fff'/>
        }
          label="Almirah"
          labelStyle={{ color: '#fff', fontSize: 20 ,marginLeft:10}}
          onPress={() => props.navigation.navigate('productList', { category_id: "5d14c15101ae103e6e94fbe0", category_name:"Almirah" })}
      />
      <DrawerItem
          icon={() => <Icon name="map-marker-alt" size={30} color='#fff'/>}
          label="Store Locator"
          labelStyle={{ color: '#fff', fontSize: 20 , marginLeft:12}}
        onPress={() => props.navigation.navigate('Map')}
        />
        
        <DrawerItem
          icon={() => <Icon name='user-friends' size={30} color ='#fff'/>}
          label="MyAccount"
          labelStyle={{ color: '#fff', fontSize: 20 ,marginLeft:10}}
          onPress={() => props.navigation.navigate('MyAccount')}
        />
        {LoggedIn ? (
          <DrawerItem
            icon={() => <Icon name='user-slash' size={30}  color='#fff'/>}
            label="Sign Out"
            labelStyle={{ color: '#fff', fontSize: 20, marginLeft: 10 }}
            onPress={() =>
              Alert.alert(
                'Log out',
                'Do you want to logout?',
                [
                  { text: 'Cancel', onPress: () => { return null } },
                  {
                    text: 'Confirm', onPress: () => {
                      AsyncStorage.clear();
                      props.navigation.navigate('homescreen')
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

