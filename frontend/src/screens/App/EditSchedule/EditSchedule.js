import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { AppStyles } from "../../../styles/AppStyles";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const timeRegex = /^(0[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/;

const EditSchedule = () => {
  const navigation = useNavigation();
  const { schedule } = useRoute().params;
  const styles = AppStyles;

  const [title, setTitle] = useState(schedule?.title || "");
  const [description, setDescription] = useState(schedule?.description || "");
  const [type, setType] = useState(schedule?.type || "");
  const [startTime, setStartTime] = useState(schedule?.startTime || "");
  const [endTime, setEndTime] = useState(schedule?.endTime || "");
  const [selectedDays, setSelectedDays] = useState(schedule?.days || []);

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const validateTime = (time) => {
    if (!timeRegex.test(time)) {
      Alert.alert("Invalid Time", "Please enter time as hh:mm AM/PM");
      return false;
    }
    return true;
  };

  const handleUpdate = async () => {
    if (!validateTime(startTime) || !validateTime(endTime)) return;

    const updatedSchedule = {
      ...schedule,
      title,
      description,
      type,
      startTime,
      endTime,
      days: selectedDays,
    };

    try {
      const response = await fetch(
        `http://localhost:5161/schedules/${schedule.userId}/${schedule.scheduleId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedSchedule),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      console.log("Schedule updated:", data);
      navigation.goBack();
    } catch (error) {
      console.error("Error updating schedule:", error);
      Alert.alert("Error", "Failed to update schedule. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#1762a7" />
      </TouchableOpacity>

      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Edit Schedule</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <CustomInput value={title} setValue={setTitle} placeholder="Enter title" />
        <CustomInput value={description} setValue={setDescription} placeholder="Enter description" />
        <CustomInput value={type} setValue={setType} placeholder="Enter type" />

        <View style={localStyles.inputWrapper}>
          <Text style={localStyles.label}>Start Time</Text>
          <TextInput
            value={startTime}
            onChangeText={setStartTime}
            placeholder="e.g., 09:00 AM"
            style={localStyles.textInput}
          />
        </View>

        <View style={localStyles.inputWrapper}>
          <Text style={localStyles.label}>End Time</Text>
          <TextInput
            value={endTime}
            onChangeText={setEndTime}
            placeholder="e.g., 05:00 PM"
            style={localStyles.textInput}
          />
        </View>

        <Text style={[localStyles.label, { marginTop: 15 }]}>Select Days</Text>
        <View style={localStyles.daysContainer}>
          {daysOfWeek.map((day) => (
            <TouchableOpacity
              key={day}
              onPress={() => toggleDay(day)}
              style={[
                localStyles.dayButton,
                selectedDays.includes(day) && localStyles.daySelected,
              ]}
            >
              <Text style={{ color: selectedDays.includes(day) ? "#fff" : "#000" }}>
                {day.slice(0, 3)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <CustomButton onPress={handleUpdate} text="Save Changes" />
      </ScrollView>
    </SafeAreaView>
  );
};

const localStyles = {
  label: {
    alignSelf: "flex-start",
    fontSize: 18,
    marginTop: 10,
    marginLeft: "12.5%",
  },
  inputWrapper: {
    width: "75%",
    maxWidth: 450,
    marginBottom: 20,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
    width: "100%",
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "90%",
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
  daySelected: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
};

export default EditSchedule;