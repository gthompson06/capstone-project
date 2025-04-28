// Import necessary libraries and components
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
import AsyncStorage from "@react-native-async-storage/async-storage"; // For storing login tokens locally
import { useNavigation } from "@react-navigation/native"; // Navigation between screens
import { useAuth } from "../../../contexts/AuthContext"; // Custom auth context for logging in

// Import assets and custom components
import Logo from "../../../../assets/images/logo.png";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { FormStyles } from "../../../styles/FormStyles";

// Main SignInScreen component
const SignInScreen = () => {
  // State variables for username and password input
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation(); // Navigation object
  const { height } = useWindowDimensions(); // Screen height, used for responsive image sizing
  const { login } = useAuth(); // Custom login function from context
  const styles = FormStyles;

  // Handles login by calling context login function
  const handleLogin = () => {
    try {
      login(username, password);
    } catch {
      throw new Error("Error logging in."); // Very basic error handling
    }
  };

  /*
  const storeUserToken = async (token) => {
    try {
      const token = this.token;
      const expirationTime = Date.now() + 10 * 1000; // 10 seconds, should be 30 min based on comment
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("tokenExpiration", expirationTime.toString());
    } catch (error) {
      console.error("Error saving token:", error);
    }
  };
  */

  // Function to check if the user's token is still valid
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

  // Clears token and navigates user back to SignIn screen
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

  // It performs a manual fetch to the backend and stores the token
  const signInUser = async () => {
    if (username == "" && password == "") {
      navigation.navigate("HomeScreen"); // Directly go to home if blank credentials (seems risky)
    }
    try {
      const url = "http://localhost:5161/worthy/user/login"; // Local API
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

  /*
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await checkUserLogin();
      if (token) {
        navigation.replace("HomeScreen"); // Auto-navigate if still signed in
      }
    };
    checkLoginStatus();

    // Set up auto-logout every 5 seconds
    const interval = setInterval(checkUserLogin, 5000);
    return () => clearInterval(interval);
  }, []);
  */

  // Render the Sign In Screen UI
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        {/* App Logo */}
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
        
        {/* Welcome Text */}
        <Text style={styles.title}>
          Welcome to Worthy, the Student Companion App.
        </Text>

        {/* Username Input Field */}
        <CustomInput
          placeholder="Enter username..."
          value={username}
          setValue={setUsername}
        />

        {/* Password Input Field */}
        <CustomInput
          placeholder="Enter password..."
          value={password}
          setValue={setPassword}
          secureTextEntry
        />

        {/* Sign In Button */}
        <CustomButton
          text="Sign In"
          type="signIn"
          onPress={() => handleLogin()}
        />

        {/* Navigation Links for Create Account and Forgot Password */}
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

/*
const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "flex-start",
  },
  linkContainer: {
    marginRight: 25,
    alignItems: "start",
    justifyContent: "center",
    marginVertical: 10,
  },
  linkText: {
    fontSize: 16,
    color: "black",
    marginVertical: 5,
  },
});
*/

export default SignInScreen;
