import { Alert } from "react-native";

export default function updateValues(text, type,valid)
{
    const validation = valid
    console.log("lhf",validation);
    const regex = /^[A-Za-z]+$/;
    const passreg = /^[0-9]+$/;
    const emailPattern = /^([a-zA-Z])+([0-9a-zA-Z_\.\-])+\@+(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,5}$)$/;
    console.warn("text is valid", text, type);
    if (type == 'username') {
        this.setState({ firstName: text })
        console.warn("firstname state", this.state.firstName)
        if (regex.test(text)) {
            this.setState({ firstNamevalid: true })
            console.warn("text is valid ")
        }
        else {
            this.setState({ firstNamevalid: false })
            //console.warn("text is valid ")
            //console.warn("text is invalid ")
        }
    }
    if (type == 'lastname') {
        // this.setState({ lastName: text })
        if (regex.test(text)) {
            Alert.alert("valid")
            //return ({ validation :true})
        //     this.setState({ lastNamevalid: true })
       // console.warn("lastname is valid ")
        }
        else {
            console.warn("text is invalid123 ")
            // this.setState({ lastNamevalid: false })
            return ({ validation:false})
            
        }
    }
    else if (type == 'password') {
        this.setState({ password: text })
        if (passreg.test(text)) {
            this.setState({ passwordvalid: true })
            //console.warn("text is valid ")
        }
        else {
            this.setState({ passwordvalid: false })
            //console.warn("password is invalid ")
        }
    }
    else if (type == 'confirmpassword') {
        this.setState({ comfirmPassword: text })
        if (passreg.test(text)) {
            this.setState({ confirmpasswordvalid: true })
            //console.warn("text is valid ")
        }
        else {
            this.setState({ confirmpasswordvalid: false })
            //console.warn("password is invalid ")
        }
    }
    else if (type == 'email') {
        this.setState({ email: text })
        if (emailPattern.test(text)) {
            this.setState({ emailvalid: true })
            //console.warn("text is valid ")
        }
        else {
            this.setState({ emailvalid: false })
            //console.warn("password is invalid ")
        }
    }
    else if (type == 'phoneno') {
        this.setState({ phoneNo: text })
        if (passreg.test(text)) {
            this.setState({ phoneValid: true })
            //console.warn("text is valid ")
        }
        else {
            this.setState({ phoneValid: false })
            //console.warn("password is invalid ")
        }
    }
}