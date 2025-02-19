import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';
import React, {useState} from 'react';
import Logo from "../../../assets/images/TestImg.png";
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation(); // Get navigation object

    const onSignInPressed = () => {
        console.warn("sign in button pressed")
        console.warn("username: ", username)
        console.warn("password: ", password) 
        if (username == "Aksel" & password == "pwd"){
            navigation.navigate("HomeScreen"); // Navigate to HomeScreen

        }
        else {
            console.warn("wrong username or password")
        }
    }
    const onCreateAccountPressed = () => {
        console.warn("create account button pressed")
        navigation.navigate("CreateAccount"); // Navigate to CreateAccountScreen
    }

    const {height} = useWindowDimensions();

    return (
        <SafeAreaView style={styles.root}>
            <Image source={Logo}
                style={[styles.logo, {height: height * 0.3}]}
                resizeMode='contain'
            />
            <Text style={{fontSize: "40", paddingBottom: "30"}}>LOGIN</Text>
            <CustomInput
                placeholder="Username"
                value={username}
                setValue={setUsername}
            />
            <CustomInput
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry
            />
            <CustomButton
                text="Sign In"
                onPress={onSignInPressed}
            />
            <CustomButton
                text="Create Account"
                onPress={onCreateAccountPressed}
                type="secondary"
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200
    }
})

export default SignInScreen