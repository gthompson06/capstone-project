import React, { useEffect, useState } from "react";
import {
 View,
 Text,
 ScrollView,
 TouchableOpacity,
 ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import MiniWeekCalendar from "../../../components/MiniWeekCalendar/MiniWeekCalendar";
import DayDetails from "../../../components/DayDetails/DayDetails";
import { useAuth } from "../../../contexts/AuthContext";

const HomeScreen = ({ navigation }) => {
 const [selectedDate, setSelectedDate] = useState(new Date());
 const { user } = useAuth();
 const [tasks, setTasks] = useState([]);
 const [expenses, setExpenses] = useState([]);
 const [schedules, setSchedules] = useState([]);
 const [loading, setLoading] = useState(true);

 const fetchData = async () => {
  if (!user?.userId) return;

  try {
   const [tasksRes, expensesRes, schedulesRes] = await Promise.all([
    axios.get(`https://worthy-api.link/api/Task/user/${user.userId}`),
    axios.get(`https://worthy-api.link/api/Expense/user/${user.userId}`),
    axios.get(`https://worthy-api.link/api/Schedule/user/${user.userId}`),
   ]);

   setTasks(tasksRes.data || []);
   setExpenses(expensesRes.data || []);
   setSchedules(schedulesRes.data || []);
  } catch (err) {
   console.error("Error fetching data:", err);
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchData();
 }, [user]);

 return (
  <ScrollView
   contentContainerStyle={{
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
   }}
  >
   <TouchableOpacity
    onPress={() => navigation.openDrawer()}
    style={{ alignSelf: "flex-start", padding: 10 }}
   >
    <Ionicons name="menu" size={30} color="black" />
   </TouchableOpacity>

   <Text
    style={{
     textAlign: "center",
     fontSize: 22,
     marginBottom: 10,
    }}
   >
    Welcome {user?.userName || "Guest"} (ID: {user?.userId || "null"})
   </Text>

   <View style={{ marginVertical: 10, width: "100%" }}>
    <MiniWeekCalendar
     selectedDate={selectedDate}
     setSelectedDate={setSelectedDate}
    />
   </View>

   {loading ? (
    <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
   ) : (
    <View style={{ width: "100%", marginTop: 10 }}>
     <DayDetails
      selectedDate={selectedDate}
      tasks={tasks}
      expenses={expenses}
      schedules={schedules}
     />
    </View>
   )}
  </ScrollView>
 );
};

export default HomeScreen;
