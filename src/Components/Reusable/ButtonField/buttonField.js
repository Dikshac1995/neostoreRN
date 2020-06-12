import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native'
import { styles } from './style'

export default class ButtonField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sty: this.props.style || {},
            isRound: this.props.isRound || false,
            btnTxtStyle: this.props.btnTxtStyle || {},
            smallBtn: this.props.smallBtn ? styles.smallBtn : {}
        }
    }
    render() {
        // const { textStyles, buttonStyles, children } = this.props;
        return (
            <View>
                <TouchableOpacity disabled={this.props.disbled} style={this.props.disbled == true ?
                    [styles.button1, { opacity: 0.5 }] : styles.button1}
                >
                    <View>
                        <Text style={[this.props.style, styles.buttonText]}

                            onPress={() => this.props.onPress()}> {this.props.text}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
