import { useState } from "react";
import { Text, StyleSheet, View, TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";

const ScrollPick = ({ options }) => {
    const [option, setOption] = useState(options[0].label);

    return (
        <View>
            <Picker
                selectedValue={option}
                onValueChange={currentOption => setOption(currentOption)}
            >
                {options.map((option) => {
                    <Picker.Item label={option.label} value={option.value} />
                })}
            </Picker>
            <Text>Selected: {option}</Text>
        </View>
    )
}

export default ScrollPick;