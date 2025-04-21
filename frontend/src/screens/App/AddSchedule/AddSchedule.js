import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import CustomInput from "../../../components/CustomInput";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const AddSchedule = () => {
  const navigation = useNavigation();

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        style={{ marginLeft: 15, marginTop: 10, padding: 10 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={{
            flexGrow: 1,
            padding: 20,
            alignItems: "center",
        }}showsVerticalScrollIndicator={false}>
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
            <Text>{startTime ? new Date(startTime).toLocaleTimeString() : "Select start time"}</Text>
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
            <Text>{endTime ? new Date(endTime).toLocaleTimeString() : "Select end time"}</Text>
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