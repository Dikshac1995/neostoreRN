import  React,{Component} from 'react';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import Homescreen from './screens/Home/homescreen'
import LoginScreen from './screens/Login/login'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Text, View ,Image,TouchableOpacity,StyleSheet} from 'react-native'

 
function CustomDrawerContent(props) {
  return (
    <>
      {/* < Image source = {
        {
          uri: 'https://unsplash.com/photos/6VPEOdpFNAs'
        }
      }
      /> */}
      <Icon name="facebook" size={220}/>
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        icon={() => <Icon name="couch" />}
        label="Sofa"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        icon={() => <Icon name="bed" />}
        label="Bed"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        icon={() => <Icon name="chair" />}
        label="chair"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        icon={() => <Icon name="table" />}
        label="Table"
        onPress={() => props.navigation.toggleDrawer()}
      />
      <DrawerItem
        icon = {
          () => < Icon name = "dungeon" />
        }
        label="Almirah"
        onPress={() => props.navigation.toggleDrawer()}
      />
      <DrawerItem
        icon={() => <Icon name="map-marker-alt" />}
        label="Store Locator"
        onPress={() => props.navigation.toggleDrawer()}
      />
      </DrawerContentScrollView>
      </>
  );
}

const Drawer = createDrawerNavigator();

export default class MyDrawer extends Component {
    render() {
        return (
            <Drawer.Navigator drawerContent={props => CustomDrawerContent(props)} drawerType='slide' backgroundColor='yellow' >
                <Drawer.Screen name="Homescreen" component={Homescreen} />
                <Drawer.Screen name="loginScreen" component={LoginScreen} />
            </Drawer.Navigator>
        );
    }
}