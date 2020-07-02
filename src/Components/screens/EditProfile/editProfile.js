import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import { globalstyles } from '../../../style/style'
import { ScrollView } from 'react-native-gesture-handler'
import DatePicker from 'react-native-datepicker';
import validation from '../../../utils/valid'
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { styles } from './styles'
import { api } from '../../..//utils/api'
import ImagePicker from 'react-native-image-picker';
import Loader from '../../Reusable/loader/loader'
import RNFetchBlob from 'rn-fetch-blob'



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
            emailError: ' ',
            phone_noError: ' ',
            upload: false,
            checked: false,
            radioCheck: '',
            img_filename: ' ',
            loading: true,
            selectedImage: ' '
        };
    }
    componentDidMount() {
        const { data } = this.props.route.params;
        console.log(" data  ", data, data.gender)
        const source = { uri: api.baseUrl + data.profile_img };

        this.setState({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone_no: data.phone_no,
            gender: data.gender,
            date: data.dob,
            imageSource: source,
            loading: false
        })
        if (data.gender === "female") {
            this.setState({ radioCheck: 'second' })
        }
        else {
            this.setState({ radioCheck: 'first' })
        }
    }


    async submit() {
        let token = await AsyncStorage.getItem('token');

        console.log(this.state.selectedImage, 'selectedImage')
        if (this.state.selectedImage == " ") {
            console.log('data')
            this.setState({ loading: true })

            api.fetchapi('http://180.149.241.208:3022/profile', 'put',
                JSON.stringify(
                    {
                        first_name: this.state.first_name,
                        last_name: this.state.last_name,
                        email: this.state.email,
                        phone_no: this.state.phone_no,
                        gender: this.state.gender,

                        dob: this.state.date
                    }
                ), token).then((res) => {
                    res.json().then((responseJSON) => {
                        console.log("responseJSON", responseJSON);
                        Alert.alert(responseJSON.message)

                        this.storeData(responseJSON)
                        this.setState({
                            loading: false,

                        })
                    })
                })

        }
        // this.onuploadimage()
        const err = this.state.last_nameError
        if (this.state.last_nameError !== ' ' || this.state.first_nameError !== ' '
            || this.state.emailError !== ' '
            || this.state.phone_noError !== ' ') {
            Alert.alert("Please Fill  Required Information  ")
        }



    }
    async  onuploadimage() {
        let token = await AsyncStorage.getItem('token');
        console.log('token ', token)
        const { selectedImage } = this.state
        console.log(selectedImage.fileName, 'image')
        this.setState({ loading: true })
        RNFetchBlob.fetch(
            'PUT',
            'http://180.149.241.208:3022/profile',
            {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'multipart/form-data',
            }, [

            {
                name: 'profile_img', filename: selectedImage.fileName, type: selectedImage.type,
                data: RNFetchBlob.wrap(selectedImage.path)
            },

            { name: 'first_name', data: this.state.first_name },
            { name: 'last_name', data: this.state.last_name },
            { name: 'email', data: this.state.email },
            {
                name: 'dob', data: this.state.date
            },
            { name: 'phone_no', data: this.state.phone_no },
            { name: 'gender', data: this.state.gender },


        ]).then((resp) => {
            const data = JSON.parse(resp.data);
            console.log(data.customer_details, "res")
            if (data.success === true) {
                AsyncStorage.getItem('customerDetail')
                    .then(d => {
                        const Data = JSON.parse(d);

                        Data.customer_details.profile_img =
                            data.customer_details.profile_img;

                        Data.customer_details.first_name =
                            data.customer_details.first_name;

                        Data.customer_details.last_name =
                            data.customer_details.last_name;
                        AsyncStorage.setItem('customerDetail', JSON.stringify(Data));
                    })
                    .done();

                Alert.alert(data.message);
                this.setState({ loading: false })
                this.props.navigation.navigate('MyAccount')

            }
        }).catch((err) => {
            console.log(err)
            this.setState({ loading: false })

        })
    }
    storeData(data) {
        console.log('dw', data)
        AsyncStorage.getItem('customerDetail')
            .then(d => {
                const Data = JSON.parse(d);
                Data.customer_details.profile_img =
                    data.customer_details.profile_img;

                Data.customer_details.first_name =
                    data.customer_details.first_name;

                Data.customer_details.last_name =
                    data.customer_details.last_name;
                AsyncStorage.setItem('customerDetail', JSON.stringify(Data));
                console.log(Data, 'data123')
            })
            .done();

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
                const file = response.fileName
                console.log('filename', ' data: image / png; base64', file)
                this.setState({
                    upload: true,
                    imageSource: source,
                    // img_filename: ' data: image / png; base64' + file,
                    img_filename: file,
                    selectedImage: response
                });
            }
        }
        );
    }
    render() {
        const { data } = this.props.route.params;
        console.log(this.state.first_name, " state")
        console.log('fn', this.state.radioCheck)


        return (
            <ScrollView>

                <Loader
                    loading={this.state.loading} />
                <View>

                    <View style={globalstyles.Container}>
                        <View style={{ alignItems: 'center', }}>
                            <TouchableOpacity onPress={() => this.onChangeImage()}>
                                <Image style={{ borderRadius: 100, width: 150, height: 150, resizeMode: 'cover' }} source={this.state.imageSource} />
                            </TouchableOpacity>
                        </View>

                        <TextField placeholder="name" name="user" value={this.state.first_name}
                            editable={true}
                            onChangeText={value => this.setState({
                                first_name: value.trim(),
                                first_nameError: validation('firstName', value)
                            }
                            )}
                            validate={<Text>{this.state.first_nameError}</Text>}
                        />
                        <TextField placeholder="last name" name="user" value={this.state.last_name}
                            editable={true}
                            onChangeText={value => this.setState({
                                last_name: value.trim(),
                                last_nameError: validation('lastName', value)
                            })}
                            validate={<Text>{this.state.last_nameError}</Text>} />
                        <TextField placeholder='email Id' name="envelope" value={this.state.email}
                            editable={true}
                            onChangeText={value => this.setState({
                                email: value.trim(),
                                emailError: validation('email', value)
                            })}
                            validate={<Text>{this.state.emailError}</Text>} />
                        <TextField placeholder="Phone number" name="mobile-phone" value={this.state.phone_no}
                            editable={true}
                            keyboardType={"number-pad"}
                            maxLength={10}
                            onChangeText={value => this.setState({
                                phone_no: value.trim(),
                                phone_noError: validation('phoneNo', value)
                            })}
                            validate={<Text>{this.state.phone_noError}</Text>} />


                        <View style={styles.container1}>
                            <DatePicker
                                style={{ width: 250, fontSize: 50 }}
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
                        // onPress={() => this.onuploadimage()}

                        />

                    </View>
                </View>

            </ScrollView>
        )
    }
}
