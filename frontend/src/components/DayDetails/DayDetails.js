import React, { useState, useEffect } from "react";
import {
 View,
 Text,
 SafeAreaView,
 StyleSheet,
 TouchableOpacity,
 Button,
} from "react-native";
import axios from "axios";
import dayjs from "dayjs";
import { useAuth } from "../../contexts/AuthContext";

const DayDetails = ({ selectedDate, schedules = [], expenses = [] }) => {
 const [taskList, setTaskList] = useState([]);
 const [selectedTaskId, setSelectedTaskId] = useState(null);
 const formattedDate = selectedDate.format("dddd, MMMM D");
 const dayName = selectedDate.format("dddd");
 const { user } = useAuth();

 const filteredSchedules = schedules.filter((s) => s.days.includes(dayName));

 const filteredExpenses = expenses.filter((expense) => {
  const payDate = dayjs(expense.payDate);
  return selectedDate.isSame(payDate, "day");
 });

 const fetchTasks = async () => {
  try {
   const res = await axios.get(`http://localhost:5161/tasks/${user.userId}`);
   const fetched = res.data.map((task) => {
    let isOverdue = false;
    if (task.hasDueDate && task.dueDate) {
     const dueDate = dayjs(task.dueDate);
     isOverdue = dueDate.isBefore(selectedDate, "day");
    }
    return {
     ...task,
     isOverdue,
    };
   });
   setTaskList(fetched);
  } catch (error) {
   console.error("Error fetching tasks:", error);
  }
 };

 useEffect(() => {
  if (user?.userId) {
   fetchTasks();
  }
 }, [selectedDate, user?.userId]);

 const handleTaskPress = (taskId) => {
  setSelectedTaskId((prev) => (prev === taskId ? null : taskId));
 };

 const handleSetComplete = async (taskId) => {
  try {
   await axios.put(`http://localhost:5161/tasks/complete/${taskId}`);
   fetchTasks(); // Refresh tasks
   setSelectedTaskId(null);
  } catch (error) {
   console.error("Error marking task complete:", error);
  }
 };

 return (
  <SafeAreaView style={{ marginTop: 20, width: "100%", paddingHorizontal: 20 }}>
   <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>
    {formattedDate}
   </Text>

   {/* Schedules */}
   <View style={styles.sectionContainer}>
    <Text style={styles.sectionHeader}>On Your Schedule</Text>
    {filteredSchedules.length > 0 ? (
     filteredSchedules.map((item, idx) => (
      <View key={idx} style={styles.scheduleItem}>
       <Text style={styles.scheduleTitle}>{item.title}</Text>
       <Text style={styles.scheduleTime}>
        {item.startTime} - {item.endTime}
       </Text>
      </View>
     ))
    ) : (
     <Text style={styles.emptyText}>Nothing on the Schedule Today!</Text>
    )}
   </View>

   {/* Expenses */}
   <View style={styles.sectionContainer}>
    <Text style={styles.sectionHeader}>Expenses Due Today</Text>
    {filteredExpenses.length > 0 ? (
     filteredExpenses.map((item, idx) => (
      <Text key={idx} style={styles.expenseText}>
       {item.title}: ${item.amount}
      </Text>
     ))
    ) : (
     <Text style={styles.emptyText}>No Expenses Due Today!</Text>
    )}
   </View>

   {/* Tasks */}
   <View style={styles.sectionContainer}>
    <Text style={styles.sectionHeader}>Tasks</Text>
    {taskList.length > 0 ? (
     taskList.map((item) => {
      const isSelected = selectedTaskId === item.taskId;
      return (
       <View key={item.taskId} style={{ marginBottom: 10 }}>
        <TouchableOpacity
         onPress={() => handleTaskPress(item.taskId)}
         style={[styles.taskContainer, isSelected && styles.taskSelected]}
        >
         <Text
          style={[
           styles.taskText,
           item.isOverdue ? { color: "red" } : { color: "black" },
          ]}
         >
          {item.title}
          {item.isOverdue && item.dueDate ? ` (Due: ${item.dueDate})` : ""}
         </Text>
        </TouchableOpacity>
        {isSelected && (
         <View style={styles.completeButton}>
          <Button
           title="Set to Complete"
           onPress={() => handleSetComplete(item.taskId)}
           color="#2196F3"
          />
         </View>
        )}
       </View>
      );
     })
    ) : (
     <Text style={styles.emptyText}>No tasks!</Text>
    )}
   </View>
  </SafeAreaView>
 );
};

const styles = StyleSheet.create({
 sectionContainer: {
  backgroundColor: "white",
  borderRadius: 10,
  padding: 15,
  marginVertical: 10,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 1,
 },
 sectionHeader: {
  fontSize: 16,
  fontWeight: "600",
  marginBottom: 8,
  textAlign: "center",
 },
 scheduleItem: {
  marginBottom: 6,
 },
 scheduleTitle: {
  fontWeight: "500",
  textAlign: "center",
 },
 scheduleTime: {
  color: "#2196F3",
  textAlign: "center",
 },
 taskContainer: {
  backgroundColor: "#fff",
  borderRadius: 8,
  padding: 10,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.08,
  shadowRadius: 1.5,
  elevation: 1,
 },
 taskSelected: {
  opacity: 0.5,
 },
 taskText: {
  fontWeight: "500",
  textAlign: "center",
 },
 completeButton: {
  marginTop: 6,
  alignSelf: "center",
  width: "60%",
 },
 expenseText: {
  marginBottom: 6,
  textAlign: "center",
  color: "red",
 },
 emptyText: {
  textAlign: "center",
  color: "green",
 },
});

export default DayDetails;
