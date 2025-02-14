import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
 return (
  <View style={styles.container}>
   <Text>Project Worthy</Text>
   <StatusBar style="auto" />
  </View>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "dodgerblue",
  alignItems: "center",
  justifyContent: "center",
 },
});