import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

const HomeScreen = ({ route }) => {
  const navigation = useNavigation(); // Use this to get the correct navigation object
  const { username, userId } = route.params || {};
  
  const logoutUser = async () => {
    try {
        await AsyncStorage.removeItem("userToken");
        await AsyncStorage.removeItem("tokenExpiration");
        return null;
        // console.log("User logged out.");
    } catch (error) {
        // console.error("Error logging out:", error);
    }
    return null;
  };

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
        Welcome {username}. Your ID is {userId}
      </Text>
    </SafeAreaView>
  );
};

// Exporting HomeScreen wrapped in Stack Navigator
export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}




//on sign in screen edit out the backdoor