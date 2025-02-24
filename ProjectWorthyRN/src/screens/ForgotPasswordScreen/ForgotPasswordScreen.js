import React, { Component, useState } from 'react'
import { Text, View, SafeAreaView, StyleSheet } from 'react-native'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import { CreateAccountStyles } from "../../styles/Styles.js";


const ForgotPasswordScreen = () => {
     const [email, setEmail] = useState("");
    const onEnterEmailPressed = () => {
        console.warn("Enter email for forgot password pressed")
    }
    return (
        <SafeAreaView style={CreateAccountStyles.root}>
            <Text style={{ fontSize: 40, paddingBottom: 30 }}>FORGOT PASSWORD?</Text>
            <CustomInput
                placeholder="Enter"
                value={email}
                setValue={setEmail}
            />
            <CustomButton text="Sign In" onPress={onEnterEmailPressed} />
       </SafeAreaView>
      );
     };
     
     
export default ForgotPasswordScreen