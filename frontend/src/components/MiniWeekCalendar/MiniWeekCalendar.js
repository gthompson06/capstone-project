import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const MiniWeekCalendar = ({ selectedDate, setSelectedDate }) => {
 const today = new Date();
 const startOfWeek = new Date(selectedDate);
 startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

 const weekDates = Array.from({ length: 7 }, (_, i) => {
  const date = new Date(startOfWeek);
  date.setDate(date.getDate() + i);
  return date;
 });

 const isSameDay = (date1, date2) =>
  date1.getDate() === date2.getDate() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getFullYear() === date2.getFullYear();

 return (
  <View style={styles.container}>
   {weekDates.map((date, index) => (
    <TouchableOpacity
     key={index}
     onPress={() => setSelectedDate(date)}
     style={[
      styles.dateContainer,
      isSameDay(date, selectedDate) && styles.selectedDate,
     ]}
    >
     <Text style={styles.day}>
      {date.toLocaleDateString("en-US", { weekday: "short" })}
     </Text>
     <Text style={styles.date}>{date.getDate()}</Text>
    </TouchableOpacity>
   ))}
  </View>
 );
};

const styles = StyleSheet.create({
 container: {
  flexDirection: "row",
  justifyContent: "space-around",
  marginVertical: 10,
 },
 dateContainer: {
  alignItems: "center",
  padding: 10,
  borderRadius: 10,
 },
 selectedDate: {
  backgroundColor: "#007bff",
 },
 day: {
  fontSize: 12,
  color: "#333",
 },
 date: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#333",
 },
});

export default MiniWeekCalendar;
