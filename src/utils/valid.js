

import { Alert } from "react-native";


export default function validation(type, text, pass) {
    console.log(text, 0)

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
            return 'First name only contain Alphabet '
        }
    }
    if (type == 'lastName') {
        if (!text) {
            return 'Please enter last  name '
        }
        else if (regex.test(text)) {
            return ' '
        }
        else {
            return 'Last name only contain Alphabet '
        }


    }
    else if (type == 'password') {
        if (!text) {
            return 'Password is Required '
        }

        else if (passreg.test(text)) {
            password = text

            return ' '
        }
        else {
            return 'Password should be combination of (A,a,@,1) '
        }
    }

    else if (type == 'confirmpassword') {
        if (!text) {
            return ' confirm Password is Required '
        }

        else if (pass == text) {
            return " "
        }
        else {
            return ' Password Does not  match '
        }
    }
    else if (type == 'email') {
        if (!text) {
            return 'Email id  is Required '
        }

        else if (emailPattern.test(text)) {
            return " "
        }
        else {
            return 'Email is Invalid'
        }
    }
    else if (type == 'phoneNo') {
        if (!text) {
            return 'Mob no is Required '
        }
        else if (numregx.test(text)) {
            return ' '
        }
        else {
            return 'Mobile no is Invalid'
        }
    }
    else if (type == 'otp') {
        if (!text) {
            return 'otp is Required '
        }
        else if (numregx.test(text)) {
            return ' '
        }
        else {
            return 'otp is Invalid'
        }
    }
    else if (type == 'Address') {
        if (text.length < 8) {
            return 'Address must be larger'

        } else {
            return ' '


        }
    }
    else if (type == 'Landmark') {
        if (text == ' ') {
            // Alert.alert('landMark is required')
            return 'landMark is required'
        }
        else {
            return ' '
        }
    }

    else if (type == 'City') {
        console.warn(" #####", text)
        if (text == '') {

            return ' city is required'
        }
        else {
            // Alert.alert('ok')
            return ' '
        }

    }
    else if (type == 'pinCode') {
        var pincode_regx = /^ [0 - 9]  $/
        if (!text) {
            // Alert.alert()
            return 'Zip code is Required'
        }
        else if (!pincode_regx.test(text)) {
            // Alert.alert()
            return 'zip  code  must be 6 digit number '

        }
        else {
            return '  '

        }
    }
    else if (type == 'state') {
        if (!text) {

            return 'State is Required'
        }
        else {
            return ' '
        }
    }

    else if (type == 'country') {
        if (!text) {
            // Alert.alert('country is required')
            return 'Country is Required'
        }
        else {
            return ' '
        }
    }







}

