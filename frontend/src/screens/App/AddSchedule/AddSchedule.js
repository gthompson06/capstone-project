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
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useAuth } from "../../../contexts/AuthContext";
import { AppStyles } from "../../../styles/AppStyles";

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
  const styles = AppStyles;

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
        headers: { "Content-Type": "application/json" },
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
    <SafeAreaView style={styles.root}>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#1762a7" />
      </TouchableOpacity>

      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Add Schedule</Text>
      </View>

      <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}>
        <CustomInput value={title} setValue={setTitle} placeholder="Enter title" />
        <CustomInput value={description} setValue={setDescription} placeholder="Enter description" />
        <CustomInput value={type} setValue={setType} placeholder="Enter type" />

        <View style={localStyles.inputWrapper}>
          <Text style={localStyles.label}>Start Time (hh:mm AM/PM)</Text>
          <CustomInput
            value={startTime}
            setValue={setStartTime}
            placeholder="e.g. 09:25 AM"
          />
          {!isValidTime(startTime) && startTime.length > 0 && (
            <Text style={styles.error}>Invalid time format</Text>
          )}
        </View>

        <View style={localStyles.inputWrapper}>
          <Text style={localStyles.label}>End Time (hh:mm AM/PM)</Text>
          <CustomInput
            value={endTime}
            setValue={setEndTime}
            placeholder="e.g. 05:45 PM"
          />
          {!isValidTime(endTime) && endTime.length > 0 && (
            <Text style={styles.error}>Invalid time format</Text>
          )}
        </View>

        <View style={localStyles.inputWrapper}>
          <Text style={localStyles.label}>Select Days</Text>
          <View style={localStyles.daysContainer}>
            {daysOfWeek.map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  localStyles.dayButton,
                  days.includes(day) && localStyles.dayButtonSelected,
                ]}
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

        <CustomButton onPress={handleSubmit} text="Create Schedule" />
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
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
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