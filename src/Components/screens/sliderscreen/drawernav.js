import React, { useEffect, useState } from 'react';
import { Component } from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Text, View, Image, ScrollView, TouchableOpacity, StyleSheet, Alert, LayoutAnimation, UIManager, Platform } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { api } from '../../../utils/api';
import { connect } from 'react-redux';
import { getCartData } from '../../../Redux/Action/mycart'
import { styles } from './style'

class CustomDrawerContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      LoggedIn: false,
      myCartProduct: 0,
      token: '',
      userdata: [],
      imageSource: require('../../../Assets/Images/user-profileIcon.png'),

      // imageSource: require('../../Assets/Images/user-profileIcon.png'),
      product_id: ' ',
      cartproduct_length: 0,
    };
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount() {
    // this.getToken()

    this.focusListener = this.props.navigation.addListener('focus', () => {
      console.log('screen is focused')
      this.getToken()
    })


  }

  componentDidUpdate = async (prev, state) => {

    if (this.props.state.routes != prev.state.routes) {
      this.getToken()
    }
    if (this.props.data.data !== prev.data.data) {
      console.log('in scha ')
      // this.getToken()
    }
  }


  componentWillUnmount() {
    // Remove the event listener before removing the screen from the stack
    this.focusListener();

  }

  async getToken() {
    let token = await AsyncStorage.getItem('token');
    if (!token || token == " ") {
      this.setState({ LoggedIn: 'false' })
    }
    else {
      const customer_details = JSON.parse(await AsyncStorage.getItem('customerDetail'))
      if (customer_details.customer_details.profile_img !== null) {
        const source = { uri: api.baseUrl + customer_details.customer_details.profile_img };
        this.setState({ imageSource: source })
      }
      else {
        this.setState({ imageSource: require('../../../Assets/Images/user-profileIcon.png') })
      }
      if (token !== null && token !== ' ') {
        this.setState({
          LoggedIn: true,
          userdata: customer_details.customer_details,
          token: token,

        })
        await this.props.getCartData(token)
        const mycartlength = this.props.data.data
        if (this.props.data.loading) { console.log('loading in draw') }
        else {
          if (mycartlength !== undefined) {
            this.setState({ cartproduct_length: mycartlength.length })
          }
          else {
            this.setState({ cartproduct_length: 0 })
          }
          this.getCartData1()
        }
      }
    }

  }
  async getCartData1() {
    const value = JSON.parse(await AsyncStorage.getItem('MycartData'));
    if (value !== null) {
      console.log('cart async ', value)
      this.setState({ cartproduct_length: value.length })
    }
    else {
      console.log(this.state.cartproduct_length, '!!!')
      // this.setState({ cartproduct_length: 0 })
    }

  }
  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded })
  }

  async signOut() {
    const myCartProduct = JSON.parse(await AsyncStorage.getItem('MycartData'))
    Alert.alert(
      'Log out',
      'Do you want to logout?',
      [
        { text: 'Cancel', onPress: () => { return null } },
        {
          text: 'Confirm', onPress: () => {
            if (myCartProduct !== null) {
              let flag = [{ flag: 'logout' }];
              const data = [...myCartProduct, ...flag];
              api.fetchapi(api.baseUrl + "addProductToCartCheckout", 'post',
                JSON.stringify(data),
                this.state.token)
                .then((response) => response.json()).then((data) => {
                  if (data.success) {
                    Alert.alert("You are logout Successfully")
                    AsyncStorage.clear();
                    this.setState({ LoggedIn: false })
                    this.props.navigation.navigate('Homescreen', { logout: true });
                  }
                  else {
                    console.log(data.error)
                  }
                });
            }
            AsyncStorage.clear();
            this.setState({ token: ' ' })
            this.props.navigation.navigate('Homescreen', { logout: true });

          }
        },
      ],
      { cancelable: false }
    )

  }

  render(props) {
    const logged = this.state.LoggedIn
    const mycart = this.props.data
    const mycartlength = this.props.data.data
    const cust_data = this.state.userdata
    return (
      <>
        <ScrollView>
          <>
            {this.state.LoggedIn == true ?
              <View style={styles.Header}>
                <View style={{ alignItems: 'center' }}>
                  <TouchableOpacity style={{ paddingTop: 10, flex: 1 }}>
                    <Image style={styles.user_profile} source={this.state.imageSource} />
                  </TouchableOpacity>

                  <Text style={styles.username}>{cust_data.first_name}  {cust_data.last_name}</Text>
                  <Text style={styles.email}>{cust_data.email}</Text>
                </View>
                <View style={{
                  flexDirection: 'row', paddingTop: 10, justifyContent: 'space-between',
                }}>
                  <View style={{ flexDirection: 'row', flex: 2 }}>
                    <Icon name='shopping-cart' size={30} color='#fff'
                      onPress={() => this.props.navigation.navigate('Mycard', { data: 0 })} />

                    <Text style={styles.cartLabel}>My Cart </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end', }}>
                    <View style=
                      {styles.cart_countWrapper}>
                      <Text style={styles.cart_countText}>
                        {this.state.cartproduct_length}
                        {/* {mycartlength !== undefined ? mycartlength.length : 0}  */}
                      </Text>
                    </View>
                  </View>
                </View>
              </View> :

              <View style={styles.header}>

                <View style={styles.logoContainer}>
                  <Icon name="neos" size={80} color='white' />
                  <Text style={styles.logoText}>NEOSTOR</Text>
                </View>

                <View style={styles.parent_drawer}>
                  <Icon name='users' size={30} color='#fff' />
                  <Text style={styles.parent_drawerLabel}>Account</Text>
                  <Icon name={this.state.expanded ? 'arrow-up' : 'arrow-down'}
                    size={20} color='#fff' onPress={() => this.toggleExpand()} />
                </View>

                {this.state.expanded ?
                  <View>
                    <View style={styles.child_drawer}>
                      <Icon name='user-alt' size={25} color='#fff'
                        onPress={() => this.props.navigation.navigate('loginScreen')} />
                      <Text style={styles.child_drawerLabel}> User-Login </Text>
                    </View>

                    <View style={styles.child_drawer}>
                      <Icon name='user-plus' size={25} color='#fff'
                        onPress={() => this.props.navigation.navigate('Register')} />
                      <Text style={styles.child_drawerLabel}> User-Registration</Text>
                    </View>
                  </View> : null}

              </View>

            }
          </>

          <DrawerContentScrollView {...props} style={{
            backgroundColor: 'black', activeBackgroundColor: 'white',
          }}
          >

            <DrawerItem
              icon={() => <Icon name="couch" size={30} color='#fff' />}
              label="Sofa"
              labelStyle={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}
              onPress={() => this.props.navigation.navigate('productList', { category_id: "5cfe3c5aea821930af69281e", category_name: "sofa" })}
            />
            <DrawerItem
              icon={() => <Icon name="bed" size={30} color='#fff' />}
              label="Bed"
              labelStyle={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}
              onPress={() => this.props.navigation.navigate('productList', { category_id: "5cfe3c65ea821930af69281f", category_name: "Bed" })}
            />
            <DrawerItem
              icon={() => <Icon name="chair" size={35} color='#fff' />}
              label="Chair"
              labelStyle={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}
              onPress={() => this.props.navigation.navigate('productList', { category_id: "5cfe3c6fea821930af692820", category_name: "chair" })}
            />
            <DrawerItem
              icon={() => <Icon name="table" size={30} color='#fff' />}
              label="Table"
              labelStyle={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}
              onPress={() => this.props.navigation.navigate('productList', { category_id: "5cfe3c79ea821930af692821", category_name: "Table" })}
            />
            <DrawerItem
              icon={
                () => <Icon name="dungeon" size={30} color='#fff' />
              }
              label="Almirah"
              labelStyle={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}
              onPress={() => this.props.navigation.navigate('productList', { category_id: "5d14c15101ae103e6e94fbe0", category_name: "Almirah" })}
            />
            <DrawerItem
              icon={() => <Icon name="map-marker-alt" size={30} color='#fff' />}
              label="Store Locator"
              labelStyle={{ color: '#fff', fontSize: 20, marginLeft: 10, fontWeight: 'bold' }}
              onPress={() => this.props.navigation.navigate('Map')}
            />

            {this.state.LoggedIn == true &&
              <>
                <DrawerItem
                  icon={() => <Icon name='user-friends' size={30} color='#fff' />}
                  label="MyAccount"
                  labelStyle={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}
                  onPress={() => this.props.navigation.navigate('MyAccount')}
                />
                <DrawerItem
                  icon={() => <Icon name='clipboard-list' size={30} color='#fff' />}
                  label="My order"
                  labelStyle={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}
                  onPress={() => this.props.navigation.navigate('Myorder')}
                />
                <DrawerItem
                  icon={() => <Icon name='sign-out-alt' size={30} color='#fff' />}
                  label="Sign Out"
                  labelStyle={{ color: '#fff', fontSize: 20, marginLeft: 5, fontWeight: 'bold' }}
                  onPress={() => this.signOut()
                  }
                >
                </DrawerItem>
              </>}

          </DrawerContentScrollView>
        </ScrollView>
      </>
    );
  }


}

const mapStateToProps = state => ({
  data: state.mycartReducer
})

//Map your action creators to your props.
const mapDispatchToProps = (dispatch) => {
  return {
    getCartData: (type) => dispatch(getCartData(type))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawerContent)