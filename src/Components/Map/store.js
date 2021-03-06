// import React, { Component } from 'react';
// import { Text, View, StyleSheet, Dimensions } from 'react-native';
// import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
// import { List } from 'react-native-paper';
// import FaIcon from 'react-native-vector-icons/FontAwesome5';
// import { ScrollView } from 'react-native-gesture-handler';
// import Header from '../../Components/Reusable/header /header'


// const screen = Dimensions.get('window');

// const ASPECT_RATIO = screen.width / screen.height;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



// export class StoreLocator extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             expanded: true,
//             showMap: false,
//             latitude: 18.57899549913118,
//             longitude: 73.7385973893106,
//             latitudeDelta: LATITUDE_DELTA,
//             longitudeDelta: LONGITUDE_DELTA,
//         };
//     }

//     _handlePress = () =>
//         this.setState({
//             expanded: !this.state.expanded,
//         });
//     render() {
//         return (
//             <ScrollView>
//                 <Header name1='arrowleft' text='store Location ' name2='search'
//                     onPress={() => this.props.navigation.goBack()}
//                     onClick={() => this.props.navigation.navigate('share')}
//                 />
//                 <View style={{ flex: 1, marginTop: 500, height: 400 }}>
//                     <List.Accordion
//                         title="Stores"
//                         titleStyle={{ fontSize: 20 }}
//                         left={props => <List.Icon {...props} icon="folder" />}
//                         right={props => <List.Icon {...props} icon="share" />}>

//                         <List.Item
//                             onPress={() => {
//                                 this.setState({
//                                     latitude: 18.57899549913118,
//                                     longitude: 73.7385973893106,
//                                 });
//                             }}
//                             left={() => <List.Icon icon="map-marker" color='red' />}
//                             title="Unititled Layer"
//                             right={() => <List.Icon icon="map-marker" color='red' />}


//                         />
//                         <List.Item
//                             onPress={() => {
//                                 this.setState({
//                                     latitude: 18.57899549913118,
//                                     longitude: 73.7385973893106,
//                                 });
//                             }}
//                             left={() => <List.Icon icon="map-marker" color='red' />}
//                             title="pune-Neosoft Technologies "
//                             style={{ marginLeft: 30 }}
//                         />
//                         <List.Item
//                             onPress={() => {
//                                 this.setState({
//                                     latitude: 19.018045,
//                                     longitude: 72.828343,
//                                 });
//                             }}
//                             left={() => <List.Icon icon="map-marker" color='red' />}
//                             title="Mumbai-Neosoft Technologies "
//                             style={{ marginLeft: 30 }}
//                         />
//                         <List.Item
//                             onPress={() => {
//                                 this.setState({
//                                     latitude: 19.141132,
//                                     longitude: 73.008734,
//                                 });
//                             }}
//                             left={() => <List.Icon icon="map-marker" color='red' />}
//                             title="Rabale-Neosoft Technologies"
//                             style={{ marginLeft: 30 }}
//                         />
//                         <List.Item
//                             onPress={() => {
//                                 this.setState({
//                                     latitude: 19.024405,
//                                     longitude: 72.843736,
//                                 });
//                             }}
//                             left={() => <List.Icon icon="map-marker" color='red' />}
//                             title="Neosoft Office"
//                             style={{ marginLeft: 30 }}
//                         />
//                     </List.Accordion>
//                 </View>
//                 <View style={styles.container}>

//                     <MapView
//                         provider={PROVIDER_GOOGLE}
//                         region={{
//                             latitude: this.state.latitude,
//                             longitude: this.state.longitude,
//                             latitudeDelta: LATITUDE_DELTA,
//                             longitudeDelta: LONGITUDE_DELTA,
//                         }} // remove if not using Google Maps
//                         style={styles.map}>
//                         <Marker
//                             coordinate={{
//                                 latitude: this.state.latitude,
//                                 longitude: this.state.longitude,
//                             }}
//                             description="Location"
//                             title='Neostore'
//                         />
//                     </MapView>
//                 </View>

//             </ScrollView>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         ...StyleSheet.absoluteFillObject,
//         height: 500,
//         width: screen.width,
//         flex: 1,
//         marginTop: 70
//     },
//     map: {
//         ...StyleSheet.absoluteFillObject,
//     },
// });

// export default StoreLocator;