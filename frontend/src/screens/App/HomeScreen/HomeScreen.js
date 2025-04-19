import React, { useState } from "react";
import {
 View,
 Text,
 SafeAreaView,
 TouchableOpacity,
 ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../contexts/AuthContext";
import dayjs from "dayjs";
import MiniWeekCalendar from "../../../components/MiniWeekCalendar";
import DayDetails from "../../../components/DayDetails";

const HomeScreen = () => {
 const navigation = useNavigation();
 const { user } = useAuth();
 const [selectedDate, setSelectedDate] = useState(dayjs());
 const [currentWeekStart, setCurrentWeekStart] = useState(
  dayjs().startOf("week")
 );

 return (
  <SafeAreaView style={{ flex: 1, padding: 16 }}>
   <TouchableOpacity
    onPress={() => navigation.openDrawer()}
    style={{ padding: 10 }}
   >
    <Ionicons name="menu" size={30} color="black" />
   </TouchableOpacity>

   <Text style={{ textAlign: "center", fontSize: 22, marginBottom: 10 }}>
    Welcome {user?.userName || "Guest"} (ID: {user?.userId || "null"})
   </Text>

   <MiniWeekCalendar
    selectedDate={selectedDate}
    setSelectedDate={setSelectedDate}
    currentWeekStart={currentWeekStart}
    setCurrentWeekStart={setCurrentWeekStart}
   />

   <ScrollView
    contentContainerStyle={{ alignItems: "center", paddingBottom: 20 }}
   >
    <DayDetails selectedDate={selectedDate} />
   </ScrollView>
  </SafeAreaView>
 );
};

export default HomeScreen;
