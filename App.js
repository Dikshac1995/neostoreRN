/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
// import 'react-native-gesture-handler';
import React, { Component}from 'react';
import Main from './src/Components/Main/main'

// import {Provider} from 'react-redux';
// import store from './src/redux/store/store';

class App extends Component {
  render() {
    return (
      <Main/>  
      // <Provider store={store}>
      //   <Login/>
      // </Provider>
    );
  }
}



export default App;
