

import { Alert } from "react-native";


export default function validation(type, text)
{   var password
    console.warn("hiii", type,text)
    const regex = /^[A-Za-z]+$/;
    const passreg = /^[0-9]+$/;
    const numregx = /^\d{10}$/
    const emailPattern = /^([a-zA-Z])+([0-9a-zA-Z_\.\-])+\@+(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,5}$)$/;
  
    if (type == 'firstName') {
        if (regex.test(text))
        {
           return  true 
        }
        else
        {
          return 'first name only contain alphabet'
        }
    }
    if (type == 'lastName') {
        if (regex.test(text)) {
            return true
        }
        else {
            return 'last name only contain alphabet'
        }
    }
    else if (type == 'password') {
   
        if (passreg.test(text)) {
            password = text
            console.warn('pass', password)
            return ' '
        }
        else {
            return 'Password should be numeric '
        }
    }
        
    else if (type == 'confirmpassword') {
        console.warn('a', password)
        if (password == text) {
            return " "
        }
        else {
            return ' password Dont match '
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
            return false
        } else {
            return true
            
        }
    }
    else if (type == 'Landmark') {
        if (text == ' ') {
            Alert.alert('landMark is required')
            return false
        }
        else {
            return true
        }
    }
   
    else if (type == 'City') {
        console.warn(" #####",text)
        if (text == '  ') {
            Alert.alert('City is required s')
            return false 
        }
        else {
            return true
        }
    }
    else if (type == 'pinCode') {
        if (text == ' ' && text.length<6) {
            Alert.alert('pin code is required')
            return false
        }
        else {
            return true
        }
    }
    else if (type == 'state') {
        if (text == ' ' ) {
            Alert.alert('state is required')
            return false
        }
        else {
            return true
        }
    }

    else if (type == 'country') {
        if (text == ' ') {
            Alert.alert('country is required')
            return false
        }
        else {
            return true
        }
    }







}

