import React, { Component, useState } from "react";
import {
 Text,
 View,
 SafeAreaView,
 StyleSheet,
 TouchableOpacity,
 Image,
 useWindowDimensions,
} from "react-native";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import CustomButton from "../../components/CustomButton/CustomButton.js";
import { CreateAccountStyles } from "../../styles/Styles.js";
import { useNavigation } from "@react-navigation/native";
import BackArrow from "../../../assets/images/backArrow.png";
import Logo from "../../../assets/images/TestImg.png";

const ForgotPasswordScreen = () => {
 const navigation = useNavigation();

 const [answer, setAnswer] = useState("");
 const [errorMessage, setErrorMessage] = useState("");

 const onAnswer = () => {
  if (!answer) {
   setErrorMessage("Cannot have an empty answer");
   return;
  }

  navigation.replace("HomeScreen");
 };

 const { height } = useWindowDimensions();

 return (
  <SafeAreaView style={CreateAccountStyles.root}>
   <View
    style={{
     display: "flex",
     width: "100%",
     justifyContent: "flex-start",
     marginLeft: "20%",
    }}
   >
    <TouchableOpacity onPress={() => navigation.goBack()}>
     <Image
      source={BackArrow}
      style={{ width: 40, height: 40 }}
      resizeMode="contain"
     />
    </TouchableOpacity>
   </View>
   <Image
    source={Logo}
    style={[CreateAccountStyles.logo, { height: height * 0.2 }]}
    resizeMode="contain"
   />
   <Text style={{ fontSize: 40, paddingBottom: 30 }}>Security Question</Text>
   <CustomInput placeholder="Answer" value={answer} setValue={setAnswer} />
   <CustomButton text="Submit" onPress={onAnswer} />
   {errorMessage ? (
    <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>
   ) : null}
  </SafeAreaView>
 );
};

export default ForgotPasswordScreen;
