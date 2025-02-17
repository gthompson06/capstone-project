import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import SignInScreen from "./src/screens/SignInScreen";
import CreateAccountScreen from "./src/screens/CreateAccountScreen/CreateAccountScreen";

export default function App() {
 return (
  <SafeAreaView style={styles.container}>
   {/* <SignInScreen /> */}
   <CreateAccountScreen />
   <StatusBar style="auto" />
  </SafeAreaView>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "white",
 },
});
//in aksel branch
