

import { Alert } from "react-native";


export default function validation(type, text, pass) {
    console.log(text, 0, pass)

    const regex = /^[A-Za-z]+$/;
    const passreg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/


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
            return ' '
        }
        else {
            return 'Password should be combination of (A,a,@,1) '
        }
    }

    else if (type == 'confirmpassword') {
        console.log("conpass", text, "sd", pass)
        if (text == " " || !text) {
            return 'confirm Password is Required '
        }
        else if (pass === text) {
            return " "
        }
        else {
            return 'Password Does not  match '
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
        const otp_regx = /^\d{4}$/

        if (!text) {
            return 'otp is Required '
        }
        else if (otp_regx.test(text)) {
            return ' '
        }
        else {
            return 'otp is Invalid'
        }
    }
    else if (type == 'Address') {
        if (!text) {
            return 'Address is Required'
        }
        if (text.length < 10) {
            return 'Address contain at least 10 charcter'

        } else {
            return ' '


        }
    }
    else if (type == 'Landmark') {
        console.log(text, '123')
        if (!text) {
            console.log(text, '1')
            // Alert.alert('landMark is required')
            return 'Landmark is Required '
        }
        else if (!regex.test(text)) {
            return ' LandMark is invalid'
        }
        else {
            return ' '
        }
    }

    else if (type == 'City') {
        console.warn(" #####", text)
        if (!text) {

            return ' City is Required'
        }
        else {
            // Alert.alert('ok')
            return ' '
        }

    }
    else if (type == 'pinCode') {
        console.log(text, '12')
        var pincode_regx = /^\d{6}$/
        if (text == " ") {
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
    else if (type == 'State') {
        console.log(text, '1')
        if (text == " ") {
            console.log(text, '2')
            return 'state is Required '
        }
        else {
            return '  '
        }
    }

    else if (type == 'country') {
        if (text == " ") {
            // Alert.alert('country is required')
            return ' country is Required '
        }
        else {
            return ' '
        }
    }







}

