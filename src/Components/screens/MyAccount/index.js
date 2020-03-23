import React, { Component } from 'react'
import { Text, View,TouchableOpacity,Image} from 'react-native'
import TextField from '../../Reusable/textField/textField'
import ButtonField from '../../Reusable/ButtonField/buttonField'
import {globalstyles} from  '../../../style/style'
import Header from '../../Reusable/header /header'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome5';
export default class MyAccount extends Component {
    render() {
        return (
            <ScrollView>
            <View>
                <View>
                    <Header name ="arrow-left'" text = " MyAccount" name ="search"></Header>
                </View>
                    <View style={globalstyles.Container}>
                        {/* <Image
                            source={require('./your-img.png')}
                            style={{ width: 400, height: 400, borderRadius: 400 / 2 }}
                        /> */}
                        <View style={{alignItems:'center'}}>
                            <Icon name='user-circle' size={120} color="#fff" />
                        </View>
                <TextField placeholder="name" name="user"/>
                <TextField placeholder="last name" name="user" />
                <TextField placeholder='email Id' name="envelope" />
                <TextField placeholder="Phone number" name="mobile-phone"/>
                <ButtonField text="Edit Profile"
                    //onPress={() => this.login()}
            onPress={() =>this.props.navigation.navigate('EditProfile')}
                />
            
                
            </View>
                </View>
                <View >
                    <TouchableOpacity onPress={() =>this.props.navigation.navigate('ResetPassword')}>
                        <View style={{ backgroundColor: 'white', height: 50}}>
                            <Text style={{
                                textAlign: 'center', paddingTop: 10, fontSize:20
                    }} >Reset Password</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}
