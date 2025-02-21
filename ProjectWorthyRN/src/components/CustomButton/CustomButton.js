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
  width: "75%",
  height: "10%",

  borderColor: "white",
  borderWidth: 2,
  borderRadius: 5,

  marginVertical: 10,

  maxWidth: 450,
 },
 container_primary: {
  backgroundColor: "lightblue",
 },
 container_secondary: {
  backgroundColor: "white",
 },
 text: {
  fontSize: 25,
  textAlign: "center",
  flex: 1,
  padding: 20,
  fontWeight: "bold",
 },
 text_primary: {
  color: "white",
 },
 text_secondary: {
  color: "gray",
 },
});

export default CustomButton;
