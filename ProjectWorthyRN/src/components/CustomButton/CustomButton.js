import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const CustomButton = ({ onPress, text, type = "primary" }) => {
 return (
  <Pressable
   onPress={onPress}
   style={[styles.container, styles[`container_${type}`]]}
  >
   <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
  </Pressable>
 );
};

const styles = StyleSheet.create({
 container: {
  hminHeight: 50,

  borderColor: "white",
  borderWidth: 2,
  borderRadius: 5,

  marginVertical: 10,

  maxWidth: 450,
  alignItems: 'center',
  justifyContent: 'venter',
 },
 container_primary: {
    width: "75%",
  backgroundColor: "lightblue",
 },
 container_secondary: {
    width: "75%",
  backgroundColor: "white",
 },
 container_createAccount: {
    backgroundColor: "red",
    height: "10%",
    width: "50%",
   },
 container_signIn: {
    width: "50%",
    backgroundColor: "lightblue",
   },
 text: {
  fontSize: 25,
  textAlign: "center",
  padding: 20,
  fontWeight: "bold",
 },
 text_primary: {
  color: "white",
 },
 text_secondary: {
  color: "gray",
 },
 text_signIn: {
    color: "white",
   },
});

export default CustomButton;
