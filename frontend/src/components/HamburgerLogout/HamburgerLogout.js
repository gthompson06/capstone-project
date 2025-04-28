// Importing necessary components and hooks from React and React Native
import React from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext"; // Importing custom Auth context for user authentication
// import LogoutButton from "../../components/LogoutButton/LogoutButton";

// HamburgerLogout component definition
const HamburgerLogout = (props) => {
  // Destructuring 'logout' function from the Auth context
  const { logout } = useAuth();

  // Function to show the logout confirmation alert when pressed
  const handleLogoutConfirmation = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: () => handleLogout() },
      ]
    );
  };

  // Function to handle the actual logout process
  const handleLogout = async () => {
    try {
      // Remove the user's authentication token and token expiration time from AsyncStorage
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("tokenExpiration");
      // Navigate the user to the SignIn screen after successful logout
      navigation.navigate("SignIn");
    } catch (error) {
      console.error("Error logging out:", error); // Log any errors that occur during logout
    }
    return null;
  };

  return (
    // DrawerContentScrollView is used to display the scrollable content of the drawer
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/* DrawerItemList displays the list of items in the drawer menu */}
      <DrawerItemList {...props} />

      {/* View container to position the logout button at the bottom */}
      <View style={{ flex: 1, justifyContent: "flex-end", padding: 20 }}>
        {/* TouchableOpacity makes the logout button clickable */}
        <TouchableOpacity
          onPress={() => logout()} // Triggers the logout function when pressed
          style={{
            flexDirection: "row", // Aligns the icon and text horizontally
            alignItems: "center", // Centers the items vertically
            paddingVertical: 10, // Adds vertical padding to the button
          }}
        >
          {/* Ionicons logout icon */}
          <Ionicons name="log-out-outline" size={24} color="red" />
          {/* Text next to the logout icon */}
          <Text style={{ marginLeft: 10, fontSize: 16, color: "red" }}>Logout</Text>
          {/* <LogoutButton /> */}
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default HamburgerLogout;
