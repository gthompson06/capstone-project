import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

const Profile = ({ route }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        style={{ marginLeft: 15, marginTop: 10, padding: 10 }}
        onPress={() => navigation.openDrawer()}
      >
        <Ionicons name="menu" size={30} color="black" />
      </TouchableOpacity>

      <Text
        style={{
          textAlign: "center",
          fontSize: 25,
          paddingBottom: 30,
          paddingTop: 0,
        }}
      >
        Profile Screen
      </Text>
    </SafeAreaView>
  );
};

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}