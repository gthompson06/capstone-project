// import React from 'react';
// import { TouchableOpacity, Text, StyleSheet } from 'react-native';
// import { useNavigation } from "@react-navigation/native";

// const LogoutButton = () => {
//     const handleLogoutConfirmation = () => {
//         Alert.alert(
//         "Logout",
//         "Are you sure you want to log out?",
//         [
//             { text: "Cancel", style: "cancel" },
//             { text: "Logout", onPress: () => handleLogout() }, // Replace with logout logic
//         ]
//         );
//     };

//     const handleLogout = async () => {
//         try {
//             await AsyncStorage.removeItem("userToken");
//             await AsyncStorage.removeItem("tokenExpiration");
//             navigation.navigate("SignInScreen");
//         } catch (error) {
//             console.error("Error logging out:", error);
//         }
//         return null;
//       };

//     return
// }
