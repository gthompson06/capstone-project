import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet } from "react-native";
import SignInScreen from "./src/screens/Authentication/SignInScreen";
import CreateAccountScreen from "./src/screens/Authentication/CreateAccountScreen/CreateAccountScreen";
import HomeScreen from "./src/screens/App/HomeScreen";
import ResetPasswordScreen from "./src/screens/Authentication/ResetPasswordScreen";
import ForgotPasswordScreen from "./src/screens/Authentication/ForgotPasswordScreen/ForgotPasswordScreen";
import ProfileScreen from "./src/screens/App/ProfileScreen";
import CalendarScreen from "./src/screens/App/CalendarScreen";
import FinancesSCreen from "./src/screens/App/FinancesScreen";
import TasksScreen from "./src/screens/App/TasksScreen";
import SchedulesScreen from "./src/screens/App/SchedulesScreen";
import SettingsScreen from "./src/screens/App/SettingsScreen";
import HamburgerLogout from "./src/components/HamburgerLogout/HamburgerLogout";
import SecurityQuestionScreen from "./src/screens/Authentication/SecurityQuestionScreen";
import { Authenticator } from "./src/contexts/Context";

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
  <Authenticator>
   <NavigationContainer>
    <Stack.Navigator
     initialRouteName="SignIn"
     screenOptions={{ headerShown: false }}
    >
     <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
     <Stack.Screen name="SignIn" component={SignInScreen} />
     <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
     <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
     <Stack.Screen name="SecurityQuestion" component={SecurityQuestionScreen} />
     <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
    </Stack.Navigator>
   </NavigationContainer>
  </Authenticator>
 );
};

export default App;

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "white",
 },
});
