

import { Alert } from "react-native";


export default function validation(type, text, pass) {
    console.log(text, 0)
    var password

    const regex = /^[A-Za-z]+$/;
    const passreg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
    // /^[0-9]+$/;

    const numregx = /^\d{10}$/
    const emailPattern = /^([a-zA-Z])+([0-9a-zA-Z_\.\-])+\@+(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,5}$)$/;

    if (type == 'firstName') {
        if (!text) {
            return 'Please enter First name '
        }
        else if (regex.test(text)) {
            return ' '
        }
        else {
            return 'first name only contain Alphabet '
        }
    }
    if (type == 'lastName') {
        if (!text) {
            return 'Please enter Last name '
        }
        else if (regex.test(text)) {
            return ' '
        }
        else {
            return 'last name only contain alphabet'
        }
    }
    else if (type == 'password') {

        if (passreg.test(text)) {
            password = text

            return ' '
        }
        else {
            return 'Password should be combination of (A,a,@,1) '
        }
    }

    else if (type == 'confirmpassword') {
        console.warn('a', password)
        if (pass == text) {
            return " "
        }
        else {
            return ' password Does not  match '
        }
    }
    else if (type == 'email') {
        if (emailPattern.test(text)) {
            return " "
        }
        else {
            return 'email is Invalid'
        }
    }
    else if (type == 'phoneNo') {
        if (numregx.test(text)) {
            return ' '
        }
        else {
            return 'mobile no is Invalid'
        }
    }
    else if (type == 'Address') {
        if (text.length < 5) {
            Alert.alert('Address must be larger')
            return true
        } else {
            return false

        }
    }
    else if (type == 'Landmark') {
        if (text == ' ') {
            Alert.alert('landMark is required')
            return true
        }
        else {
            return false
        }
    }

    else if (type == 'City') {
        console.warn(" #####", text)
        if (text == '') {
            // console.warn('@@@')
            Alert.alert(' cityis required')
            return true
        }
        else {
            // Alert.alert('ok')
            return false
        }

    }
    else if (type == 'pinCode') {
        if (text == ' ' && text.length < 6) {
            Alert.alert('pin code is required')
            return true
        }
        else {
            return false
        }
    }
    else if (type == 'state') {
        if (text == ' ') {
            Alert.alert('state is required')
            return true
        }
        else {
            return false
        }
    }

    else if (type == 'country') {
        if (text == ' ') {
            Alert.alert('country is required')
            return true
        }
        else {
            return false
        }
    }







}

