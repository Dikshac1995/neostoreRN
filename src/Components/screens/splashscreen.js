import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,Button, ActivityIndicator
} from 'react-native';



class Splashscreen extends Component {

    componentDidMount() {
        setTimeout(() => this.props.navigation.navigate('loginScreen'), 3000);
    }

    render() {
        return (
            <View style = {styles.splashscreen1}>
                <Text style={styles.splashscreen_message}> Welcome to </Text>
                <Text style={styles.splashscreen_logo} > NeoSTORE </Text> 
                <ActivityIndicator size = "large"  color = "#fff" / >
            </View>
        );
    }
}
const styles = StyleSheet.create({
    splashscreen1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        color: 'white'
    },
    splashscreen_message: {
        color: 'white',
        fontSize: 30,
    },
    splashscreen_logo: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
    }

});
export default Splashscreen;
