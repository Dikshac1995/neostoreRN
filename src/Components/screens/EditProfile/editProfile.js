import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { globalstyles } from '../../../style/style'
import { ScrollView } from 'react-native-gesture-handler'
import DatePicker from 'react-native-datepicker';
import { Avatar } from 'react-native-elements';
import validation from '../../../utils/valid'
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { styles } from './styles'
import { api } from '../../..//utils/api'


export default class EditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: '',
            first_name: '',
            last_name: ' ',
            email: ' ',
            phone_no: ' ',
            profile_img: ' ',
            // radioCheck: 'first',
            checked: false,

            radioCheck: 'first',
        };
    }
    componentDidMount() {
        const { data } = this.props.route.params;
        console.log("   ", data.gender)
        this.setState({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone_no: data.phone_no,
            profile_img: data.profile_img,
            date: data.dob,
        })

        data.gender === 'female ' ?
            this.setState({ redioCkeck: 'second' }) : null

        console.log('fn', this.state.gender)
    }



    async submit() {
        let token = await AsyncStorage.getItem('token');
        let editedData = {}
        editedData.first_name = this.state.first_name,
            editedData.last_name = this.state.last_name,
            editedData.email = this.state.email,
            editedData.phone_no = this.state.phone_no,
            editedData.profile_img = this.state.profile_img
        editedData.date = this.state.date
        console.log("editedData", editedData)

        const res = await api.fetchapi('http://180.149.241.208:3022/profile', 'put',
            JSON.stringify({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                phone_no: this.state.phone_no,
                gender: this.state.gender,
                dob: this.state.date
            }), token)
        const result = await res.json();
        console.log("api", result)
        if (result.success === true) {

            Alert.alert(
                'your profile updated successfully ',
                ' see  profile  ',
                [

                    {
                        text: 'ok', onPress: () => {
                            this.props.navigation.navigate('MyAccount')
                        }
                    },
                ],
                { cancelable: false }
            )
        }
        else {
            console.log(result.json, " g")
            Alert.alert("result.error_message")
        }
    }

    render() {
        const { data } = this.props.route.params;
        // this.setState({ first_name: data.first_name })
        console.log(this.state.first_name, " state")
        console.log('fn', this.state.radioCheck)


        return (
            <ScrollView>
                <View>

                    <View style={globalstyles.Container}>


                        <View style={{ alignItems: 'center' }}>

                            <Avatar
                                size="xlarge"
                                rounded
                                showAccessory
                                icon={{ name: 'user-circle', type: 'font-awesome' }}
                                onPress={() => Alert.alert("Works!")}
                                activeOpacity={0.7}
                            />
                        </View>
                        <TextField placeholder="name" name="user" value={this.state.first_name} editable={true}

                            onChangeText={value => this.setState({ first_name: value.trim() })}
                            onBlur={() => {
                                this.setState({
                                    first_nameError: validation('password', this.state.first_name)
                                })
                            }} />
                        <TextField placeholder="last name" name="user" value={this.state.last_name} />
                        <TextField placeholder='email Id' name="envelope" value={this.state.email} />
                        <TextField placeholder="Phone number" name="mobile-phone" value={this.state.phone_no} />


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
                                        fontSize: 20
                                    }
                                }}
                                onDateChange={date => {
                                    this.setState({ date: date });
                                }}
                            />
                        </View>
                        <View style={styles.GenderField}>
                            <Text style={styles.Gender}> Gender </Text>
                            <RadioButton value="first"
                                status={this.state.radioCheck === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    this.setState({
                                        radioCheck: 'first',
                                        gender: 'male'
                                    });
                                }} />
                            <Text style={
                                styles.GenderName
                            }> Male </Text>
                            <RadioButton value="second" status={this.state.radioCheck === 'second' ? 'checked' : 'unchecked'}
                                onPress={() => { this.setState({ radioCheck: 'second', gender: 'female' }); }} />
                            <Text style={styles.GenderName}> Female </Text>
                        </View>

                        <ButtonField text='SUBMIT'
                            style={styles.submit_button}
                            //onPress={() => this.login()}
                            onPress={() => this.submit()}
                        />


                    </View>
                </View>

            </ScrollView>
        )
    }
}
