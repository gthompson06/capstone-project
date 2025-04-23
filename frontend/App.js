import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet } from "react-native";
import { AuthContext } from "./src/contexts/AuthContext";
import SignInScreen from "./src/screens/Authentication/SignInScreen";
import CreateAccountScreen from "./src/screens/Authentication/CreateAccountScreen/CreateAccountScreen";
import HomeScreen from "./src/screens/App/HomeScreen";
import ResetPasswordScreen from "./src/screens/Authentication/ResetPasswordScreen";
import ForgotPasswordScreen from "./src/screens/Authentication/ForgotPasswordScreen/ForgotPasswordScreen";
import ProfileScreen from "./src/screens/App/ProfileScreen";
// import CalendarScreen from "./src/screens/App/CalendarScreen";
import FinancesSCreen from "./src/screens/App/FinancesScreen";
import TasksScreen from "./src/screens/App/TasksScreen";
import SchedulesScreen from "./src/screens/App/SchedulesScreen";
import SettingsScreen from "./src/screens/App/SettingsScreen";
import HamburgerLogout from "./src/components/HamburgerLogout/HamburgerLogout";
import SecurityQuestionScreen from "./src/screens/Authentication/SecurityQuestionScreen";
import AddTask from "./src/screens/App/AddTask";
import EditTask from "./src/screens/App/EditTask";
import EditSchedule from "./src/screens/App/EditSchedule/EditSchedule";
import AddSchedule from "./src/screens/App/AddSchedule/AddSchedule";
import AddBankAccount from "./src/screens/App/AddBankAccount/AddBankAccount";
import EditBankAccount from "./src/screens/App/EditBankAccount/EditBankAccount";

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
   <Drawer.Screen name="Finances" component={FinancesSCreen} />
   <Drawer.Screen name="Tasks" component={TasksScreen} />
   <Drawer.Screen name="Schedules" component={SchedulesScreen} />
  </Drawer.Navigator>
 );
};

// Main Stack Navigator
const App = () => {
 return (
  <NavigationContainer>
   <AuthContext>
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
     <Stack.Screen name="AddTask" component={AddTask} />
     <Stack.Screen name="EditTask" component={EditTask} />
     <Stack.Screen name="AddSchedule" component={AddSchedule} />
     <Stack.Screen name="EditSchedule" component={EditSchedule} />
     <Stack.Screen name="AddBankAccount" component={AddBankAccount} />
     <Stack.Screen name="EditBankAccount" component={EditBankAccount} />
    </Stack.Navigator>
   </AuthContext>
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
