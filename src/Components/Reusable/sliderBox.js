import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Alert } from 'react-native'
import { SliderBox } from "react-native-image-slider-box";
import { connect } from 'react-redux';
import { getPeople } from '../../Redux/Action/listaction'
import { ActivityIndicator } from 'react-native-paper';
import { api } from '../../utils/api'

class SliderBox1 extends Component {

    componentDidMount() {
        //Dispatch your dispatcher
        this.props.getPeople();

    }
    onpress(index) {
        if (index == 0) {
            this.props.navigation.navigate('Mycard')
            // Alert.alert('index0')
        }
        else if (index == 1) {
            Alert.alert('index 1')
        }


    }

    getData() {

        const { data, loading } = this.props;

        if (this.props.loading) {
            return (<ActivityIndicator size={30} />)

        }
        else {
            var img
            img = this.props.data.map((people) => people.product_image);
            var images = img.map((a) => api.baseUrl.concat(a))
            console.log("ncc", images)
            return < SliderBox autoplay circleLoop DotColor="#90A4AE" inactiveDotColor="red"
                onCurrentImagePressed={index => this.onpress(index)

                }
                images={images}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 10,
                    marginHorizontal: 2,
                    padding: 0,
                    margin: 0
                }} />

        }

    }
    render() {

        return (
            <>
                <View>{this.getData()}</View>
                {/* <SliderBox autoplay circleLoop images={images} /> */}
            </>
        )

    }
}


//Map the redux state to your props.
const mapStateToProps = state => ({
    data: state.listReducer.data,
    loading: state.listReducer.loading,
});

//Map your action creators to your props.
const mapDispatchToProps = (dispatch) => {
    return {
        getPeople: () => dispatch(getPeople())
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(SliderBox1)

//export default connect(mapStateToProps, ac)(SliderBox1)