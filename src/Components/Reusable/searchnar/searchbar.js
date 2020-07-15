import * as React from 'react';
import * as Animatable from 'react-native-animatable';
import { Text, View, TextInput, Keyboard, FlatList, TouchableOpacity, Image, Alert } from 'react-native'
import { api } from '../../../utils/api'
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './style'

export default class SerachItem extends React.Component {
    constructor(props) {
        super(props);
        //setting default state
        this.state = {
            isLoading: true, text: '',
            searchBarFocused: false,
        };
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

        const url = api.baseUrl + 'getProductBySearchText/'
        var text = text.charAt(0).toUpperCase();

        fetch(url + text)
            .then(res => res.json())//response type
            .then(data => {
                if (data.success) {
                    console.log('suc', data)
                    this.setState({
                        searchBarFocused: false,
                        searchResult: data.product_details,
                    });
                }
                else {
                    Alert.alert("Not found ")
                }
            })
            .catch(error => {
                console.log(error);
            });
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
            <View style={{ flex: 1 }}>
                <View style={styles.headerContainer}>
                    <Animatable.View animation="slideInRight" duration={500}
                        style={styles.headerWrapper}>
                        <Animatable.View animation={this.state.searchBarFocused ? 'fadeInLeft' : 'fadeInRight'} duration={500} style={{ height: 50, backgroundColor: '#fff', flexDirection: 'row', padding: 5, alignItems: 'center' }}>
                            <Icon name={this.state.searchBarFocused ? 'search' : 'arrow-left'} size={20} color='rgb(117, 117, 117)'
                                onPress={() => { 'arrow-left' ? this.props.navigation.goBack() : null }} />
                        </Animatable.View>
                        <View style={styles.searchText_wrapper}>
                            <TextInput placeholder="Search" placeholderTextColor='rgb(117, 117, 117)'
                                style={styles.searchText}
                                onChangeText={value => this.search('text', value)}
                            />
                        </View>
                    </Animatable.View>
                </View>

                <FlatList
                    style={{
                        backgroundColor: this.state.searchBarFocused ? 'rgba(0,0,0,0.3)' : 'white',
                        paddingHorizontal: 15
                    }}
                    data={this.state.searchResult}
                    renderItem={({ item }) =>
                        <View >
                            <TouchableOpacity style={styles.serachList_container}
                                onPress={() => { this.props.navigation.navigate('productDetail', { product_id: item.product_id, product_name: item.product_name }) }}
                            >
                                <View style={{ flex: 1 }}>
                                    <Image style={styles.image} source={{
                                        uri: api.baseUrl + item.product_image
                                    }} />
                                </View>
                                <View style={styles.product_container}>
                                    <Text style={styles.productName}>{
                                        ((item.product_name).length > 20) ?
                                            (((item.product_name).substring(0, 20 - 3)) + '...') :
                                            item.product_name}
                                    </Text>
                                    <Text style={styles.product_producer}>{item.product_producer}</Text>

                                    <Text style={styles.product_cost}>Rs.{item.product_cost}</Text>
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