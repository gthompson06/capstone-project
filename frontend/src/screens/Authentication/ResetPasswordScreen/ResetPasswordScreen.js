import React, { Component, useState } from "react";
import {
 View,
 Text,
 Image,
 StyleSheet,
 useWindowDimensions,
 TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Logo from "../../../../assets/images/TestImg.png";
import CustomInput from "../../../components/CustomInput/CustomInput.js";
import CustomButton from "../../../components/CustomButton/CustomButton.js";
import {
 ResetPasswordStyles,
 CreateAccountStyles,
} from "../../../styles/Styles.js";
import { SafeAreaView } from "react-native-safe-area-context";
import BackArrow from "../../../../assets/images/backArrow.png";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ResetPasswordScreen = () => {
 const navigation = useNavigation();
 const route = useRoute();

 const { data } = route.params || {};
 const [newPassword, setNewPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
 const [showPassword, setShowPassword] = useState(false);
 const [securityAnswer, setSecurityAnswer] = useState("");
 const [errorMessage, setErrorMessage] = useState("");
 const [securityQuestion, setSecurityQuestion] = useState(
  data.securityQuestion
 );

 const { height } = useWindowDimensions();

 const ResetPassword = () => {
  if (!newPassword || !confirmPassword || !securityAnswer) {
   setErrorMessage("No fields can be empty");
   return;
  }
  if (newPassword !== confirmPassword) {
   setErrorMessage("Passwords do not match");
   return;
  }
  setErrorMessage("");
 };

 return (
  <SafeAreaView style={ResetPasswordStyles.root}>
   <View>
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
   <Text style={{ fontSize: 40, paddingBottom: 30 }}>RESET PASSWORD</Text>
   <View>Here was your Security Question: {securityQuestion}</View>
   <CustomInput
    placeholder="Security Answer"
    value={securityAnswer}
    setValue={setSecurityAnswer}
   />
   <CustomInput
    placeholder="New Password"
    value={newPassword}
    setValue={setNewPassword}
    secureTextEntry={!showPassword}
   />

   <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
    <Icon name={showPassword ? "eye-off" : "eye"} size={24} color="black" />
   </TouchableOpacity>

   <PasswordStrengthMeterBar password={newPassword} />

   <CustomInput
    placeholder="confirm password"
    value={confirmPassword}
    setValue={setConfirmPassword}
    secureTextEntry
   />
   <CustomButton text="reset password" onPress={ResetPassword} />

   {errorMessage ? (
    <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>
   ) : null}
  </SafeAreaView>
 );
};

export default ResetPasswordScreen;
