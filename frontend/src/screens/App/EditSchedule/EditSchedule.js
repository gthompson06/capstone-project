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

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const EditSchedule = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { schedule } = route.params;

  const [title, setTitle] = useState(schedule?.title || "");
  const [description, setDescription] = useState(schedule?.description || "");
  const [type, setType] = useState(schedule?.type || "");
  const [frequency, setFrequency] = useState(schedule?.frequency || "");

  const [startTime, setStartTime] = useState(schedule?.startTime || "");
  const [endTime, setEndTime] = useState(schedule?.endTime || "");
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const [selectedDays, setSelectedDays] = useState(schedule?.days || []);

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <TouchableOpacity
        style={{ marginLeft: 15, marginTop: 10, padding: 10 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>

      <ScrollView
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{ alignItems: "center", padding: 20, paddingBottom: 60 }}
        showsVerticalScrollIndicator={true}
      >
        <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 20 }}>
          Edit Schedule
        </Text>

        <CustomInput value={title} setValue={setTitle} placeholder="Enter title" />
        <CustomInput value={description} setValue={setDescription} placeholder="Enter description" />
        <CustomInput value={type} setValue={setType} placeholder="Enter type" />
        <CustomInput value={frequency} setValue={setFrequency} placeholder="Enter frequency (e.g. daily)" />

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Start Time</Text>
          <TouchableOpacity
            onPress={() => setShowStartTimePicker(true)}
            style={styles.datePickerBox}
          >
            <Text>
              {startTime ? new Date(startTime).toLocaleTimeString() : "Select start time"}
            </Text>
          </TouchableOpacity>
          {showStartTimePicker && (
            <DateTimePicker
              value={startTime ? new Date(startTime) : new Date()}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedTime) => {
                setShowStartTimePicker(false);
                if (selectedTime) {
                  console.log("selected start time: ", selectedTime.toISOString());
                  setStartTime(selectedTime.toISOString());
                }
              }}
            />
          )}
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>End Time</Text>
          <TouchableOpacity
            onPress={() => setShowEndTimePicker(true)}
            style={styles.datePickerBox}
          >
            <Text>
              {endTime ? new Date(endTime).toLocaleTimeString() : "Select end time"}
            </Text>
          </TouchableOpacity>
          {showEndTimePicker && (
            <DateTimePicker
              value={endTime ? new Date(endTime) : new Date()}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedTime) => {
                setShowEndTimePicker(false);
                if (selectedTime) {
                  console.log("selected end time: ", selectedTime.toISOString());
                  setEndTime(selectedTime.toISOString());
                }
              }}
            />
          )}
        </View>

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
                <Text
                  style={{
                    color: selectedDays.includes(day) ? "#fff" : "#000",
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
  datePickerBox: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    width: "100%",
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

export default EditSchedule;