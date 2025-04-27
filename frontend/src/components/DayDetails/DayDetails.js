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
import dayjs from "dayjs"; // library to create, format, and compare dates
import { useAuth } from "../../contexts/AuthContext";
import { AppStyles } from "../../styles/AppStyles";

const DayDetails = ({ selectedDate, schedules = [], expenses = [] }) => {
 const { user } = useAuth();
 const styles = AppStyles;

 const [taskList, setTaskList] = useState([]);
 const [selectedTaskIds, setSelectedTaskIds] = useState(new Set());
 const [paidExpenseIds, setPaidExpenseIds] = useState(new Set());

 // set the 'selectedDate' param to a specific format
 const formattedDate = selectedDate.format("dddd, MMMM D");

 // set 'dayName' to just the selectedDate day
 const dayName = selectedDate.format("dddd");

 // iterate through schedules object and check if the 'days' on schedule matches 'dayName'
 const filteredSchedules = schedules.filter((s) => s.days.includes(dayName));

 // iterate through the expense list and see if the selected day on the calendar
 // is the same as the 'payDate' on the expense in the JSON
 const filteredExpenses = expenses.filter((expense) => {
  const payDate = dayjs(expense.payDate);
  return selectedDate.isSame(payDate, "day");
 });

 // fetches all tasks associated with the users ID
 const fetchTasks = async () => {
  try {
   const res = await axios.get(`http://10.0.0.210:5161/tasks/${user.userId}`);
   const fetched = res.data.map((task) => {
    let isOverdue = false;
    // check if the task due date is before the selected day on the calendar
    if (task.hasDueDate && task.dueDate) {
     const dueDate = dayjs(task.dueDate);
     isOverdue = dueDate.isBefore(selectedDate, "day");
    }
    return {
     ...task, // add 'isOverdue' variable to tasks object
     isOverdue,
    };
   });
   setTaskList(fetched);
  } catch (error) {
   console.error("Error fetching tasks:", error);
  }
 };

 // fetch tasks info again on update of the selected day on calendar
 // this is used to update tasks when the user adds a task(s) on the tasks screen
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

 // work in progess
 const handleSetComplete = async (taskId) => {
  try {
   await axios.put(`http://10.0.0.210:5161/tasks/complete/${taskId}`);
   fetchTasks();
   setSelectedTaskId(null);
  } catch (error) {
   console.error("Error marking task complete:", error);
  }
 };

 return (
  <View>
   <Text style={styles.date}>{formattedDate}</Text>

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

export default DayDetails;
