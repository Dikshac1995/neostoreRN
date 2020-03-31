import React, { Component } from 'react'
import { Text, View ,TouchableOpacity} from 'react-native'

export default class Mycard extends Component {
    render() {
        return (
            <View style ={{display:'flex'}}>
                <Text> textInComponent </Text>
                <View style={{justifyContent:'center',backgroundColor:'red'}}>
                <View style ={{display:'flex',flexDirection:'row'}}>
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
