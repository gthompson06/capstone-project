import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer"; // Import Drawer
import { StyleSheet } from "react-native";
import SignInScreen from "./src/screens/SignInScreen";
import CreateAccountScreen from "./src/screens/CreateAccountScreen/CreateAccountScreen";
import HomeScreen from "./src/screens/HomeScreen"; // Ensure this is modified as I suggested before
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen/ForgotPasswordScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import CalendarScreen from "./src/screens/CalendarScreen";
import FinancesSCreen from "./src/screens/FinancesScreen";
import TasksScreen from "./src/screens/TasksScreen";
import SchedulesScreen from "./src/screens/SchedulesScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import HamburgerLogout from "./src/components/HamburgerLogout/HamburgerLogout";
import SecurityQuestionScreen from "./src/screens/SecurityQuestionScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer Navigator
const DrawerNavigator = ({ route }) => {
    return (
        <Drawer.Navigator
            screenOptions={{ headerShown: false }}
            drawerContent={(props) => <HamburgerLogout {...props} />}
        >
            <Drawer.Screen 
                name="Home" 
                component={HomeScreen} 
                initialParams={route?.params} // Pass params to HomeScreen
            />
            <Drawer.Screen name="Calendar" component={CalendarScreen} />
            <Drawer.Screen name="Finances" component={FinancesSCreen} />
            <Drawer.Screen name="Tasks" component={TasksScreen} />
            <Drawer.Screen name="Schedules" component={SchedulesScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
    );
};


// Main Stack Navigator
const App = () => {
 return (
  <NavigationContainer>
   <Stack.Navigator
    initialRouteName="SignIn"
    screenOptions={{ headerShown: false }}
   >
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
    <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
    <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="SecurityQuestion" component={SecurityQuestionScreen}/>
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
});
