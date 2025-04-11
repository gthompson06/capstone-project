import React from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import {
 DrawerContentScrollView,
 DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
// import LogoutButton from "../../components/LogoutButton/LogoutButton"

const HamburgerLogout = (props) => {
 const handleLogoutConfirmation = () => {
  Alert.alert("Logout", "Are you sure you want to log out?", [
   { text: "Cancel", style: "cancel" },
   { text: "Logout", onPress: () => handleLogout() },
  ]);
 };

 const handleLogout = async () => {
  try {
   await AsyncStorage.removeItem("userToken");
   await AsyncStorage.removeItem("tokenExpiration");
   props.navigation.navigate("SignIn");
  } catch (error) {
   console.error("Error logging out:", error);
  }
  return null;
 };

 return (
  <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
   <DrawerItemList {...props} />

   <View style={{ flex: 1, justifyContent: "flex-end", padding: 20 }}>
    <TouchableOpacity
     onPress={handleLogout}
     style={{
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
     }}
    >
     <Ionicons name="log-out-outline" size={24} color="red" />
     <Text style={{ marginLeft: 10, fontSize: 16, color: "red" }}>Logout</Text>
     {/* <LogoutButton /> */}
    </TouchableOpacity>
   </View>
  </DrawerContentScrollView>
 );
};

export default HamburgerLogout;
