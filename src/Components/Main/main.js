import React, {
    Component
}
from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import {
    NavigationContainer
} from '@react-navigation/native';
import {
    createStackNavigator
} from '@react-navigation/stack';
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Homescreen from '../screens/Home/homescreen'
import Splashscreen from '../screens/splashscreen'
import LoginScreen from '../screens/Login/login'
import Registration from '../screens/Register/registration'


const Stack = createStackNavigator();

class Main extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator >
                    <Stack.Screen name="homescreen" component={Homescreen} options={{headerShown: false }}/>
                    <Stack.Screen name="Splashscreen" component={Splashscreen} options={{ headerShown: false }}/>
                    <Stack.Screen name="loginScreen" component={LoginScreen} options={{headerShown: false}} />
                    < Stack.Screen name="Register" component={Registration}
                        options = { {headerStyle: {backgroundColor: 'red'},
                                headerTintColor: '#fff',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                }
                            }
                        }
                        />

                    {/* <Stack.Screen name="listView" component={SectionListBasics} /> */}
                </Stack.Navigator> 
             </NavigationContainer>  
        );
    }
}



export default Main;
