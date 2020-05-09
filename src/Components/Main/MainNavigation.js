

import {
    createStackNavigator,
    createDrawerNavigator,
    createSwitchNavigator,
} from 'react-navigation';



const MainNavigation = createSwitchNavigator({
    HomeDrawer: DrawerNav,
    AuthStack: AuthStackNavigation, // You will use this.props.navigation.replace('HomeDrawer') after login process.
})
