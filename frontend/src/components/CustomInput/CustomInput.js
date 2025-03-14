import { View, Text, TextInput } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";

const CustomInput = ({ value, setValue, placeholder, secureTextEntry }) => {
 return (
  <View style={styles.container}>
   <TextInput
    value={value}
    onChangeText={setValue}
    placeholder={placeholder}
    secureTextEntry={secureTextEntry}
    style={styles.input}
   />
  </View>
 );
};

const styles = StyleSheet.create({
 container: {
  width: "75%",
  minHeight: 50,

  borderColor: "black",
  borderWidth: 2,
  borderRadius: 5,

  paddingHorizontal: 5,
  marginVertical: 10,

  maxWidth: 450,
  justifyContent: "center",
 },
 input: {
  fontSize: 25,
  height: 40,
  textAlignVertical: "center",
  textAlign: "left",
 },
});

export default CustomInput;
