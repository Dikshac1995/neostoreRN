import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native'
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
import ImagePicker from 'react-native-image-picker';



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
            imageSource: require('../../../Assets/Images/user-profileIcon.png'),
            gender: '',
            first_nameError: ' ',
            last_nameError: ' ',
            upload: false,
            checked: false,

            radioCheck: 'first',
        };
    }
    componentDidMount() {
        const { data } = this.props.route.params;
        console.log("   ", data)
        this.setState({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone_no: data.phone_no,
            gender: data.gender,
            date: data.dob,
        })

        data.gender === 'female ' ?
            this.setState({ redioCkeck: 'second' }) : null

        console.log('fn', this.state.gender)
    }



    async submit() {
        console.log("prof", this.state.imageSource)
        let token = await AsyncStorage.getItem('token');
        let editedData = {}
        editedData.first_name = this.state.first_name,
            editedData.last_name = this.state.last_name,
            editedData.email = this.state.email,
            editedData.phone_no = this.state.phone_no,
            editedData.profile_img = this.state.imageSource,
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

    onChangeImage() {
        const option = {
            quality: 0.7, allowEditing: true, mediaType: 'photo', noData: true,
            storageOption: {
                skipBackup: true,
                path: 'images',
                waitUntilSaved: true,
                cameraRoll: true
            }
        }
        ImagePicker.showImagePicker(option, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {

                const source = { uri: response.uri };
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    upload: true,
                    imageSource: source
                });
            }
        }
        );
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
                        <View style={{ alignItems: 'center', }}>
                            <TouchableOpacity onPress={() => this.onChangeImage()}>
                                <Image style={{ borderRadius: 100, width: 150, height: 150, resizeMode: 'cover' }} source={this.state.imageSource} />
                            </TouchableOpacity>
                        </View>

                        <TextField placeholder="name" name="user" value={this.state.first_name}
                            editable={true}
                            onChangeText={value => this.setState({ first_name: value.trim() })}
                            onBlur={() => {
                                this.setState({
                                    first_nameError: validation('firstName', this.state.first_name)
                                })
                            }} validate={<Text>{this.state.first_nameError}</Text>}
                        />
                        <TextField placeholder="last name" name="user" value={this.state.last_name}
                            editable={true}
                            onBlur={() => {
                                this.setState({
                                    last_nameError: validation('lastName', this.state.last_name)
                                })
                            }}
                            validate={<Text>{this.state.last_nameError}</Text>} />
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
