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

 const register = async () => {
  if (!username || !email || !password || !confirmPassword) {
   setErrorMessage("No fields can be empty");
   return;
  }
  if (password !== confirmPassword) {
   setErrorMessage("Passwords do not match");
   return;
  }
  console.log(username, email, password);
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
    onPress={register}
    type="CreateAccount"
   />
   {errorMessage ? (
    <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>
   ) : null}
   {/* <CustomButton text="Reset Password" onPress={ResetPassword} /> */}

   {/* <SecurityQuestionScreen
    // username={this.username}
    // email={this.email}
    // password={this.password}
    username={"username"}
    email={"email"}
    password={"password"}
   /> */}
  </SafeAreaView>
 );
};

export default CreateAccountScreen;
