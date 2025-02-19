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
import { ResetPasswordStyles } from "../../styles/Styles.js";
import { SafeAreaView } from "react-native-safe-area-context";

const ResetPasswordScreen = () => {
 const [currentPassword, setCurrentPassword] = useState("");
 const [newPassword, setNewPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");

 const ResetPasswordButton = () => {
  console.log("reset password button pressed");
 };

 const { height } = useWindowDimensions();

 return (
  <SafeAreaView style={ResetPasswordStyles.root}>
   <Text style={{ fontSize: "40", paddingBottom: "30" }}>RESET PASSWORD</Text>
   <CustomInput
    placeholder="Current Password"
    value={confirmPassword}
    setValue={setConfirmPassword}
    secureTextEntry
   />
   <CustomInput
    placeholder="New Password"
    value={newPassword}
    setValue={setNewPassword}
    secureTextEntry
   />
   <CustomInput
    placeholder="Confirm Password"
    value={confirmPassword}
    setValue={setConfirmPassword}
    secureTextEntry
   />
   <CustomButton text="Reset Password" onPress={ResetPasswordButton} />
  </SafeAreaView>
 );
};

export default ResetPasswordScreen;
