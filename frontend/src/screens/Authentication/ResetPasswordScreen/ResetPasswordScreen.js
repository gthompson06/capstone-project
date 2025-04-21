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
import Logo from "../../../../assets/images/logo.png";
import CustomInput from "../../../components/CustomInput/CustomInput.js";
import CustomButton from "../../../components/CustomButton/CustomButton.js";
import {
  ResetPasswordStyles,
  CreateAccountStyles,
} from "../../../styles/Styles.js";
import { SafeAreaView } from "react-native-safe-area-context";
import BackArrow from "../../../../assets/images/back-arrow.png";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PasswordStrengthMeterBar from "react-native-password-strength-meter-bar";
import { FormStyles } from "../../../styles/FormStyles.js";
import AuthHeader from "../../../components/AuthHeader/AuthHeader.js";

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const styles = FormStyles;

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
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <AuthHeader></AuthHeader>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <Text style={styles.title}>Reset your password.</Text>

        <Text>Your security question:</Text>
        <Text style={styles.question}>{securityQuestion}</Text>
        

        <CustomInput
          placeholder="Your security answer..."
          value={securityAnswer}
          setValue={setSecurityAnswer}
        />
        <CustomInput
          placeholder="Your new password..."
          value={newPassword}
          setValue={setNewPassword}
          secureTextEntry={!showPassword}
        />

        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? "eye-off" : "eye"} size={24} color="black" />
        </TouchableOpacity>

        <PasswordStrengthMeterBar password={newPassword} />

        <CustomInput
          placeholder="Confirm password..."
          value={confirmPassword}
          setValue={setConfirmPassword}
          secureTextEntry
        />

        <CustomButton text="Reset Password" onPress={handleResetPassword} />

        {errorMessage ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
