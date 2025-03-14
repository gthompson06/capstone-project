import {
 View,
 Text,
 Image,
 StyleSheet,
 useWindowDimensions,
 Button,
 TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Logo from "../../../assets/images/TestImg.png";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import CustomButton from "../../components/CustomButton/CustomButton.js";
import { CreateAccountStyles } from "../../styles/Styles.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackArrow from "../../../assets/images/backArrow.png";

const CreateAccountScreen = () => {
 const [username, setUsername] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
 const navigation = useNavigation();

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
    onPress={createAccountPressed}
    type="CreateAccount"
   />
   {/* <CustomButton text="Reset Password" onPress={ResetPassword} /> */}
  </SafeAreaView>
 );
};

export default CreateAccountScreen;
