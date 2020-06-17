import React, { Component } from 'react'
import { Text, View, } from 'react-native'
import Header from '../../Reusable/header /header';

export default class Myorder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myOder: []
        }
    }
    componentDidMount() {
        this.getdata()
    }

    async getdata() {
        try {
            const value = JSON.parse(await AsyncStorage.getItem('myOrder'));
            console.log("place order", value)

        } catch (error) {
            console.log(error)
        }

    }
    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    }
    render() {

        return (

            <View>
                <Header name1='arrowleft' text='My order' name2='search'
                    onPress={() => this.props.navigation.goBack()}
                    onClick={() => this.props.navigation.navigate('searchitem')}
                />
                <Text> textInComponent </Text>

            </View>
        )
    }
}
