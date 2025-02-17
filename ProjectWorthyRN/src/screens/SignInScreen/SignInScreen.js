import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';
import React, {useState} from 'react';
import Logo from "../../../assets/images/TestImg.png";
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const onSignInPressed = () => {
        console.warn("sign in button pressed")    
    }
    const onCreateAccountPressed = () => {
        console.warn("create account button pressed")    
    }

    const {height} = useWindowDimensions();

    return (
        <View style={styles.root}>
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

        </View>
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