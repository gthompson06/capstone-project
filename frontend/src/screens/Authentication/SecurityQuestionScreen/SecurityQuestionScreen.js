import React, { Component, useState } from "react";
import {
 Text,
 View,
 SafeAreaView,
 StyleSheet,
 TouchableOpacity,
 Image,
 useWindowDimensions,
 TextInput,
 FlatList,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import CustomInput from "../../../components/CustomInput/CustomInput.js";
import CustomButton from "../../../components/CustomButton/CustomButton.js";
import {
 CreateAccountStyles,
 SecurityQuestionStyles,
} from "../../../styles/Styles.js";
import { useNavigation, useRoute } from "@react-navigation/native";
import BackArrow from "../../../../assets/images/back-arrow.png";
import Logo from "../../../../assets/images/logo.png";
import { FormStyles } from "../../../styles/FormStyles.js";
import AuthHeader from "../../../components/AuthHeader"

const SecurityQuestionScreen = () => {
 const navigation = useNavigation();
 const route = useRoute();
 const styles = FormStyles;

 const { height } = useWindowDimensions();

 const { u, e, p } = route.params || {};
 const [username, setUsername] = useState(u || "");
 const [email, setEmail] = useState(e || "");
 const [password, setPassword] = useState(p || "");
 const [answer, setAnswer] = useState("");
 const [question, setQuestion] = useState(null);
 const [errorMessage, setErrorMessage] = useState("");

 const securityQuestions = [
  "What was your childhood nickname?",
  "What is the name of your first pet?",
  "What was the name of your first school?",
  "What is your mother’s maiden name?",
  "What is your favorite book?",
  "What city were you born in?",
 ];

 const isOnlyLetters = (str) => {
  const regex = /^[A-Za-z]+$/;
  return regex.test(str);
 };

 const onAnswer = async () => {
  if (!question) {
   setErrorMessage("Please select a Security Question!");
   return;
  } else if (!answer) {
   setErrorMessage("Cannot have an empty answer!");
   return;
  }
  if (isOnlyLetters(answer)) {
   setErrorMessage(null);
   console.log("fetching...\n", username, email, password, question, answer);

   const url = "http://localhost:5161/worthy/user/register";

   try {
    console.log("Sending request...");

    const response = await fetch(url, {
     method: "POST",
     headers: {
      "Content-Type": "application/json",
     },
     body: JSON.stringify({
      UserName: username,
      Email: email,
      Password: password,
      SecurityQuestion: question,
      SecurityAnswer: answer,
     }),
    });

    console.log("Response received:", response);

    if (response.status === 401) {
     console.log("Unauthorized, redirecting...");
     navigation.replace("SignIn");
    } else if (!response.ok) {
     throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Server response:", data);
    navigation.replace("SignIn");
   } catch (error) {
    console.error("Fetch error:", error.message);
    console.log("db message: ", error.message);
    // setErrorMessage("Error connecting to the server.");
    setErrorMessage(error.message);
   }
  } else {
   setErrorMessage(
    "Answer should only be letters, no spaces, numbers, or special characters!"
   );
  }
 };

 return (
  <SafeAreaView style={styles.root}>
   <View
    style={styles.container}
   >
    <AuthHeader></AuthHeader>
   
   <Image
    source={Logo}
    style={[styles.logo, { height: height * 0.3 }]}
    resizeMode="contain"
   />
   <Text style={styles.title}>In case you forget your password, select a security question.</Text>
   {/* <CustomInput placeholder="Answer" value={answer} setValue={setAnswer} />
   <CustomButton text="Submit" onPress={onAnswer} /> */}
   <View style={styles.input}>
    <RNPickerSelect
     onValueChange={(value) => setQuestion(value)}
     items={securityQuestions.map((q) => ({ label: q, value: q }))}
     placeholder={{ label: "Select a question...", value: null }}
     style={{
        inputIOS: {
          marginBottom: '4%',
          width: '90%',
          padding: 16,
          fontSize: 16,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          color: 'black',
          alignSelf: 'center',
        },
        inputAndroid: {
          marginBottom: '4%',
          width: '90%',
          padding: 16,
          fontSize: 16,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          color: 'black',
          alignSelf: 'center',
        },
        placeholder: {
          color: '#999',
        }}}
    />
   </View>
   <CustomInput
    placeholder="Enter your security answer..."
    value={answer}
    setValue={setAnswer}
   />
   <CustomButton text="Submit Answer" onPress={onAnswer} />
   {errorMessage ? (
    <Text style={styles.error}>{errorMessage}</Text>
   ) : null}
   </View>
  </SafeAreaView>
 );
};

export default SecurityQuestionScreen;
