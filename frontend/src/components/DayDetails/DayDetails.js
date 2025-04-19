import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const DayDetails = ({ selectedDate, tasks, expenses, schedules }) => {
 const isSameDay = (date1, date2) =>
  new Date(date1).toDateString() === new Date(date2).toDateString();

 const filteredTasks = tasks.filter((task) =>
  isSameDay(task.date, selectedDate)
 );
 const filteredExpenses = expenses.filter((expense) =>
  isSameDay(expense.date, selectedDate)
 );
 const filteredSchedules = schedules.filter((schedule) =>
  isSameDay(schedule.date, selectedDate)
 );

 return (
  <ScrollView style={styles.container}>
   <Text style={styles.header}>Tasks</Text>
   {filteredTasks.length > 0 ? (
    filteredTasks.map((task, index) => (
     <Text key={index} style={styles.item}>
      {task.title}
     </Text>
    ))
   ) : (
    <Text style={styles.empty}>No tasks</Text>
   )}

   <Text style={styles.header}>Expenses</Text>
   {filteredExpenses.length > 0 ? (
    filteredExpenses.map((expense, index) => (
     <Text key={index} style={styles.item}>
      ${expense.amount} - {expense.description}
     </Text>
    ))
   ) : (
    <Text style={styles.empty}>No expenses</Text>
   )}

   <Text style={styles.header}>Schedules</Text>
   {filteredSchedules.length > 0 ? (
    filteredSchedules.map((schedule, index) => (
     <Text key={index} style={styles.item}>
      {schedule.title} at {schedule.time}
     </Text>
    ))
   ) : (
    <Text style={styles.empty}>No schedules</Text>
   )}
  </ScrollView>
 );
};

const styles = StyleSheet.create({
 container: {
  padding: 20,
 },
 header: {
  fontSize: 18,
  fontWeight: "bold",
  marginTop: 15,
  marginBottom: 5,
 },
 item: {
  fontSize: 16,
  marginLeft: 10,
  marginBottom: 5,
 },
 empty: {
  fontSize: 14,
  fontStyle: "italic",
  color: "#999",
  marginLeft: 10,
 },
});

export default DayDetails;
