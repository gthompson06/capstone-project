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
import { useAuth } from "../../../contexts/AuthContext";
import dayjs from "dayjs";
import MiniWeekCalendar from "../../../components/MiniWeekCalendar";
import DayDetails from "../../../components/DayDetails";
import axios from "axios";
import { AppStyles } from "../../../styles/AppStyles";
import Logo from "../../../../assets/images/logo.png";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(dayjs());
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

      try {
        const [tasksRes, expensesRes, schedulesRes] = await Promise.all([
          axios.get(`http://localhost:5161/tasks/${user.userId}`),
          axios.get(`http://localhost:5161/expenses/${user.userId}`),
          axios.get(`http://localhost:5161/schedules/${user.userId}`),
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
        <Image
                  source={Logo}
                  style={styles.logo}
                  resizeMode="contain"
                />
      </View>

      <View style={styles.container}>
        <Text
          style={styles.title}
        >
          {/* Welcome {user?.userName || "Guest"} (ID: {user?.userId || "null"}) */}
          Hello, <Text style={{fontWeight: "bold"}}>{user?.userName || "Guest"}.</Text>
        </Text>

        
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
