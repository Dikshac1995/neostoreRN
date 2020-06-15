import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { globalstyles } from '../../../style/style'
import Header from '../../Reusable/header /header'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { styles } from './style'
import { Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { api } from '../../../utils/api'



export default class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer_data: [],

        }
    }
    componentDidMount() {
        this.fetchCustomerData()
    }

    async  fetchCustomerData() {
        let token = await AsyncStorage.getItem('token');
        console.log("data", token)
        const res = await api.fetchapi('http://180.149.241.208:3022/getCustProfile', 'get', " ", token)
        const result = await res.json();
        const customer_profile = result.customer_proile
        this.setState({ customer_data: customer_profile })
        console.log("api", customer_profile)
        console.log("123", this.state.customer_data)
    }


    render() {


        return (
            <>

                {/* <View> */}

                <Header name1='arrowleft' text=' My Account' name2='search'
                    onPress={() => this.props.navigation.goBack()}
                    onClick={() => this.props.navigation.navigate('share')}
                />
                {/* </View> */}
                <ScrollView>
                    <View>
                        <View style={globalstyles.Container}>

                            <View style={{ alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
                                {/* <Icon name='user-circle' size={120} color="#fff" /> */}
                                <Avatar
                                    size="large"
                                    rounded
                                    showAccessory
                                    icon={{ name: 'user-circle', type: 'font-awesome' }}
                                    onPress={() => Alert.alert("Works!")}
                                    activeOpacity={0.7}
                                />
                            </View>
                            <TextField name="user" value={this.state.customer_data.first_name} editable={false} />
                            <TextField placeholder="last name" name="user" value={this.state.customer_data.last_name} editable={false} />
                            <TextField placeholder='email Id' name="envelope" value={this.state.customer_data.email} editable={false} />
                            <TextField placeholder="Phone number" name="mobile-phone" value={this.state.customer_data.phone_no} editable={false} />

                            <ButtonField text="EDIT PROFILE"

                                onPress={() => this.props.navigation.navigate('EditProfile', { data: this.state.customer_data })}
                                style={styles.edit_button}
                            />
                        </View>
                    </View>
                    <View >
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ResetPassword')}>
                            <View style={{ backgroundColor: 'white', height: 50 }}>
                                <Text style={{
                                    textAlign: 'center', paddingTop: 10, fontSize: 25, paddingBottom: 20
                                }} >Reset Password</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </>
        )
    }
}
