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
import CustomInput from "../../../components/CustomInput/CustomInput.js";
import CustomButton from "../../../components/CustomButton/CustomButton.js";
import { CreateAccountStyles } from "../../../styles/Styles.js";
import { useNavigation } from "@react-navigation/native";
import BackArrow from "../../../../assets/images/backArrow.png";
import Logo from "../../../../assets/images/TestImg.png";
import Context from "../../../contexts/Context.js";

const ForgotPasswordScreen = () => {
 const [username, setUsername] = useState("");
 const [errorMessage, setErrorMessage] = useState("");

 const navigation = useNavigation();
 const { height } = useWindowDimensions();

 const id = Context.userId;

 const onEnterUsername = async () => {
  if (!username) {
   setErrorMessage("Username field cannot be blank");
   return;
  }
  setErrorMessage("");

  const url = "http://localhost:5161/worthy/user/";

  try {
   console.log("Sending request...");

   const response = await fetch(url, {
    method: "GET",
    headers: {
     "Content-Type": "application/json",
    },
   });

   console.log("Response received:", response);

   navigation.navigate("ResetPassword", {
    e: email,
   });
  } catch (error) {
   console.error("Fetch error:", error.message);
   console.log("db message: ", error.message);
   setErrorMessage(error.message);
  }
 };

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
   <Text style={{ fontSize: 40, paddingBottom: 30 }}>FORGOT PASSWORD?</Text>
   <CustomInput
    placeholder="enter username"
    value={username}
    setValue={setUsername}
   />
   <CustomButton text="Submit" onPress={onEnterUsername} />

   {errorMessage ? (
    <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>
   ) : null}
  </SafeAreaView>
 );
};

export default ForgotPasswordScreen;
