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
import { AppStyles } from "../../styles/AppStyles";

const DayDetails = ({ selectedDate, schedules = [], expenses = [] }) => {
 const { user } = useAuth();
 const styles = AppStyles;

 const [taskList, setTaskList] = useState([]);
 const [selectedTaskIds, setSelectedTaskIds] = useState(new Set());
 const [paidExpenseIds, setPaidExpenseIds] = useState(new Set());

 const formattedDate = selectedDate.format("dddd, MMMM D");
 const dayName = selectedDate.format("dddd");

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
  setSelectedTaskIds((prev) => {
   const updated = new Set(prev);
   if (updated.has(taskId)) {
    updated.delete(taskId);
   } else {
    updated.add(taskId);
   }
   return updated;
  });
 };

 const handleExpensePress = (expenseId) => {
  setPaidExpenseIds((prev) => {
   const updated = new Set(prev);
   if (updated.has(expenseId)) {
    updated.delete(expenseId);
   } else {
    updated.add(expenseId);
   }
   return updated;
  });
 };

 const handleSetComplete = async (taskId) => {
  try {
   await axios.put(`http://localhost:5161/tasks/complete/${taskId}`);
   fetchTasks();
   setSelectedTaskId(null);
  } catch (error) {
   console.error("Error marking task complete:", error);
  }
 };

 return (
  <View>
   <Text style={styles.date}>
    {formattedDate}
   </Text>

   {/* Schedules */}
   
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
   

   {/* Expenses */}
    <Text style={styles.sectionHeader}>Expenses Due Today</Text>
    {filteredExpenses.length > 0 ? (
     filteredExpenses.map((item) => (
      <TouchableOpacity
       key={item.expenseId}
       onPress={() => handleExpensePress(item.expenseId)}
       style={{ marginBottom: 6 }}
      >
       <Text
        style={[
         styles.expenseText,
         paidExpenseIds.has(item.expenseId) && {
          textDecorationLine: "line-through",
          color: "gray",
         },
        ]}
       >
        {item.title}: ${item.amount}
        {paidExpenseIds.has(item.expenseId) && " ✅ Paid"}
       </Text>
      </TouchableOpacity>
     ))
    ) : (
     <Text style={styles.emptyText}>No Expenses Due Today!</Text>
    )}

   {/* Tasks */}
    <Text style={styles.sectionHeader}>Tasks</Text>
    {taskList.length > 0 ? (
     taskList.map((item) => {
      const isSelected = selectedTaskIds.has(item.taskId);
      return (
       <TouchableOpacity
        key={item.taskId}
        onPress={() => handleTaskPress(item.taskId)}
        style={[styles.taskContainer]}
       >
        <Text
         style={[
          styles.taskText,
          item.isOverdue ? { color: "red" } : { color: "black" },
          isSelected && { textDecorationLine: "line-through", opacity: 0.6 },
         ]}
        >
         {item.title}
         {item.isOverdue && item.dueDate ? ` (Due: ${item.dueDate})` : ""}
        </Text>
       </TouchableOpacity>
      );
     })
    ) : (
     <Text style={styles.emptyText}>No tasks!</Text>
    )}
  </View>
 );
};

// const styles = StyleSheet.create({
    
//  sectionContainer: {
//     backgroundColor: "white",
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#1762a7",
//     width: "80%",
//     padding: 15,
//     marginVertical: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 1,
//  },
//  sectionHeader: {
//   fontSize: 16,
//   fontWeight: "600",
//   marginBottom: 8,
//   textAlign: "left",
//  },
//  scheduleItem: {
//   marginBottom: 6,
//   padding: "4%",
//   borderWidth: 1
//  },
//  scheduleTitle: {
//   fontWeight: "500",
//   textAlign: "center",
//  },
//  scheduleTime: {
//   color: "#2196F3",
//   textAlign: "center",
//  },
//  taskContainer: {
//   backgroundColor: "#fff",
//   borderRadius: 8,
//   padding: 10,
//   shadowColor: "#000",
//   shadowOffset: { width: 0, height: 1 },
//   shadowOpacity: 0.08,
//   shadowRadius: 1.5,
//   elevation: 1,
//  },
//  taskSelected: {
//   opacity: 0.5,
//  },
//  taskText: {
//   fontWeight: "500",
//   textAlign: "center",
//  },
//  completeButton: {
//   marginTop: 6,
//   alignSelf: "center",
//   width: "80%",
//  },
//  expenseText: {
//   marginBottom: 6,
//   textAlign: "center",
//   color: "red",
//  },
//  emptyText: {
//   textAlign: "center",
//   color: "green",
//  },
// });

export default DayDetails;
