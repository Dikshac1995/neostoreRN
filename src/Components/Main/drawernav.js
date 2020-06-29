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
import { Text, View, Image, ScrollView, TouchableOpacity, StyleSheet, Alert, LayoutAnimation, UIManager, Platform } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import { api } from '../../utils/api';
import { connect } from 'react-redux';
import { getCartData } from '../../Redux/Action/mycat'





class CustomDrawerContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      LoggedIn: false,
      myCartProduct: 0,
      token: '',
      userdata: [],
      imageSource: require('../../Assets/Images/user-profileIcon.png'),
      product_id: ' ',
      cartproduct_length: 0,
    };
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount() {
    this.getToken()

  }
  async getToken() {
    let token = await AsyncStorage.getItem('token');
    const customer_details = JSON.parse(await AsyncStorage.getItem('customerDetail'))

    if (token !== null) {
      this.setState({
        LoggedIn: true,
        userdata: customer_details.customer_details,
        token: token,
        // myCartProduct: mycartData,
        // product_id: myCartProduct.product_id
      })
      await this.props.getCartData(token)
      const mycartlength = this.props.data.data
      console.log(mycartlength, '123')
      if (mycartlength !== undefined) {
        this.setState({ cartproduct_length: mycartlength.length })

      }
      this.getCartData1()
      console.log('****************', token)
    }

  }
  async getCartData1() {
    const value = JSON.parse(await AsyncStorage.getItem('MycartData'));
    console.log("order123", value)
    if (value !== null) {
      console.log('oder', value)
      // const cart_product = [...this.state.cartproduct_length]
      // const data = cart_product.concat(value.length)
      // console.log('value', data)
      this.setState({ cartproduct_length: value.length })

    }
  }
  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded })
  }
  async signOut() {
    const myCartProduct = JSON.parse(await AsyncStorage.getItem('MycartData'))
    console.log(" my data ", myCartProduct)
    Alert.alert(
      'Log out',
      'Do you want to logout?',
      [
        { text: 'Cancel', onPress: () => { return null } },
        {
          text: 'Confirm', onPress: () => {
            if (myCartProduct !== null) {
              // myCartProduct.map((e) => {
              //   let object = [{
              //     _id: e.product_id,
              //     product_id: e.product_id,
              //     quantity: 1

              //   },
              //   { flag: 'logout' }]
              let flag = [{ flag: 'logout' }];
              const data = [...myCartProduct, ...flag];
              console.log(data, 'data1')

              api.fetchapi(api.baseUrl + "addProductToCartCheckout", 'post',
                JSON.stringify(data),
                this.state.token)
                .then((response) => response.json()).then((data) => {
                  console.log('Success:', data);
                  if (data.success) {
                    Alert.alert(data.message)
                    AsyncStorage.clear();
                    this.props.navigation.closeDrawer()


                    // this.props.navigation.navigate('homescreen')
                  }
                  else {
                    Alert.alert(data.message)

                  }
                });
              // })
            }

          }
        },
      ],
      { cancelable: false }
    )

  }

  render(props) {
    const mycart = this.props.data
    const mycartlength = this.props.data.data
    console.log("data", this.state.token, mycartlength)
    const cust_data = this.state.userdata
    return (
      <>
        <ScrollView>
          {!this.state.LoggedIn ?
            (
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
            ) : (
              <View style={{ alignItems: 'center', marginTop: 20 }}>
                <TouchableOpacity onPress={() => Alert.alert('clicked')}>
                  <Image style={{ width: 150, height: 150, resizeMode: 'cover' }} source={this.state.imageSource} />
                </TouchableOpacity>
                {/* <Avatar
                  size="xlarge"
                  rounded
                  showAccessory
                  source={this.state.imageSource}

                  // icon={{ name: 'user-circle', type: 'font-awesome' }}
                  onPress={() => Alert.alert("Works!")}
                  activeOpacity={0.7}
                /> */}
                <Text style={{ fontSize: 20, color: '#fff' }}>{cust_data.first_name}  {cust_data.last_name}</Text>
                <Text style={{ fontSize: 20, color: '#e91b1a' }}>{cust_data.email}</Text>
                <View style={styles.parent_drawer}>
                  <View style={{ paddingLeft: 35, paddingRight: 10 }}>
                    <Icon name='shopping-cart' size={30} color='#fff'
                      onPress={() => this.props.navigation.navigate('Mycard', { data: 0 })} />
                  </View>
                  <Text style={styles.parent_drawerLabel}>My Card </Text>
                  <View style=
                    {{ backgroundColor: 'red', borderRadius: 100, width: 40, height: 40, marginRight: 40 }}>
                    <Text style={{ color: '#fff', paddingLeft: 15, paddingTop: 10 }}>
                      {this.state.cartproduct_length}
                      {/* {mycartlength !== undefined ? mycartlength.length : 0}  */}
                    </Text>
                  </View>
                </View>
              </View>
            )}
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
              icon={() => <Icon name="chair" size={30} color='#fff' />}
              label="chair"
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
              labelStyle={{ color: '#fff', fontSize: 20, marginLeft: 12, fontWeight: 'bold' }}
              onPress={() => this.props.navigation.navigate('Map')}
            />
            <DrawerItem
              icon={() => <Icon name="map-marker-alt" size={30} color='#fff' />}
              label="lazy loading "
              labelStyle={{ color: '#fff', fontSize: 20, marginLeft: 12, fontWeight: 'bold' }}
              onPress={() => this.props.navigation.navigate('LazyLoading')}
            />

            {/* <DrawerItem
              icon={() => <Icon name="map-marker-alt" size={30} color='#fff' />}
              label="Store Lactor "
              labelStyle={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}
              onPress={() => this.props.navigation.navigate('storeLocator')}
            /> */}
            {this.state.LoggedIn ? (
              <>
                <DrawerItem
                  icon={() => <Icon name='user-friends' size={30} color='#fff' />}
                  label="MyAccount"
                  labelStyle={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}
                  onPress={() => this.props.navigation.navigate('MyAccount')}
                />
                <DrawerItem
                  icon={() => <Icon name='user-friends' size={30} color='#fff' />}
                  label="My order"
                  labelStyle={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}
                  onPress={() => this.props.navigation.navigate('Myorder')}
                />

                <DrawerItem
                  icon={() => <Icon name='user-friends' size={30} color='#fff' />}
                  label="AddressList"
                  labelStyle={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}
                  onPress={() => this.props.navigation.navigate('AddAddress')}
                />


                <DrawerItem
                  icon={() => <Icon name='sign-out-alt' size={30} color='#fff' />}
                  label="Sign Out"
                  labelStyle={{ color: '#fff', fontSize: 20, marginLeft: 10, fontWeight: 'bold' }}
                  onPress={() => this.signOut()
                    // Alert.alert(
                    //   'Log out',
                    //   'Do you want to logout?',
                    //   [
                    //     { text: 'Cancel', onPress: () => { return null } },
                    //     {
                    //       text: 'Confirm', onPress: () => {
                    //         AsyncStorage.clear();
                    //         this.props.navigation.navigate('homescreen')
                    //       }
                    //     },
                    //   ],
                    //   { cancelable: false }
                    // )
                  }
                >

                </DrawerItem>
              </>) : (null)}

          </DrawerContentScrollView>
        </ScrollView>
      </>
    );
  }


}
const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingHorizontal: 20
  },
  logoContainer: {
    alignItems: 'center',
    paddingBottom: 30
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fe3f3f'
  },
  parent_drawer: {
    display: 'flex', flexDirection: 'row', marginTop: 20

  },
  parent_drawerLabel: {

    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 100
  },
  child_drawer:
  {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 30,
    paddingTop: 10
  },
  child_drawerLabel: {
    color: '#fff', fontSize: 20, marginLeft: 30, fontWeight: 'bold'
  },


})


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