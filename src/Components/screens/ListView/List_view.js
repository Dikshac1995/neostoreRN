import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import {styles} from "./style"
export default class SectionListBasics extends Component {
    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    sections={[
                        { title: 'D', data: ['Diksha', 'Darshana'] },
                        { title: 'J', data: ['Jack', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie'] },
                    ]}
                    renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
                    renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}


