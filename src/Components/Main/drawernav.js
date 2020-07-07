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
  };

  componentWillUnmount() {
    // Remove the event listener before removing the screen from the stack
    this.focusListener();

  }
  async getToken() {
    let token = await AsyncStorage.getItem('token');
    console.log('tokks', token)
    if (!token || token == " ") {
      console.log('data')
      this.setState({ LoggedIn: 'false' })
    }
    else {
      const customer_details = JSON.parse(await AsyncStorage.getItem('customerDetail'))
      console.log('cust_det', customer_details)
      if (customer_details.customer_details.profile_img !== null) {
        console.log('data234', customer_details.customer_details.profile_img)
        const source = { uri: api.baseUrl + customer_details.customer_details.profile_img };
        this.setState({ imageSource: source })
      }
      else {
        this.setState({ imageSource: require('../../Assets/Images/user-profileIcon.png') })
      }


      if (token !== null && token !== ' ') {
        this.setState({
          LoggedIn: true,
          userdata: customer_details.customer_details,
          token: token,

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
      // if (this.state.token == ' ') {
      //   this.setState({
      //     LoggedIn: false
      //   })
      // }
    }

  }
  async getCartData1() {
    const value = JSON.parse(await AsyncStorage.getItem('MycartData'));
    console.log("order123", value)
    if (value !== null) {
      console.log('oder', value)
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
    console.log(" my data ", myCartProduct)
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
              console.log(data, 'data1')

              api.fetchapi(api.baseUrl + "addProductToCartCheckout", 'post',
                JSON.stringify(data),
                this.state.token)
                .then((response) => response.json()).then((data) => {
                  console.log('Success:', data);
                  if (data.success) {
                    Alert.alert(data.message)
                    AsyncStorage.clear();
                    this.setState({ LoggedIn: false })
                    // this.props.navigation.closeDrawer()

                    this.props.navigation.navigate('Homescreen', { logout: true });

                    // this.props.navigation.navigate('homescreen')
                  }
                  else {
                    console.log(data.error)
                    //Alert.alert(data.message)

                  }
                });
            }
            AsyncStorage.clear();
            this.setState({ token: ' ' })
            // this.props.navigation.closeDrawer()
            this.props.navigation.navigate('Homescreen', { logout: true });
            // this.props.navigation.navigate('homescreen')

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
    console.log("data", this.state.token, this.state.cartproduct_length)
    console.log('log in', this.state.LoggedIn, logged, this.state.expanded)
    console.log(this.state.LoggedIn == true ? 123 : 23)
    console.log(this.state.LoggedIn)

    const cust_data = this.state.userdata
    return (
      <>
        <ScrollView>
          <>
            {this.state.LoggedIn == true ?

              <View style={{ alignItems: 'center', marginTop: 20 }}>

                {/* <Text style={{ color: 'red' }}>log{this.state.LoggedIn}</Text> */}
                <TouchableOpacity onPress={() => Alert.alert('clicked')}>
                  <Image style={{ borderRadius: 100, width: 150, height: 150, resizeMode: 'cover' }} source={this.state.imageSource} />
                </TouchableOpacity>

                <Text style={{ fontSize: 20, color: '#fff' }}>{cust_data.first_name}  {cust_data.last_name}</Text>
                <Text style={{ fontSize: 20, color: '#e91b1a' }}>{cust_data.email}</Text>

                <View style={styles.parent_drawer}>
                  <View style={{ paddingLeft: 35, paddingRight: 10 }}>
                    <Icon name='shopping-cart' size={30} color='#fff'
                      onPress={() => this.props.navigation.navigate('Mycard', { data: 0 })} />
                  </View>
                  <Text style={styles.parent_drawerLabel}>My Cart </Text>
                  <View style=
                    {{ backgroundColor: 'red', borderRadius: 100, width: 40, height: 40, marginRight: 40 }}>
                    <Text style={{ color: '#fff', paddingLeft: 15, paddingTop: 10 }}>
                      {this.state.cartproduct_length}
                      {/* {mycartlength !== undefined ? mycartlength.length : 0}  */}
                    </Text>
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
    marginLeft: 25,
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