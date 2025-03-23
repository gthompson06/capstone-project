import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from "@react-navigation/native";

const HomeScreen = ({route}) => {
  const { username } = route.params || {}; 

  const navigation = useNavigation(); // Get navigation object
  
  const logoutUser = async () => {
    try {
        await AsyncStorage.removeItem("userToken");
        await AsyncStorage.removeItem("tokenExpiration");
        // console.log("User logged out.");
    } catch (error) {
        // console.error("Error logging out:", error);
    }
  };

  return (
    <SafeAreaView>
      <Text>Welcome to the Home Screen, {username} </Text>
      <CustomButton text="Log out" onPress={logoutUser} />

    </SafeAreaView>
  );
};



export default HomeScreen;