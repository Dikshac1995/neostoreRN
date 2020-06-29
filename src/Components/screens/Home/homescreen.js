import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from '../../Reusable/header /header'
import SliderBox1 from '../../Reusable/sliderBox'
import { styles } from './style'
import Card from '../../Reusable/card'
import SearchItem from '../../Reusable/searchnar/searchbar'



export default class Homescreen extends Component {

    render() {
        return (
            <SafeAreaView>
                <View style={styles.headerSection}>
                    <Icon name="bars" size={30} color="#fff" onPress={() =>
                        this.props.navigation.openDrawer()} />
                    <Text style={styles.headerTitle}>NeoSTORE</Text>
                    <Icon name="search" size={30} color='#fff'
                        onPress={() =>
                            // <SearchItem />
                            this.props.navigation.navigate('searchitem')
                        }></Icon>
                </View>

                <ScrollView>
                    <View style={{ height: 200, width: '100%' }}>
                        <SliderBox1 />
                    </View>
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





