import { StatusBar } from "expo-status-bar";
import {
 StyleSheet,
 Text,
 View,
 Image,
 SafeAreaView,
 TouchableWithoutFeedback,
} from "react-native";

export default function App() {
 return (
  <SafeAreaView style={styles.container}>
   <Text>Hello React Native</Text>
   <TouchableWithoutFeedback onPress={() => console.log("Image Tapped")}>
    <Image
     source={{
      width: 200,
      height: 300,
      uri: "https://picsum.photos/200/300",
     }}
    />
   </TouchableWithoutFeedback>
  </SafeAreaView>
 );
}
const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "orange",
  alignItems: "center",
  alignContent: "center",
 },
});
