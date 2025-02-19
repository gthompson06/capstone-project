import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import SignInScreen from "./src/screens/SignInScreen";
import CreateAccountScreen from "./src/screens/CreateAccountScreen/CreateAccountScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen/ForgotPasswordScreen";

const Stack = createStackNavigator();


const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown: false}}>
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "white",
 },
},
);
//in aksel branch
