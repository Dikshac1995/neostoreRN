/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
// import 'react-native-gesture-handler';
import React, { Component}from 'react';
import {SafeAreaView,StyleSheet,
  ScrollView,View,
  Text,StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Splashscreen from './src/Components/screens/splashscreen'
import LoginScreen from './src/Components/screens/Login/login'
import SectionListBasics from './src/Components/screens/ListView/List_view'

const Stack = createStackNavigator();

class App extends Component {
  render() {
   
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Splashscreen" component={Splashscreen} options={{
            title: '',headerStyle: {backgroundColor: 'red'}
          }}/>
          <Stack.Screen name="loginScreen" component={LoginScreen} options={{
            title: 'Login', headerStyle: { backgroundColor: 'red' },headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }
          }/>
          <Stack.Screen name="listView" component={SectionListBasics} />
        </Stack.Navigator>
      </NavigationContainer>  
  
      
    );
  }
}



export default App;
