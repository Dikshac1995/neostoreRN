import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { SliderBox } from "react-native-image-slider-box";
import { connect } from 'react-redux';
import fetchImages from '../../../Redux/Action/index'

 export default class SliderBox1 extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            // images: [
            //     "https://source.unsplash.com/1024x768/?nature",
            //     "https://source.unsplash.com/1024x768/?water",
            //     "https://source.unsplash.com/1024x768/?girl",
            //     "https://source.unsplash.com/1024x768/?tree", // Network image
            //      // Local image
            // ],
            dataSource: [],

        };
    } 
    componentDidMount() {
        
      // this.props.fetchImages();
        return fetch('http://180.149.241.208:3022/getAllCategories')
            .then(res => res.json())
            .then(response => {
                this.setState({
                    dataSource: response.category_details,
                });
            })
            .catch(error => {
                console.log(error);
       });
    }
    
    render() {
     //const   images = this.props;
        // console.log("images slider ", sliderImage);
        const imageData = this.state.dataSource;
        let res = imageData.map(a => a.product_image);
        const url = 'http://180.149.241.208:3022/';
        let Image = res.map((a) => { return url.concat(a) })
        console.log('rr',Image);
        console.log('hh',this.state.images)
        return (
        <View style={styles.container}>
                <SliderBox autoplay circleLoop images={Image} />
                {/* <SliderBox autoplay circleLoop images={images} /> */}
      </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

// const mapStateToProps = state=> {
//     const { data } = state.imageReducer;
//     return {
//         // sliderImage: state.imageReducer
//         data
//     }
// }
// const mapDispatchToProps = dispatch => {
//     return {
//           fetchImages:()=>dispatch(fetchImages())
//       }
// }
  
// export default connect(mapStateToProps, mapDispatchToProps)(SliderBox1)