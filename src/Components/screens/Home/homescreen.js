import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { styles } from './style'
import Card from '../../Reusable/card'
import { connect } from 'react-redux';
import { getImage } from '../../../Redux/Action/listaction'
import { api } from '../../../utils/api'
import { SliderBox } from "react-native-image-slider-box";
import { DrawerActions } from '@react-navigation/native';
// import { DrawerActions } from 'react-navigation';


class Homescreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            images: ' '
        };
    }
    componentDidMount() {
        //Dispatch your dispatcher
        this.props.getImage();
    }
    getData() {
        const { data, loading } = this.props;
        if (this.props.loading) {
            return (
                <View style={{ flex: 1, alignItems: 'center' }}><ActivityIndicator size={30} />
                </View>)
        }
        else {
            var img
            img = this.props.data.map((res) => res.product_image);
            console.log(img, "123")
            var images = img.map((a) => api.baseUrl.concat(a))
            console.log("ncc", images)
            return < SliderBox autoplay circleLoop DotColor="#90A4AE"
                inactiveDotColor="red"
                // onCurrentImagePressed={index => this.onpress(index)}
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
        const { data } = this.props

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.headerSection}>
                    <Icon name="bars" size={30} color="#fff" onPress={() =>
                        this.props.navigation.dispatch(DrawerActions.openDrawer())}
                    // this.props.navigation.openDrawer()} 
                    />
                    <Text style={styles.headerTitle}>NeoSTORE</Text>
                    <Icon name="search" size={30} color='#fff'
                        onPress={() => this.props.navigation.navigate('searchitem')}></Icon>
                </View>
                <View style={{ flex: 0.5, width: '100%', }}>
                    <View>{this.getData()}</View>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
                            <Card name="couch" title="Sofa" position1 {...this.props} category_name="sofa" category_id="5cfe3c5aea821930af69281e" />
                            <Card title="Bed" name="bed"   {...this.props} category_id="5cfe3c65ea821930af69281f" category_name="Bed" />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Card title="Chair" name="chair" position1 {...this.props} category_id="5cfe3c6fea821930af692820" category_name="chair" />
                            <Card title="Table" name="table"{...this.props} category_id="5cfe3c79ea821930af692821" category_name="Table" />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Card title="Almirah" name="dungeon" position1 {...this.props} category_id="5d14c15101ae103e6e94fbe0" category_name="Almirah" />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView >
        )
    }
}
const mapStateToProps = state => ({
    data: state.listReducer.data,
    loading: state.listReducer.loading,
});

//Map your action creators to your props.
const mapDispatchToProps = (dispatch) => {
    return {
        getImage: () => dispatch(getImage())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Homescreen)




