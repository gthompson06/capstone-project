import {
 View,
 Text,
 Image,
 StyleSheet,
 useWindowDimensions,
 TouchableOpacity,
 SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import Logo from "../../../assets/images/TestImg.png";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";

const SignInScreen = () => {
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 const navigation = useNavigation(); // Get navigation object

 const onSignInPressed = () => {
  console.warn("sign in button pressed");
  console.warn("username: ", username);
  console.warn("password: ", password);
  navigation.navigate("HomeScreen", { username }); // Navigate to HomeScreen
 };
 const onCreateAccountPressed = () => {
  console.warn("create account button pressed");
  navigation.navigate("CreateAccount"); // Navigate to CreateAccountScreen
 };

 const onForgotPasswordPressed = () => {
  console.warn("forgot password pressed");
  navigation.navigate("ForgotPassword");
 };

 const { height } = useWindowDimensions();

 return (
  <SafeAreaView style={styles.root}>
   <Image
    source={Logo}
    style={[styles.logo, { height: height * 0.3 }]}
    resizeMode="contain"
   />
   <Text style={{ fontSize: 40, paddingBottom: 30 }}>LOGIN</Text>
   <CustomInput
    placeholder="Username"
    value={username}
    setValue={setUsername}
   />
   <CustomInput
    placeholder="Password"
    value={password}
    setValue={setPassword}
    secureTextEntry
   />

   <View style={styles.rowContainer}>
    <View style={styles.linkContainer}>
     <TouchableOpacity onPress={onCreateAccountPressed}>
      <Text style={styles.linkText}>Create Account</Text>
     </TouchableOpacity>
     <TouchableOpacity onPress={onForgotPasswordPressed}>
      <Text style={styles.linkText}>Forgot Password?</Text>
     </TouchableOpacity>
    </View>
    <CustomButton text="Sign In" type="signIn" onPress={onSignInPressed} />
   </View>
  </SafeAreaView>
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
 rowContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 10,
  justifyContent: "flex-start",
 },
 linkContainer: {
  marginRight: 15,
 },
 linkText: {
  fontSize: 16,
  color: "black",
  marginVertical: 5,
 },
});

export default SignInScreen;
