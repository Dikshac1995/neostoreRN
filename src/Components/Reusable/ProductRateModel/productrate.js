import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, StyleSheet } from 'react-native'

class ModalExample extends Component {
    state = {
        modalVisible: false,
    }
    toggleModal(visible) {
        this.setState({ modalVisible: visible });
    }
    render() {
        return (
            <View style={styles.container}>
                <Modal animationType={"slide"} transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { console.log("Modal has been closed.") }}>

                    <View style={styles.modal}>
                        <Text style={styles.text}>Modal is open!</Text>

                        <TouchableHighlight onPress={() => {
                            this.toggleModal(!this.state.modalVisible)
                        }}>

                            <Text style={styles.text}>Close Modal</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>

                {/* <TouchableHighlight onPress={() => { this.toggleModal(true) }}>
                    <Text style={styles.text}>Open Modal</Text>
                </TouchableHighlight> */}
            </View>
        )
    }
}
export default ModalExample

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#ede3f2',
        padding: 100
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f7021a',
        padding: 100
    },
    text: {
        color: '#3f2949',
        marginTop: 10
    }
})











// import React,{useState} from 'react'
// import { Modal, View, Image, Text, StyleSheet } from 'react-native';

// const DisplayModal = (props) =>
// {
//     const [isVisible,setIsVisible] = useState(false)
//    return (
//         <Modal visible={props.isVisible} onRequestClose={() => console.log('closed')}>
//            <View style={{
//                flex: 1,
//                flexDirection: 'column',
//                justifyContent: 'center',
//                alignItems: 'center'
//            }}>
//            </View>
//         </Modal>
//     )
// }   

// export default DisplayModal;


// export default class ModalTester extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isModalVisible: true
//         }
//     }

//     toggleModal = () => {
//         this.setState({ isModalVisible: !this.state.isModalVisible });
//     };

//     render() {
//         return (
//             <View style={{ flex: 1 }}>
//                 <Button title="Show modal" onPress={this.toggleModal} />
//                 <Modal isVisible={props.display } >
//                     <View style={{ flex: 1 }}>
//                         <Text>Hello!</Text> 
//                     </View>
//                 </Modal>
//             </View>
//         );
//     }
// }