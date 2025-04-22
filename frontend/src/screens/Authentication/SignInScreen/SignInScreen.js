import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../contexts/AuthContext";

import Logo from "../../../../assets/images/logo.png";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { FormStyles } from "../../../styles/FormStyles";

const SignInScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation(); // Get navigation object
  const { height } = useWindowDimensions();
  const { login } = useAuth();
  const styles = FormStyles;

  const handleLogin = () => {
    try {
      if(login(username, password)){
        navigation.navigate("HomeScreen");
      }
    } catch {
      throw new Error("Error logging in.");
    }
  }


  //  const storeUserToken = async (token) => {
  //   try {
  //    const token = this.token;
  //    const expirationTime = Date.now() + 10 * 1000; // Expires in 30 minutes (minutes to seconds to milliseconds)
  //    await AsyncStorage.setItem("userToken", token);
  //    await AsyncStorage.setItem("tokenExpiration", expirationTime.toString());
  //   } catch (error) {
  //    console.error("Error saving token:", error);
  //   }
  //  };

  // Function to check login status
  const checkUserLogin = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const expiration = await AsyncStorage.getItem("tokenExpiration");

      if (!token || !expiration || Date.now() > parseInt(expiration)) {
        await handleLogout();
        return null;
      }
      console.log("User is still signed in.");
      return token;
    } catch (error) {
      console.error("Error checking login:", error);
      return null;
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("tokenExpiration");
      navigation.navigate("SignIn");
    } catch (error) {
      console.error("Error logging out:", error);
    }
    return null;
  };

  // Handle sign-in button press
  const signInUser = async () => {
    if (username == "" && password == "") {
      navigation.navigate("HomeScreen");
    }
    try {
      const url = "http://localhost:5161/worthy/user/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserName: username,
          Password: password,
        }),
      });
      //  console.log("response: " + response);
      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();
      if (data.message === "Login successful" && data.user && data.token) {
        await storeUserToken(data.token);
        navigation.navigate("HomeScreen", {
          screen: "Home",
          params: {
            username: username,
            id: data.user.userId,
            token: data.token,
          },
        });
      } else {
        Alert.alert("Error", "Invalid username or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      Alert.alert("Error", "An error occurred while signing in");
    }
  };

  // Check if user is already signed in when screen loads
  //  useEffect(() => {
  //   const checkLoginStatus = async () => {
  //    const token = await checkUserLogin();
  //    if (token) {
  //     navigation.replace("HomeScreen"); // Auto-navigate if still signed in
  //    }
  //   };
  //   checkLoginStatus();

  //   // Set up auto-logout every 5 seconds
  //   const interval = setInterval(checkUserLogin, 5000);
  //   return () => clearInterval(interval);
  //  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome to Worthy, the Student Companion App.</Text>
        <CustomInput
          placeholder="Enter username..."
          value={username}
          setValue={setUsername}
        />
        <CustomInput
          placeholder="Enter password..."
          value={password}
          setValue={setPassword}
          secureTextEntry
        />

        <CustomButton
          text="Sign In"
          type="signIn"
          onPress={() => handleLogin()}
        />
        <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
              <Text style={styles.linkText}>Create an Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
              <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//  root: {
//   alignItems: "center",
//   padding: 20,
//  },
//  logo: {
//   width: "70%",
//   maxWidth: 300,
//   maxHeight: 200,
//  },
//  rowContainer: {
//   flexDirection: "row",
//   alignItems: "center",
//   marginTop: 10,
//   justifyContent: "flex-start",
//  },
//  linkContainer: {
//   marginRight: 25,
//   alignItems: "start",
//   justifyContent: "center",
//   marginVertical: 10,
//  },
//  linkText: {
//   fontSize: 16,
//   color: "black",
//   marginVertical: 5,
//  },
// });

export default SignInScreen;
