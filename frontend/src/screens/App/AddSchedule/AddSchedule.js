import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import CustomInput from "../../../components/CustomInput";
import { useAuth } from "../../../contexts/AuthContext";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const AddSchedule = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useAuth();
  const { scheduleCount } = route.params || {};

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [frequency, setFrequency] = useState("");

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDay = (day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  const formatTime = (time) => {
    if (!time) return "";
    const dateObj = new Date(time);
    return Platform.OS === "web"
      ? dateObj.toISOString().substring(11, 16)
      : dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSubmit = async () => {
    const formatToISOTime = (time) => {
      if (!time) return null;
      return new Date(time).toISOString();
    };

    const scheduleData = {
      userId: user.userId,
      scheduleId: scheduleCount + 1,
      title,
      description,
      type,
      frequency,
      startTime: formatToISOTime(startTime),
      endTime: formatToISOTime(endTime),
      selectedDays,
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
        <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 20 }}>
          Add Schedule
        </Text>

        <CustomInput value={title} setValue={setTitle} placeholder="Enter title" />
        <CustomInput value={description} setValue={setDescription} placeholder="Enter description" />
        <CustomInput value={type} setValue={setType} placeholder="Enter type" />
        <CustomInput value={frequency} setValue={setFrequency} placeholder="Enter frequency (e.g. M/W/F)" />

        {/* Start Time Picker */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Start Time</Text>
          <TouchableOpacity
            onPress={() => setShowStartTimePicker(true)}
            style={styles.datePickerBox}
          >
            <Text>{formatTime(startTime) || "Select start time"}</Text>
          </TouchableOpacity>
          {showStartTimePicker && (
            <DateTimePicker
              value={startTime ? new Date(startTime) : new Date()}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedTime) => {
                setShowStartTimePicker(false);
                if (selectedTime) setStartTime(selectedTime.toISOString());
              }}
            />
          )}
        </View>

        {/* End Time Picker */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>End Time</Text>
          <TouchableOpacity
            onPress={() => setShowEndTimePicker(true)}
            style={styles.datePickerBox}
          >
            <Text>{formatTime(endTime) || "Select end time"}</Text>
          </TouchableOpacity>
          {showEndTimePicker && (
            <DateTimePicker
              value={endTime ? new Date(endTime) : new Date()}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedTime) => {
                setShowEndTimePicker(false);
                if (selectedTime) setEndTime(selectedTime.toISOString());
              }}
            />
          )}
        </View>

        {/* Select Days */}
        <View style={styles.inputWrapper}>
          <Text style={[styles.label, { marginTop: 10 }]}>Select Days</Text>
          <View style={styles.daysContainer}>
            {daysOfWeek.map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayButton,
                  selectedDays.includes(day) && styles.dayButtonSelected,
                ]}
                onPress={() => toggleDay(day)}
              >
                <Text style={{
                  color: selectedDays.includes(day) ? "#fff" : "#000",
                  fontWeight: "500",
                }}>
                  {day.slice(0, 3)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "#007bff",
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 8,
            marginTop: 20,
            width: "75%",
            maxWidth: 450,
            alignItems: "center",
          }}
          onPress={handleSubmit}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Submit</Text>
        </TouchableOpacity>
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
  datePickerBox: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    width: "75%",
    maxWidth: 450,
    marginVertical: 10,
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
};

export default AddSchedule;