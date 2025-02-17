import {
 View,
 Text,
 Image,
 StyleSheet,
 useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import Logo from "../../../assets/images/TestImg.png";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
// import CreateAccountStyles from "../../styles/Styles.js";

const CreateAccountScreen = () => {
 const [username, setUsername] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");

 const createAccountPressed = () => {
  console.warn("Create Account button pressed");
 };

 const { height } = useWindowDimensions();

 return (
  <View style={StyleSheet.root}>
   <Image
    source={Logo}
    style={[styles.logo, { height: height * 0.3 }]}
    resizeMode="contain"
   />
   <Text style={{ fontSize: "40", paddingBottom: "30" }}>CREATE ACCOUNT</Text>
   <CustomInput
    placeholder="User Name"
    value={username}
    setValue={setUsername}
   />
   <CustomInput placeholder="Email" value={email} setValue={setEmail} />
   <CustomInput
    placeholder="Password"
    value={password}
    setValue={setPassword}
    secureTextEntry
   />
   <CustomInput
    placeholder="Confirm Password"
    value={confirmPassword}
    setValue={setConfirmPassword}
    secureTextEntry
   />
   <CustomButton text="Create Account" onPress={createAccountPressed} />
  </View>
 );
};

const styles = StyleSheet.create({
 root: {
  alignItems: "center",
  padding: 20,
 },
 logo: {
  width: "70%",
  maxWidth: 300,
  maxHeight: 200,
 },
});

export default CreateAccountScreen;
