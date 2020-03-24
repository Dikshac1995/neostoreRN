import React, { Component } from 'react';
//import react in our code.
import { View, StyleSheet } from 'react-native';
//import all the components we are going to use.
import DatePicker from 'react-native-datepicker';
//import DatePicker from the package we installed

export default class MyDatePicker extends Component {
  constructor(props) {
    super(props);
    //set value in state for initial date
    this.state = { date:'15/03/2020' };
  }

  render() {
    return (
      <View style={styles.container}>
        <DatePicker
          style={{ width: 250 }}
          date={this.state.date} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="DD/MM/YYYY"
          minDate="01-01-1990"
                // maxDate="30-10-2020"
          maxDate={new Date()}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
                  marginLeft: 5,
                 
            },
            dateInput: {
                marginLeft: 5,
                marginRight:100,
                color:'white',
                // borderColor: 'red',
                borderWidth:0
               
            },
          }}
          onDateChange={date => {
            this.setState({ date: date });
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        padding: 4,

    }
})