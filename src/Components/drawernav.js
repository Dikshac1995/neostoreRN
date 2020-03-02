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


 
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        icon={()=><Icon name="couch"/>}
        label="Sofa"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        icon={()=><Icon name="bed"/>}
        label="Bed"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        icon={()=><Icon name="chair"/>}
        label="chair"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        icon={()=><Icon name="table"/>}
        label="Table"
        onPress={() => props.navigation.toggleDrawer()}
          />
      <DrawerItem
        icon={()=><Icon name="bed"/>}
        label="Almirah"
        onPress={() => props.navigation.toggleDrawer()}
      />
      <DrawerItem
        icon={()=><Icon name="location"/>}
        label="Store Locator"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export default class MyDrawer extends Component {
    render() {
        return (
            <Drawer.Navigator drawerContent={props => CustomDrawerContent(props)} >
                <Drawer.Screen name="Homescreen" component={Homescreen} />
                <Drawer.Screen name="loginScreen" component={LoginScreen} />
            </Drawer.Navigator>
        );
    }
}