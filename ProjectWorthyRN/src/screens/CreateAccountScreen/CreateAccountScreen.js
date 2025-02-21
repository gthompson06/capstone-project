import {
 View,
 Text,
 Image,
 StyleSheet,
 useWindowDimensions,
 ScrollView,
} from "react-native";
import React, { useState } from "react";
import Logo from "../../../assets/images/TestImg.png";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { CreateAccountStyles } from "../../styles/Styles.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const CreateAccountScreen = () => {
 const [username, setUsername] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
 const navigation = useNavigation(); // Get navigation object

 const createAccountPressed = () => {
  console.log("create account button pressed");
  console.log("username:" + username);
  console.log("password:" + password);
 };
 const ResetPassword = () => {
  navigation.navigate("ResetPassword");
 };

 const { height } = useWindowDimensions();

 return (
  <SafeAreaView style={CreateAccountStyles.root}>
   <Image
    source={Logo}
    style={[CreateAccountStyles.logo, { height: height * 0.3 }]}
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
   <CustomButton text="Reset Password" onPress={ResetPassword} />
  </SafeAreaView>
 );
};

export default CreateAccountScreen;
