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
import Logo from "../../../../assets/images/logo.png";
import CustomInput from "../../../components/CustomInput/CustomInput.js";
import CustomButton from "../../../components/CustomButton/CustomButton.js";
import { CreateAccountStyles } from "../../../styles/Styles.js";
import { useNavigation } from "@react-navigation/native";
import BackArrow from "../../../../assets/images/back-arrow.png";
// import PasswordStrengthMeterBar from "react-native-password-strength-meter-bar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FormStyles } from "../../../styles/FormStyles.js";
import AuthHeader from "../../../components/AuthHeader/AuthHeader.js";

const CreateAccountScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const styles = FormStyles;

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
    <SafeAreaView style={styles.root}>
      <View
        style={
          styles.container}
      >
        <AuthHeader></AuthHeader>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
        <Text style={styles.title}>Made by students, for students. Get started.</Text>
        <CustomInput
          placeholder="Enter a username..."
          value={username}
          setValue={setUsername}
        />
        <CustomInput
          placeholder="Enter your email (email@email.com)..."
          value={email}
          setValue={setEmail}
        />

        <CustomInput
          placeholder="Enter a password..."
          value={password}
          setValue={setPassword}
          secureTextEntry={!showPassword}
        />

        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? "eye-off" : "eye"} size={24} color="black" />
        </TouchableOpacity>


        <CustomInput
          placeholder="Confirm your password..."
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
          <Text style={styles.error}>{errorMessage}</Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default CreateAccountScreen;
