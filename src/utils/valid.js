import React, { useState } from 'react'
import {Text} from 'react-native'

import { Alert } from "react-native";


export default function validation(type, text)
{ 
    // const [error ] = useState('true') ;
    // const  Error  = error 
    console.warn("hiii", type,text)
    // console.warn("error",error)
    const regex = /^[A-Za-z]+$/;
    const passreg = /^[0-9]+$/;
    if (type == 'firstName') {
        // this.setState({ firstName: text })
        // console.warn("firstname state", this.state.firstName)
        if (regex.test(text)) {
            // this.setState({ firstNamevalid: true })
            console.warn("text is valid ")
            return true 
        }
        else {
            // Alert.alert("InValid")
            console.warn("text is Invalid ")
            return ' first name only contain alphabet'
            return  false
            
            
            // this.setState({ firstNamevalid: false })
        }
    }
    else if (type == 'password') {
        this.setState({ password: text })
        if (passreg.test(text)) {
            this.setState({ passwordvalid: true })
            console.warn("text is valid ")
        }
        else {
            this.setState({ passwordvalid: false })
            console.warn("password is invalid ")
        }
    }


}

