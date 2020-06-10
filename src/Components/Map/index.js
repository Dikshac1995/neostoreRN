
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { StyleSheet } from 'react-native'
import React from "react";
import { View, Text, Share, Button, TouchableOpacity, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';

import { Marker } from 'react-native-maps';
import { ScrollView } from 'react-native-gesture-handler';
import Headerc from '../../Components/Reusable/header /header'
import { Header, Left, Body, Right, CheckBox, } from 'native-base';

// import { Button } from 'react-native-elements';


const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



export default class Map extends React.Component {



    constructor(props) {
        super(props)
        this.state = {
            extended: false,
            latitude: 18.5789,
            longitude: 73.7385,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,

            // latitude: 18.57899549913118,
            // longitude: 73.7385973893106,
            // latitudeDelta: 0.04864195044303443,
            // longitudeDelta: 0.040142817690068,

            markers: [{
                title: 'Neostore-pimpri',
                coordinates: {
                    latitude: 18.6037,
                    longitude: 73.7731,
                },
            },
            {
                title: 'Neostore-wakad',
                coordinates: {
                    latitude: 18.6187,
                    longitude: 73.8037,
                },
            },
            {
                title: 'Neostore-hinjwadi',
                coordinates: {
                    latitude: 18.6002,
                    longitude: 73.7215,
                },
            }, {
                title: 'Neostore-kothrud',
                coordinates: {
                    latitude: 18.4793,
                    longitude: 73.8713
                },
            },
                // {
                //     title: 'Neostore-kerve',
                //     coordinates: {
                //         latitude: 18.4883,
                //         longitude: 73.8193
                //     },
                // },
                // {
                //     title: 'Neostore-Hinwadi-chouk',
                //     coordinates: {
                //         latitude: 18.5914,
                //         longitude: 73.739
                //     },
                // },
                // {
                //     title: 'Neostore-BlueRidge',
                //     coordinates: {
                //         latitude: 18.58,
                //         longitude: 73.7374
                //     },
                // },
                // {
                //     title: 'Neostore-warje',
                //     coordinates: {
                //         latitude: 18.4709,
                //         longitude: 73.8889,
                //     },}
            ]
        }
    }
    componentDidMount() {
        this.refs.map.fitToElements(true);
    }
    dummyStore() {
        this.setState({
            extended: !this.state.extended
        })

    }

    render() {
        const { marker } = this.props;
        return (
            <>
                <Headerc name1='arrowleft' text='store Location ' name2='search'
                    onPress={() => this.props.navigation.goBack()}
                    onClick={() => this.props.navigation.navigate('share')}
                />

                <Header style={{ backgroundColor: '#841584' }}>
                    <Left>
                        <Icon name={this.state.extended ? 'sign-in-alt' : 'sign-out-alt'} size={25} color="#fff"
                            onPress={() => { this.dummyStore() }}
                        />
                    </Left>
                    <Body>
                        <Text numberOfLines={1} style={{ fontSize: 20, color: "#fff" }}> Stores </Text>
                    </Body>
                    <Right>
                        <Icon name='share-alt' size={25} color="#fff" />
                    </Right>
                </Header>



                <View style={styles.container}>
                    {!this.state.extended ?


                        (<MapView
                            provider={PROVIDER_GOOGLE} // remove if not usinsg Google Maps
                            style={styles.map}
                            ref="map"

                            zoomEnabled={true}
                            showsUserLocation={true}
                            followUserLocation={true}
                            initialRegion={
                                this.state.region


                                // latitude: this.state.region.latitude,
                                // longitude: this.state.longitude,
                                // latitudeDelta: this.state.latitudeDelta,
                                // longitudeDelta: this.state.region.longitudeDelta
                            }
                        // annotations={markers}
                        >
                            {this.state.markers.map(marker => (
                                <MapView.Marker
                                    coordinate={marker.coordinates}
                                    title={marker.title}

                                />
                            )
                            )}
                            {/* <Marker
                                coordinate={{
                                    latitude: this.state.latitude,
                                    longitude: this.state.longitude,
                                }}
                                description="Location"
                                title='Neostore'
                            /> */}

                        </MapView>)
                        :
                        (<View>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <CheckBox checked={true} />
                                <Text style={{ fontSize: 20, paddingLeft: 20 }}>Utitiled Layer</Text>
                            </View>
                            <FlatList
                                data={this.state.markers}
                                renderItem={({ item }) =>
                                    <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', padding: 10, marginLeft: 55 }}
                                        onPress={() => {
                                            this.setState({
                                                extended: false,
                                                latitude: item.coordinates.latitude,
                                                longitude: item.coordinates.longitude,

                                            });
                                        }}>
                                        <Icon name="map-marker" color='red' size={20} />
                                        <Text style={{ fontSize: 20, marginLeft: 10 }}>{item.title}</Text>
                                    </TouchableOpacity>}
                                keyExtractor={item => item.id}
                            />

                        </View>)

                    }


                </View>


                <View style={{ marginTop: 600 }} />
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // ...StyleSheet.absoluteFillObject,
        // height: '100%'
        marginTop: 20,
        height: screen.height - 140,
        // width: screen.width,
        // justifyContent: 'flex-end',
        // alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        flex: 1
    },
});

                // var bounds = new google.maps.LatLngBound();
// for (i = 0; i < LatLngs.length; i++){
//     position = new google.maps.LatLngs(LatLngs[i][0], LatLngs[i], [1]);
//     marker = new google.maps.Marker({
//         position: position,
//         map: map
//     });
//     bounds.extend(position)
// } map.fitBounds(bounds);

// import React from "react";
// import { View, Text } from "react-native";
// import MapView from "react-native-maps";
// export default class Map extends React.Component {
//     render() {
//         return (
//             <View style={{ flex: 1 }}>
//                 <MapView
//                     style={{ flex: 1 }}
//                     initialRegion={{
//                         latitude: 37.78825,
//                         longitude: -122.4324,
//                         latitudeDelta: 0.0922,
//                         longitudeDelta: 0.0421
//                     }}></MapView>
//             </View>
//         );
//     }
// }