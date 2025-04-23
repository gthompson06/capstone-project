import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import CustomInput from "../../../components/CustomInput";
import { useAuth } from "../../../contexts/AuthContext";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const isValidTime = (time) => {
  const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;
  return timeRegex.test(time.trim());
};

const AddSchedule = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useAuth();
  const { scheduleCount } = route.params || {};

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [days, setDays] = useState([]);

  const toggleDay = (day) => {
    setDays((prevDays) =>
      prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]
    );
  };

  const handleSubmit = async () => {
    if (!isValidTime(startTime) || !isValidTime(endTime)) {
      Alert.alert("Invalid Time", "Please enter valid times in hh:mm AM/PM format.");
      return;
    }

    const scheduleData = {
      scheduleId: (Number(scheduleCount) || 0) + 1,
      userId: user.userId,
      title,
      description,
      type,
      startTime: startTime.trim(),
      endTime: endTime.trim(),
      days,
    };

    try {
      const response = await fetch(`http://localhost:5161/schedules`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scheduleData), 
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Schedule created:", data);
        navigation.goBack();
      } else {
        const errorText = await response.text();
        console.error("Error creating schedule:", errorText);
      }
    } catch (error) {
      console.error("Error creating schedule:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        style={{ marginLeft: 15, marginTop: 10, padding: 10 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ padding: 20, alignItems: "center" }}>
        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={{ color: "white", fontSize: 16 }}>Create Schedule</Text>
        </TouchableOpacity>

        <CustomInput value={title} setValue={setTitle} placeholder="Enter title" />
        <CustomInput value={description} setValue={setDescription} placeholder="Enter description" />
        <CustomInput value={type} setValue={setType} placeholder="Enter type" />

        {/* Start Time Input */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Start Time (hh:mm AM/PM)</Text>
          <CustomInput
            value={startTime}
            setValue={setStartTime}
            placeholder="e.g. 09:25 AM"
            keyboardType="default"
          />
          {!isValidTime(startTime) && startTime.length > 0 && (
            <Text style={{ color: "red", marginTop: 4 }}>Invalid time format</Text>
          )}
        </View>

        {/* End Time Input */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>End Time (hh:mm AM/PM)</Text>
          <CustomInput
            value={endTime}
            setValue={setEndTime}
            placeholder="e.g. 05:45 PM"
            keyboardType="default"
          />
          {!isValidTime(endTime) && endTime.length > 0 && (
            <Text style={{ color: "red", marginTop: 4 }}>Invalid time format</Text>
          )}
        </View>

        {/* Select Days */}
        <View style={styles.inputWrapper}>
          <Text style={[styles.label, { marginTop: 10 }]}>Select Days</Text>
          <View style={styles.daysContainer}>
            {daysOfWeek.map((day) => (
              <TouchableOpacity
                key={day}
                style={[styles.dayButton, days.includes(day) && styles.dayButtonSelected]}
                onPress={() => toggleDay(day)}
              >
                <Text
                  style={{
                    color: days.includes(day) ? "#fff" : "#000",
                    fontWeight: "500",
                  }}
                >
                  {day.slice(0, 3)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  label: {
    alignSelf: "flex-start",
    fontSize: 18,
    marginTop: 10,
    marginLeft: "12.5%",
  },
  inputWrapper: {
    width: "75%",
    maxWidth: 450,
    marginBottom: 10,
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "90%",
    maxWidth: 450,
    marginVertical: 10,
  },
  dayButton: {
    padding: 10,
    margin: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    minWidth: 50,
    alignItems: "center",
  },
  dayButtonSelected: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  submitButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
    width: "75%",
    maxWidth: 450,
    alignItems: "center",
  },
};

export default AddSchedule;