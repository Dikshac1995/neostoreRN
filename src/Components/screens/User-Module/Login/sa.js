

const value = await AsyncStorage.getItem('token')
console.warn("--------", this.state.emailValid, this.state.passValid)
if ((!this.state.email) && (!this.state.pass) && (this.state.emailValid) && (this.state.passValid)) {
    Alert.alert(" fill the required detail ")
}
else {
    this.props.login(this.state.email, this.state.pass).then(() => {
        if (this.props.error) {
            console.log('================', this.props.isLoggedIn)
            console.log(this.props.error)
            Alert.alert(this.props.error)
        }
        else {
            console.log('================', this.props.isLoggedIn)
            console.log('login successfully')
            Alert.alert('login successfully')
            this.props.navigation.navigate('Homescreen')
            //    Alert.alert(this.props.userData.user.name + ' user successfully logged in ')
        }

    })
}