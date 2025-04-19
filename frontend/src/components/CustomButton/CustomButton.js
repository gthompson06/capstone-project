import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const CustomButton = ({ onPress, text, type = "primary" }) => {
 return (
  <Pressable
   onPress={onPress}
   style={[styles.button, styles[`container_${type}`]]}
  >
   <Text style={[styles.buttonText, styles[`text_${type}`]]}>{text}</Text>
  </Pressable>
 );
};

const styles = StyleSheet.create({
    button: {
        width: "100%",
        backgroundColor: '#1762a7',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
 container: {
  minHeight: "10%",

  borderWidth: "4px",
  borderColor: "black",
  borderRadius: "6px",

  marginVertical: 10,

  maxWidth: 450,
  alignItems: "center",
  justifyContent: "center",
 },
 container_primary: {
  width: "75%",
  backgroundColor: "lightblue",
 },
 container_secondary: {
  width: "75%",
  backgroundColor: "white",
 },
 container_CreateAccount: {
  backgroundColor: "lightblue",
  height: "10%",
  width: "50%",
  justifyContent: "center",
  borderRadius: 15,
 },
 container_BackButton: {
  position: "absolute:",
  marginLeft: 10,
  backgroundColor: "lightblue",
  height: 40,
  width: 90,
  justifyContent: "center",
  alignItems: "center",
 },
 container_signIn: {
//   width: "80%",
//   backgroundColor: "blue",
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
 text_BackButton: {
  color: "white",
  fontSize: 10,
 },
 text_CreateAccount: {
  color: "white",
 },
});

export default CustomButton;
