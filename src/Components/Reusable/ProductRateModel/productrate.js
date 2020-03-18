
import React,{useState} from 'react'
import { Modal, View, Image, Text, StyleSheet } from 'react-native';

const DisplayModal = (props) =>
{
    const [isVisible,setIsVisible] = useState(false)
   return (
        <Modal visible={props.isVisible} onRequestClose={() => console.log('closed')}>
           <View style={{
               flex: 1,
               flexDirection: 'column',
               justifyContent: 'center',
               alignItems: 'center'
           }}>
           </View>
        </Modal>
    )
}   

export default DisplayModal;


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