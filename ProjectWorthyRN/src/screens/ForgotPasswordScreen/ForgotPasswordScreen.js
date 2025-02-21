import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet } from 'react-native'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'

const ForgotPasswordScreen = () => {
    const onEnterEmailPressed = () => {
        console.warn("Enter email for forgot password pressed")
    }
    return (
      <SafeAreaView style={styles.main}> 
            <Text style={{fontSize: "40", paddingBottom: "30"}}>Forgot Password?</Text>
            <CustomInput 
                placeholder={"Email Address"}
            />
            <CustomButton 
                text={"Enter"}
                onPress={onEnterEmailPressed}
            />      
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main: {
        alignItems: 'center',
        padding: 20
    }
})

export default ForgotPasswordScreen