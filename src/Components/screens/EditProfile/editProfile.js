import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { globalstyles } from '../../../style/style'
import Header from '../../Reusable/header /header'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-datepicker';

import MyDatePicker from '../../Reusable/datePicker'
import {styles} from './styles'
export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        //set value in state for initial date
        this.state = { date: '' };
    }
    render() {
        return (
            <ScrollView>
                <View>
                {/* <View>
                        <Header name="arrow-left'" text=" MyAccount" name="search"></Header>
                    </View> */}
                    <View style={globalstyles.Container}> 
                        
                        {/* <Image
                            source={require('./your-img.png')}
                            style={{ width: 400, height: 400, borderRadius: 400 / 2 }}
                        /> */}
                        <View style={{ alignItems: 'center' }}>
                            <Icon name='user-circle' size={120} color="#fff" />
                        </View>
                        <TextField placeholder="name" name="user" />
                        <TextField placeholder="last name" name="user" />
                        <TextField placeholder='email Id' name="envelope" />
                        <TextField placeholder="Phone number" name="mobile-phone" />
                        {/* sss */}
                         {/* <View style ={{borderColor:"white",borderWidth:2}}> */}
                            {/* <MyDatePicker /> */}
                         {/* </View> */}
                          
                        <View style={styles.container1}>
                            <DatePicker
                                style={{ width: 250, color: '#fff', fontSize: 50 }}
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
                                        marginRight: 80,
                                        paddingLeft: 10,
                                        borderWidth: 0

                                    },
                                    dateText: {
                                        color: '#fff',
                                        fontSize: 20
                                    },
                                    placeholderText: {
                                        color: 'rgba(255,255,255,0.7)',
                                        fontSize:20
                                    }
                                }}
                                onDateChange={date => {
                                    this.setState({ date: date });
                                }}
                            />
                        </View>
                        <ButtonField text='SUBMIT'
                            style={styles.submit_button}
                            //onPress={() => this.login()}
                            onPress={() => this.props.navigation.navigate('Register')}
                        />


                    </View>
                </View>
                      
            </ScrollView>
        )
    }
}
