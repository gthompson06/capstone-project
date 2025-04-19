import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import dayjs from "dayjs";

const DayDetails = ({
 selectedDate,
 tasks = [],
 schedules = [],
 expenses = [],
}) => {
 const formattedDate = selectedDate.format("dddd, MMMM D");
 const dayName = selectedDate.format("dddd");

 const filteredSchedules = schedules.filter((s) => s.days.includes(dayName));

 const allTasks = tasks.map((task) => {
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

 const filteredExpenses = expenses.filter((expense) => {
  const payDate = dayjs(expense.payDate);
  return selectedDate.isSame(payDate, "day");
 });

 return (
  <SafeAreaView style={{ marginTop: 20, width: "100%", paddingHorizontal: 20 }}>
   <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>
    {formattedDate}
   </Text>

   <View style={styles.sectionContainer}>
    <Text style={styles.sectionHeader}>Your Schedule</Text>
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
     <Text style={{ textAlign: "Center", color: "green" }}>
      Nothing on the Schedule Today!
     </Text>
    )}
   </View>

   <View style={styles.sectionContainer}>
    <Text style={styles.sectionHeader}>Tasks</Text>
    {allTasks.length > 0 ? (
     allTasks.map((item, idx) => (
      <Text
       key={idx}
       style={[
        styles.taskText,
        item.isOverdue ? { color: "red" } : { color: "black" },
       ]}
      >
       • {item.title}
       {item.isOverdue && item.dueDate ? ` (Due: ${item.dueDate})` : ""}
      </Text>
     ))
    ) : (
     <Text style={{ textAlign: "center", color: "green" }}>No tasks!</Text>
    )}
   </View>

   <View style={styles.sectionContainer}>
    <Text style={styles.sectionHeader}>Expenses Due</Text>
    {filteredExpenses.length > 0 ? (
     filteredExpenses.map((item, idx) => (
      <Text key={idx} style={styles.expenseText}>
       {item.title}: ${item.amount}
      </Text>
     ))
    ) : (
     <Text style={{ textAlign: "Center", color: "green" }}>
      No Expenses Due Today!
     </Text>
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
  textAlign: "Center",
 },
 scheduleItem: {
  marginBottom: 6,
 },
 scheduleTitle: {
  fontWeight: "500",
  textAlign: "Center",
 },
 scheduleTime: {
  color: "green",
  textAlign: "Center",
 },
 taskText: {
  marginBottom: 6,
 },
 expenseText: {
  marginBottom: 6,
 },
});

export default DayDetails;
