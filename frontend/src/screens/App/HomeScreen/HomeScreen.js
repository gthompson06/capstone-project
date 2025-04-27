import React, { useEffect, useState } from "react";
import {
 View,
 Text,
 Image,
 SafeAreaView,
 TouchableOpacity,
 ScrollView,
 ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
// import user auth data from context
import { useAuth } from "../../../contexts/AuthContext";
import dayjs from "dayjs";
import MiniWeekCalendar from "../../../components/MiniWeekCalendar";
import DayDetails from "../../../components/DayDetails";
import axios from "axios";
import { AppStyles } from "../../../styles/AppStyles";
import Logo from "../../../../assets/images/logo.png";

const HomeScreen = () => {
 const navigation = useNavigation();
 // get user data from context
 const { user } = useAuth();
 const [selectedDate, setSelectedDate] = useState(dayjs());
 // set display day below calendar to week
 const [currentWeekStart, setCurrentWeekStart] = useState(
  dayjs().startOf("week")
 );
 const [tasks, setTasks] = useState([]);
 const [expenses, setExpenses] = useState([]);
 const [schedules, setSchedules] = useState([]);
 const [loading, setLoading] = useState(true);
 const styles = AppStyles;

 useEffect(() => {
  const fetchData = async () => {
   if (!user?.userId) return;

   // fetch users task, schedule, and expense info using axios
   try {
    const [tasksRes, expensesRes, schedulesRes] = await Promise.all([
     axios.get(`http://10.0.0.210:5161/tasks/${user.userId}`),
     axios.get(`http://10.0.0.210:5161/expenses/${user.userId}`),
     axios.get(`http://10.0.0.210:5161/schedules/${user.userId}`),
    ]);

    setTasks(tasksRes.data || []);
    setExpenses(expensesRes.data || []);
    setSchedules(schedulesRes.data || []);
   } catch (error) {
    console.error("Error fetching user data:", error);
   } finally {
    setLoading(false);
   }
  };

  fetchData();
 }, [user]);

 return (
  <SafeAreaView style={styles.root}>
   <View style={styles.header}>
    <TouchableOpacity
     onPress={() => navigation.openDrawer()}
     style={{ padding: 10, alignSelf: "flex-start" }}
    >
     <Ionicons name="menu" size={50} color="#1762a7" />
    </TouchableOpacity>
    <Image source={Logo} style={styles.logo} resizeMode="contain" />
   </View>

   <View style={styles.container}>
    <Text style={styles.title}>
     Hello,{" "}
     <Text style={{ fontWeight: "bold" }}>{user?.userName || "Guest"}.</Text>
    </Text>

    {/* show calendar */}
    <MiniWeekCalendar
     selectedDate={selectedDate}
     setSelectedDate={setSelectedDate}
     currentWeekStart={currentWeekStart}
     setCurrentWeekStart={setCurrentWeekStart}
    />
    <ScrollView style={styles.dayDetailsContainer}>
     {loading ? (
      <ActivityIndicator
       size="large"
       color="#007bff"
       style={{ marginTop: 20 }}
      />
     ) : (
      // update daydetails with selected date and show tasks, expenses, schedules associated with that day
      <DayDetails
       selectedDate={selectedDate}
       tasks={tasks}
       expenses={expenses}
       schedules={schedules}
      />
     )}
    </ScrollView>
   </View>
  </SafeAreaView>
 );
};

export default HomeScreen;
