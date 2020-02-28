import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { SliderBox} from "react-native-image-slider-box";

export default class SliderBox1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                "https://source.unsplash.com/1024x768/?nature",
                "https://source.unsplash.com/1024x768/?water",
                "https://source.unsplash.com/1024x768/?girl",
                "https://source.unsplash.com/1024x768/?tree", // Network image
                 // Local image
            ]
        };
    }
    render() {
        return (
           <View style={styles.container}>
                <SliderBox
                    autoplay
                    circleLoop
          images={this.state.images}
          
        />
      </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
