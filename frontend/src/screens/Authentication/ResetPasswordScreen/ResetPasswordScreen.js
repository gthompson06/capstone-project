import React, { useState } from "react";
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
import PasswordStrengthMeterBar from "react-native-password-strength-meter-bar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PasswordStrengthMeterBar from "react-native-password-strength-meter-bar";

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

 const handleResetPassword = async () => {
  if (!newPassword || !confirmPassword || !securityAnswer) {
   setErrorMessage("No fields can be empty");
   return;
  }
  if (newPassword !== confirmPassword) {
   setErrorMessage("Passwords do not match");
   return;
  }

  const url = "http://localhost:5161/worthy/user/reset-password";

  try {
   const response = await fetch(url, {
    method: "PUT",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({
     UserName: data.userName,
     SecurityAnswer: securityAnswer,
     NewPassword: newPassword,
    }),
   });

   const result = await response.json();
   console.log("Raw response:", result);

   if (!response.ok) {
    setErrorMessage(result.message || "Reset failed");
   } else {
    navigation.navigate("SignIn");
   }
  } catch (error) {
   console.error("Reset error:", error);
   setErrorMessage("An error occurred. Try again later.");
  }
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

   <View style={{ maxWidth: "80%", marginBottom: 10 }}>
    <Text style={{ fontSize: 16 }}>
     Here was your Security Question:{" "}
     <Text style={{ fontWeight: "bold" }}>{securityQuestion}</Text>
    </Text>
   </View>

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
    placeholder="Confirm Password"
    value={confirmPassword}
    setValue={setConfirmPassword}
    secureTextEntry
   />

   <CustomButton text="Reset Password" onPress={handleResetPassword} />

   {errorMessage ? (
    <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>
   ) : null}
  </SafeAreaView>
 );
};

export default ResetPasswordScreen;
