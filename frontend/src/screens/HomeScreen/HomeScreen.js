import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

const HomeScreen = ({route}) => {
  const { username } = route.params || {}; 

  return (
    <SafeAreaView>
      <Text>Welcome to the Home Screen, {username} </Text>

    </SafeAreaView>
  );
};



export default HomeScreen;