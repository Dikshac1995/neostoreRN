import React, { useState } from "react";
import { View, Picker, StyleSheet } from "react-native";

export default function QuantityPicker() {
    const [selectedValue, setSelectedValue] = useState("1");
    return (
        <View>
            <Picker
                selectedValue={selectedValue}
                style={{  width: 100 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >    
                <Picker.Item label="1 " value="1" />
                <Picker.Item label=" 2" value="2" />
                <Picker.Item label=" 3" value="3" />
                <Picker.Item label="4 " value="4" />

            </Picker>
        </View>
    );
}

