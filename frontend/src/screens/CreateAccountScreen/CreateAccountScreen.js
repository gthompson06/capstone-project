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
import Logo from "../../../assets/images/TestImg.png";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { CreateAccountStyles } from "../../styles/Styles.js";
import { useNavigation } from "@react-navigation/native";
import BackArrow from "../../../assets/images/backArrow.png";

const CreateAccountScreen = () => {
 const [username, setUsername] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
 const [errorMessage, setErrorMessage] = useState("");
 const navigation = useNavigation();

 const storeAccountInfo = async () => {
  console.log("create account pressed");

  //   if (!username || !email || !password || !confirmPassword) {
  //    setErrorMessage("No fields can be empty");
  //    return;
  //   }

  //   if (password !== confirmPassword) {
  //    setErrorMessage("Passwords do not match");
  //    return;
  //   }

  console.log("fetching db");

  try {
   const response = await fetch("http://localhost:5161/worthy/user/0", {
    method: "GET",
    headers: {
     "Content-Type": "application/json",
    },
    // body: JSON.stringify({
    //  userId: "3",
    //  username: "tony",
    //  email: "email@email.com",
    //  firstName: "tony",
    //  lastName: "positano",
    //  DateOfBirth: "1-1-2025",
    //  City: "Batavia",
    //  State: "IL",
    //  School: "Aurora University",
    //  password: "password",
    // }),
   });

   const data = await response.json();

   if (response.ok) {
    console.log("Account created successfully:", data);
    navigation.navigate("HomeScreen");
   } else {
    console.log("Error creating account:", data);
   }
  } catch (error) {
   console.log("Other error:", error);
  }
 };

 const ResetPassword = () => {
  navigation.navigate("ResetPassword");
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
    placeholder="Username"
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
   <CustomButton
    text="Create Account"
    onPress={storeAccountInfo}
    type="CreateAccount"
   />
   {errorMessage ? (
    <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>
   ) : null}
   {/* <CustomButton text="Reset Password" onPress={ResetPassword} /> */}
  </SafeAreaView>
 );
};

export default CreateAccountScreen;
