import { View, Text, TextInput } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";

const CustomInput = ({ value, setValue, placeholder, secureTextEntry }) => {
 return (
   <TextInput
    value={value}
    onChangeText={setValue}
    placeholder={placeholder}
    secureTextEntry={secureTextEntry}
    style={styles.input}
    placeholderTextColor="#999"
   />
 );
};

const styles = StyleSheet.create({
 input: {
    marginBottom: "4%",
    width: '90%',
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
 },
});

export default CustomInput;
