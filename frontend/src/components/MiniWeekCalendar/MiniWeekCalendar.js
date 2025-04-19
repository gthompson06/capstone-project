import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import dayjs from "dayjs";

const MiniWeekCalendar = ({ selectedDate, setSelectedDate }) => {
  const startOfWeek = dayjs().startOf("week");

  const weekDays = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
      {weekDays.map((day, index) => {
        const isSelected = selectedDate.isSame(day, "day");
        return (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedDate(day)}
            style={{
              padding: 10,
              borderRadius: 10,
              backgroundColor: isSelected ? "#2196F3" : "#eee",
              alignItems: "center",
              marginHorizontal: 4,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{day.format("dd")}</Text>
            <Text>{day.format("D")}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MiniWeekCalendar;