import {
 View,
 Text,
 Image,
 StyleSheet,
 useWindowDimensions,
 Button,
 TouchableOpacity,
 SafeAreaView,
 Alert,
} from "react-native";
import React, { useState } from "react";
import Logo from "../../../../assets/images/TestImg.png";
import CustomInput from "../../../components/CustomInput/CustomInput.js";
import CustomButton from "../../../components/CustomButton/CustomButton.js";
import { CreateAccountStyles } from "../../../styles/Styles.js";
import { useNavigation } from "@react-navigation/native";
import BackArrow from "../../../../assets/images/backArrow.png";
// import PasswordStrengthMeterBar from "react-native-password-strength-meter-bar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CreateAccountScreen = () => {
 const [username, setUsername] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
 const [errorMessage, setErrorMessage] = useState("");
 const [showPassword, setShowPassword] = useState(false);

 const navigation = useNavigation();

 const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
 };

 const register = async () => {
  if (!username || !email || !password || !confirmPassword) {
   setErrorMessage("No fields can be empty");
   return;
  } else if (password !== confirmPassword) {
   setErrorMessage("Passwords do not match");
   return;
  } else if (!isValidEmail(email)) {
   setErrorMessage("Email entry is incorrect");
   return;
  }
  //   console.log(username, email, password);
  navigation.navigate("SecurityQuestion", {
   u: username,
   e: email,
   p: password,
  });
 };

 const { height } = useWindowDimensions();

 return (
  <SafeAreaView style={CreateAccountStyles.root}>
   <View
    style={{
     display: "flex",
     width: "100%",
     justifyContent: "flex-start",
     marginLeft: "20%",
    }}
   >
    <TouchableOpacity onPress={() => navigation.goBack()}>
     <Image
      source={BackArrow}
      style={{ width: 40, height: 40 }}
      resizeMode="contain"
     />
    </TouchableOpacity>
   </View>
   <Image
    source={Logo}
    style={[CreateAccountStyles.logo, { height: height * 0.2 }]}
    resizeMode="contain"
   />
   <Text style={{ fontSize: 40, paddingBottom: 10 }}>CREATE ACCOUNT</Text>
   <CustomInput
    placeholder="username"
    value={username}
    setValue={setUsername}
   />
   <CustomInput
    placeholder="email@email.com"
    value={email}
    setValue={setEmail}
   />

   <CustomInput
    placeholder="password"
    value={password}
    setValue={setPassword}
    secureTextEntry={!showPassword}
   />

   <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
    <Icon name={showPassword ? "eye-off" : "eye"} size={24} color="black" />
   </TouchableOpacity>

   
   <CustomInput
    placeholder="confirm password"
    value={confirmPassword}
    setValue={setConfirmPassword}
    secureTextEntry
   />

   <CustomButton
    text="Create Account"
    onPress={register}
    type="CreateAccount"
   />
   {errorMessage ? (
    <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>
   ) : null}
  </SafeAreaView>
 );
};

export default CreateAccountScreen;
