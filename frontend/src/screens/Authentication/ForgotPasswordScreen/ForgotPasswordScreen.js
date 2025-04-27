import React, { Component, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";
import CustomInput from "../../../components/CustomInput/CustomInput.js";
import CustomButton from "../../../components/CustomButton/CustomButton.js";
import { CreateAccountStyles } from "../../../styles/Styles.js";
import { useNavigation } from "@react-navigation/native";
import BackArrow from "../../../../assets/images/back-arrow.png";
import Logo from "../../../../assets/images/logo.png";
import { FormStyles } from "../../../styles/FormStyles.js";
import AuthHeader from "../../../components/AuthHeader/AuthHeader.js";
// import Context from "../../../contexts/Context.js";

const ForgotPasswordScreen = () => {
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const styles = FormStyles;

  const onEnterUsername = async () => {
    if (!username) {
      setErrorMessage("Username field cannot be blank");
      return;
    }
    setErrorMessage("");

    const url = `http://10.0.0.210:5161/worthy/user/username/${username}`;

    // Check DB for user by username
    try {
      console.log("Sending request...");

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("Response received:", data, data.message);

      if (data.message == "404: User not found") {
        setErrorMessage("Username does not exist");
        return;
      } else {
        setErrorMessage("");
        // pass received data to ResetPasswordScreen
        navigation.navigate("ResetPassword", {
          data: data,
        });
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
      console.log("db message: ", error.message);
      setErrorMessage(error.message);
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
      <Text style={styles.title}>Secure your account by resetting your password.</Text>
      <CustomInput
        placeholder="Enter your username..."
        value={username}
        setValue={setUsername}
      />
      <CustomButton text="Submit" onPress={onEnterUsername} />

      {errorMessage ? (
        <Text style={error}>{errorMessage}</Text>
      ) : null}
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
