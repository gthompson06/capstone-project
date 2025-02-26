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
  minHeight: 50,

  borderColor: "white",
  borderWidth: 2,
  borderRadius: 5,

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
 text_BackButton: {
  color: "white",
  fontSize: 10,
 },
 text_CreateAccount: {
  color: "white",
 },
});

export default CustomButton;
