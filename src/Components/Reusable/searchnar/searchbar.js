import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { Text, View, TextInput, Keyboard, FlatList, TouchableOpacity, Image, Alert } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';
// import { FlatList } from 'react-native-gesture-handler';

const listItem = ['Bed', 'sofa', 'chair', 'table', 'almirah']
export default class SerachItem extends React.Component {
    constructor(props) {
        super(props);
        //setting default state
        this.state = { isLoading: true, text: '', searchBarFocused: false, };
        this.arrayholder = [];
    }



    componentDidMount() {
        this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
        this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
        this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)


    }
    keyboardDidShow = () => {
        this.setState({ searchBarFocused: true })

    }
    keyboardWillShow = () => {
        this.setState({ searchBarFocused: true })
    }
    keyboardWillHide = () => {
        this.setState({ searchBarFocused: false })

    }

    search(field, text) {
        console.warn(field, text)
        const url = 'http://180.149.241.208:3022/getProductBySearchText/'
        var text = text.charAt(0).toUpperCase();
        // const textData = text.toUpperCase();
        console.log(text)
        fetch(url + text)
            .then(res => res.json())//response type
            .then(data => {
                if (data.success) {
                    this.setState({
                        searchBarFocused: false,
                        searchResult: data.product_details,
                    });
                    console.log('dataa', data)
                }
                else {
                    Alert.alert(data.message)
                }
            })
            .catch(error => {
                console.log(error);
            });
        console.log("data23", this.state.searchResult);




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
    // SearchFilterFunction(text) {
    //     //passing the inserted text in textinput
    //     const newData = this.arrayholder.filter(function (item) {
    //         //applying filter for the inserted text in search bar
    //         const itemData = item.product_name ? item.product_name.toUpperCase() : ''.toUpperCase();
    //         const textData = text.toUpperCase();
    //         return itemData.indexOf(textData) > -1;
    //     });
    //     this.setState({
    //         //setting the filtered newData on datasource
    //         //After setting the data it will automatically re-render the view
    //         dataSource: newData,
    //         text: text,
    //     });
    // }

    render() {
        console.log('in serach bar');
        console.log('data3333', this.state.searchResult)
        const { firstQuery } = this.state;
        return (

            <View style={{ flex: 1 }}>
                <View style={{ height: 70, backgroundColor: 'red', justifyContent: 'center', paddingHorizontal: 5 }}>
                    <Animatable.View animation="slideInRight" duration={500} style={{ height: 50, backgroundColor: '#fff', flexDirection: 'row', padding: 5, alignItems: 'center' }}>
                        <Animatable.View animation={this.state.searchBarFocused ? 'fadeInLeft' : 'fadeInRight'} duration={500} style={{ height: 50, backgroundColor: '#fff', flexDirection: 'row', padding: 5, alignItems: 'center' }}>

                            <Icon name={this.state.searchBarFocused ? 'search' : 'arrow-left'} size={25}
                                onPress={() => { 'arrow-left' ? this.props.navigation.goBack() : null }} />
                        </Animatable.View>

                        <TextInput placeholder="search" style={{ fontSize: 20, marginLeft: 15 }}
                            onChangeText={value => this.setState({ text: value.trim() })}
                            onBlur={() => this.search('text', this.state.text)} />
                    </Animatable.View>

                </View>

                <FlatList
                    style={{
                        backgroundColor: this.state.searchBarFocused ? 'rgba(0,0,0,0.3)' : 'white',
                        paddingHorizontal: 15
                    }}
                    data={this.state.searchResult}
                    renderItem={({ item }) =>
                        // 
                        <View >
                            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', padding: 10, alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => { this.props.navigation.navigate('productDetail', { product_id: item.product_id }) }}
                            >
                                <View>
                                    <Image style={{ width: 120, height: 100 }} source={{
                                        uri: 'http://180.149.241.208:3022/' + item.product_image
                                    }} />
                                </View>
                                <View style={{ padding: 20, width: 250 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{
                                        // ((item.product_name).length > 20) ?
                                        // (((item.product_name).substring(0, 20 - 3)) + '...') :
                                        item.product_name}
                                    </Text>
                                    <Text style={{ fontSize: 15 }}>{item.product_material}</Text>

                                    <Text style={{ color: 'red', fontSize: 15, fontWeight: 'bold' }}>Rs.{item.product_cost}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>}
                    keyExtractor={(item, index) => index.toString()
                    }
                    ItemSeparatorComponent={this.FlatListItemSeparator} />

            </View>
        );
    }
}