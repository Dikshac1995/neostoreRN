import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList, Image } from 'react-native'

export default class Myorder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myOder: []
        }
    }
    componentDidMount() {
        this.getData()
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


            <View style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Text> textInComponent </Text>
                <View style={{ justifyContent: 'center', backgroundColor: 'red' }}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text>Rs.500000</Text>
                        <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 5, width: 200, height: 50 }}

                            onPress={this.oderNow}
                        >
                            <Text style={{ justifyContent: "center", color: 'white', fontSize: 20, marginLeft: 50, marginTop: 10 }}>
                                Order Now</Text>
                        </TouchableOpacity>
                    </View></View>
            </View>
        )
    }
}
