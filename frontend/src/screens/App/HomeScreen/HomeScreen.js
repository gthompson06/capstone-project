import React, { useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../contexts/AuthContext";


const Stack = createStackNavigator();

const HomeScreen = ({ route }) => {
 const navigation = useNavigation(); // Use this to get the correct navigation object
 //  const { username, id, token } = route.params || {};
 const { user } = useAuth();

 useEffect(async () => {
  if (user) {
   console.log(user.userName, user.userId);
   try {
    const url = `http://localhost:5161/worthy/user/${user.userId}`;
    const response = await fetch(url, {
     method: "GET",
     headers: {
      "Content-Type": "application/json",
     },
     body: JSON.stringify({
      UserName: username,
      Password: password,
     }),
    });
    console.log(response);
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
  } else {
   console.log("User is null or not loaded yet.");
  }
 }, [user]);

 return (
  <SafeAreaView style={{ flex: 1 }}>
   {/* Custom Hamburger Menu Button */}
   <TouchableOpacity
    style={{ marginLeft: 15, marginTop: 10, padding: 10 }}
    onPress={() => navigation.openDrawer()} // Now this works
   >
    <Ionicons name="menu" size={30} color="black" />
   </TouchableOpacity>

   {/* Welcome Text */}
   <Text
    style={{
     textAlign: "center",
     fontSize: 25,
     paddingBottom: 30,
     paddingTop: 0,
    }}
   >
    <Text>
     Welcome {user.userName || "Guest"}. Your ID is {user.userId || "null"}
    </Text>
   </Text>
  </SafeAreaView>
 );
};

export default HomeScreen;
