import React, { useState, useEffect } from "react";
import { 
    View, Text, Image, StyleSheet, 
    useWindowDimensions, TouchableOpacity, SafeAreaView, Alert 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import Logo from "../../../assets/images/TestImg.png";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";

const SignInScreen = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation(); // Get navigation object
    const { height } = useWindowDimensions();

    // Function to store user token with expiration
    const storeUserToken = async () => {
        try {
            const token = "dummy_token_123"; // Replace with actual token from backend
            const expirationTime = Date.now() + 30 * 1000; // Expires in 2 minutes
            await AsyncStorage.setItem("userToken", token);
            await AsyncStorage.setItem("tokenExpiration", expirationTime.toString());
            console.log("Token stored, expires in 1 minute");
        } catch (error) {
            console.error("Error saving token:", error);
        }
    };

    // Function to check login status
    const checkUserLogin = async () => {
        try {
            const token = await AsyncStorage.getItem("userToken");
            const expiration = await AsyncStorage.getItem("tokenExpiration");

            if (!token || !expiration || Date.now() > parseInt(expiration)) {
                console.log("Token expired or not found. Logging out...");
                await logoutUser();
                return null;
            }
            console.log("User is still signed in.");
            return token;
        } catch (error) {
            console.error("Error checking login:", error);
            return null;
        }
    };

    // Logout function
    const logoutUser = async () => {
        try {
            await AsyncStorage.removeItem("userToken");
            await AsyncStorage.removeItem("tokenExpiration");
            console.log("User logged out.");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    // Handle sign-in button press
    const onSignInPressed = async () => {
        if (username === "" && password === "") { // Example login check
            await storeUserToken();
            navigation.replace("HomeScreen", { username }); // Navigate to HomeScreen
        } else {
            Alert.alert("Error", "Invalid username or password");
        }
    };

    // Check if user is already signed in when screen loads
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

    return (
        <SafeAreaView style={styles.root}>
            <Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode="contain" />
            <Text style={{ fontSize: 40, paddingBottom: 30 }}>LOGIN</Text>
            <CustomInput placeholder="Username" value={username} setValue={setUsername} />
            <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry />

            <View style={styles.rowContainer}>
                <View style={styles.linkContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
                        <Text style={styles.linkText}>Create Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                        <Text style={styles.linkText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                <CustomButton text="Sign In" type="signIn" onPress={onSignInPressed} />
            </View>
        </SafeAreaView>
    );
};

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
        marginRight: 15,
    },
    linkText: {
        fontSize: 16,
        color: "black",
        marginVertical: 5,
    },
});

export default SignInScreen;
