/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
// import 'react-native-gesture-handler';
import React, { Component } from 'react';
import Main from './src/Components/Main/main'

import { Provider } from 'react-redux';
import store from './src/Redux/Store/store'
// import  List from   './src/Components/peopleList'

class App extends Component {
  render() {
    console.disableYellowBox = true;

    return (
      // <Main/>  
      <Provider store={store}>
        {/* <List/> */}
        <Main />
      </Provider>
    );
  }
}



export default App;
