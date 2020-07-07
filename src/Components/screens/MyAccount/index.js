import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native'
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
import Loader from '../../Reusable/loader/loader'




export default class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer_data: [],
            loading: true,
            imageSource: require('../../../Assets/Images/user-profileIcon.png'),


        }
    }
    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', () => {
            console.log('screen is focused')
            this.fetchCustomerData()

        })
    }
    componentWillUnmount() {
        // Remove the event listener before removing the screen from the stack
        this.focusListener();

    }


    async  fetchCustomerData() {
        let token = await AsyncStorage.getItem('token');
        console.log("data", token)
        const res = await api.fetchapi(api.baseUrl + 'getCustProfile', 'get', " ", token)
        const result = await res.json();
        const customer_profile = result.customer_proile

        console.log(customer_profile, '@@@@')
        // AsyncStorage.getItem('customerDetail')
        //     .then(d => {
        //         const Data = JSON.parse(d);
        //         console.log('123', Data)
        //         Data.customer_details.profile_img =
        //             customer_profile.profile_img;

        //         Data.customer_details.first_name =
        //             customer_profile.first_name;

        //         Data.customer_details.last_name =
        //             customer_profile.last_name;

        //         console.log(Data, 'd1111ata');
        //         AsyncStorage.setItem('customerDetail', JSON.stringify(Data));
        //     })
        //     .done();
        if (customer_profile.profile_img === null) {
            console.log('115', 'profileimg, ')
            this.setState({
                imageSource:
                    require('../../../Assets/Images/user-profileIcon.png')

            })

        }
        else {
            const source = { uri: api.baseUrl + customer_profile.profile_img };
            this.setState({
                imageSource: source
            })

        }

        this.setState({
            customer_data: customer_profile, loading: false,
        })

    }


    render() {


        return (
            // <View style={{ flex: 1, backgroundColor: 'yellow' }}>

            <>
                <Header name1='arrowleft' text=' My Account' name2='search'
                    onPress={() => this.props.navigation.goBack()}
                    onClick={() => this.props.navigation.navigate('serachitem')}
                />
                {/* </View> */}
                {(this.state.loading) ?
                    <Loader name='onLoad'
                        loading={true} /> :
                    <View style={{ flex: 1 }}>
                        {/* <View style={{ flex: 8 }}> */}

                        <View style={styles.myAccount_wrapper}>

                            <ScrollView>
                                <View style={styles.proImage_container}>
                                    <TouchableOpacity onPress={() => this.onChangeImage()}>
                                        <Image style={{ borderRadius: 100, width: 100, height: 100, resizeMode: 'cover' }} source={this.state.imageSource} />
                                    </TouchableOpacity>

                                </View>
                                <TextField name="user" value={this.state.customer_data.first_name} editable={false} />
                                <TextField placeholder="last name" name="user" value={this.state.customer_data.last_name} editable={false} />
                                <TextField placeholder='email Id' name="envelope" value={this.state.customer_data.email} editable={false} />
                                <TextField placeholder="Phone number" name="mobile-phone" value={this.state.customer_data.phone_no} editable={false} />

                                <ButtonField text="EDIT PROFILE"

                                    onPress={() => this.props.navigation.navigate('EditProfile', { data: this.state.customer_data })}
                                    style={styles.edit_button}
                                />



                            </ScrollView>
                        </View>

                        {/* </View> */}

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ResetPassword')}>
                            <View style={styles.reset_button}>
                                <Text style={styles.reset_button_text} >RESET PASSWORD</Text>
                            </View>
                        </TouchableOpacity>
                        {/* </View> */}
                    </View>}
            </>
        )
    }
}
