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
import CustomInput from "../../components/CustomInput/CustomInput.js";
import CustomButton from "../../components/CustomButton/CustomButton.js";
import { CreateAccountStyles } from "../../styles/Styles.js";
import { useNavigation, useRoute } from "@react-navigation/native";
import BackArrow from "../../../assets/images/backArrow.png";
import Logo from "../../../assets/images/TestImg.png";

const SecurityQuestionScreen = () => {
 const navigation = useNavigation();
 const route = useRoute();

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
  const regex = /^[A-Za-z]+$/; // Only allows uppercase and lowercase letters
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
   console.log(username, email, password, question, answer);
   const url = "http://40.141.207.2/worthy/user/register";
   //   const response = await fetch(url, {
   //    method: "POST",
   //    headers: {
   //     "Content-Type": "application/json",
   //    },
   //    body: JSON.stringify({
   //     UserName: username,
   //     Email: email,
   //     Password: password,
   //     SecurityQuestion: question,
   //     SecurityAnswer: answer,
   //    }),
   //   });
   //   console.log(response);
   //   if (response.status == 401) {
   //    console.log(response);
   //    navigation.replace("SignIn");
   //   }
   //   if (!response.ok) {
   //    throw new Error(response);
   //   }
  } else {
   setErrorMessage(
    "Answer should only be letters, no spaces, numbers, or special characters!"
   );
  }
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
   <RNPickerSelect
    onValueChange={(value) => setQuestion(value)}
    items={securityQuestions.map((q) => ({ label: q, value: q }))}
    placeholder={{ label: "Select a question", value: null }}
   />
   <CustomInput
    placeholder="No Spaces, Numbers, or Special Characters"
    value={answer}
    setValue={setAnswer}
   />
   <CustomButton text="Submit Answer" onPress={onAnswer} />
   {errorMessage ? (
    <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>
   ) : null}
  </SafeAreaView>
 );
};

export default SecurityQuestionScreen;
