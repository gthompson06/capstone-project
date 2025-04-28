import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";

const MiniWeekCalendar = ({
 selectedDate,
 setSelectedDate,
 currentWeekStart,
 setCurrentWeekStart,
}) => {
 // create weekDays array (mon-sun)
 const weekDays = Array.from({ length: 7 }, (_, i) =>
  currentWeekStart.add(i, "day")
 );

 const goToNextWeek = () =>
  setCurrentWeekStart(currentWeekStart.add(1, "week"));

 const goToPrevWeek = () =>
  setCurrentWeekStart(currentWeekStart.subtract(1, "week"));

 return (
  <SafeAreaView style={{ alignItems: "center", marginBottom: 10 }}>
   <View
    style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}
   >
    <TouchableOpacity onPress={goToPrevWeek} style={{ marginHorizontal: 10 }}>
     <Text style={{ fontSize: 18, color: "white" }}>{`<`}</Text>
    </TouchableOpacity>
    <Text style={{ fontWeight: "bold", fontSize: 16, color: "white" }}>
     {currentWeekStart.format("MMMM YYYY")}
    </Text>
    <TouchableOpacity onPress={goToNextWeek} style={{ marginHorizontal: 10 }}>
     <Text style={{ fontSize: 18, color: "white" }}>{`>`}</Text>
    </TouchableOpacity>
   </View>

   <View style={{ flexDirection: "row", justifyContent: "center" }}>
    {/* show each day in weekDays array and set selected to true when clicked on */}
    {weekDays.map((day, index) => {
     const isSelected = selectedDate.isSame(day, "day");
     return (
      <TouchableOpacity
       key={index}
       onPress={() => setSelectedDate(day)}
       style={{
        padding: 6,
        borderRadius: 8,
        backgroundColor: isSelected ? "#1762a7" : "#eee",
        borderColor: isSelected ? "white" : "#1762a7",
        borderWidth: isSelected ? 1 : 0,
        marginHorizontal: 3,
        alignItems: "center",
        width: 40,
       }}
      >
       <Text
        style={{
         fontSize: 12,
         color: isSelected ? "white" : "#1762a7",
        }}
       >
        {day.format("dd")}
       </Text>
       <Text
        style={{
         fontSize: 14,
         fontWeight: "bold",
         color: isSelected ? "white" : "#1762a7",
        }}
       >
        {day.format("D")}
       </Text>
      </TouchableOpacity>
     );
    })}
   </View>
  </SafeAreaView>
 );
};

export default MiniWeekCalendar;
