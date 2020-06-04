
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { StyleSheet } from 'react-native'
import React from "react";
import { View, Text, Share } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';

import { Marker } from 'react-native-maps';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../../Components/Reusable/header /header'


const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



export default class Map extends React.Component {



    constructor(props) {
        super(props)
        this.state = {
            extended: false,
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
            {
                title: 'Neostore-kerve',
                coordinates: {
                    latitude: 18.4883,
                    longitude: 73.8193
                },
            },
            {
                title: 'Neostore-Hinwadi-chouk',
                coordinates: {
                    latitude: 18.5914,
                    longitude: 73.739
                },
            },
            {
                title: 'Neostore-BlueRidge',
                coordinates: {
                    latitude: 18.58,
                    longitude: 73.7374
                },
            },
            {
                title: 'Neostore-warje',
                coordinates: {
                    latitude: 18.4709,
                    longitude: 73.8889,
                },
            }]
        }
    }
    componentDidMount() {
        this.refs.map.fitToElements(true);
    }


    render() {
        const { marker } = this.props;
        return (
            <ScrollView>
                <Header name1='arrowleft' text='store Location ' name2='search'
                    onPress={() => this.props.navigation.goBack()}
                    onClick={() => this.props.navigation.navigate('share')}
                />
                <View style={styles.container}>

                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not usinsg Google Maps
                        style={styles.map}
                        ref="map"
                        // fitToElements
                        zoomEnabled={true}
                        showsUserLocation={true}
                        followUserLocation={true}
                        initialRegion={{
                            latitude: 18.58,
                            longitude: 73.7374,
                            latitudeDelta: 0.0922,
                            // longitudeDelta: 0.0421,
                            longitudeDelta: LONGITUDE_DELTA
                        }}
                    // annotations={markers}
                    >
                        {this.state.markers.map(marker => (
                            <MapView.Marker
                                coordinate={marker.coordinates}
                                title={marker.title}

                            />
                        )
                        )}
                        {/* <Marker coordinate={{ latitude: 18.6187, longitude: 73.8037}}
                        pinColor={"purple"} // any color
                        title={"Neostor"}
                        description={"e-Shop"} /> 
                    <Marker coordinate={{ latitude: 18.516726, longitude: 73.856255}}
                        pinColor={"red"} // any color
                        title={"Neostor"}
                        description={"e-Shop"} /> */}

                    </MapView>
                    {/* <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                > */}

                    {/* <Marker
                        coordinate={marker.coordinate}
                            title='neostore'
                            description= 'ecoomrse shop'
                        />
                 */}
                    {/* </MapView> */}

                </View>
                <View style={{ backgroundColor: '#e0e', padding: 10, marginTop: 550, height: 40 }}>
                    <Text>Store</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: screen.height - 100,
        width: screen.width,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
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